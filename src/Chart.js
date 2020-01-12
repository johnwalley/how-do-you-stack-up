import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { leastIndex } from 'd3-array';
import {
  annotation,
  annotationCustomType,
  annotationLabel,
} from 'd3-svg-annotation';
import sizeMe from 'react-sizeme';
import rawResults from './results.json';

const Container = styled.div`
  flex: 1;
`;

const Canvas = styled.canvas`
  position: absolute;
  height: 100%;
  vertical-align: bottom;
`;

const SVG = styled.svg`
  position: absolute;
  height: 100%;
  vertical-align: bottom;
  pointer-events: none;
`;

const results = rawResults.map(d => {
  const time = d3.timeParse('%M:%S.%L')(d.Time);

  return {
    finish: +d.Finish,
    start: +d.Start,
    name: d.Name,
    time: 60 * time.getMinutes() + time.getSeconds(),
    year: +d.Year,
  };
});

const nestedResults = d3
  .nest()
  .key(function(d) {
    return d.year;
  })
  .entries(results);

function scaleBandInvert(scale) {
  var domain = scale.domain();
  var paddingOuter = scale(domain[0]);
  var eachBand = scale.step();

  return function(value) {
    var index = Math.floor((value - paddingOuter) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}

const tickFormat = function(d) {
  return d3.format('2d')(Math.floor(d / 60)) + ':' + d3.format('02d')(d % 60);
};

const Chart = ({
  size: { width, height },
  annotations,
  highlights,
  search,
  searchEnabled,
}) => {
  const canvas = useRef(null);
  const svg = useRef(null);
  const [hover, setHover] = useState([]);

  const marginTop = 10;
  const marginBottom = 50;
  const marginRight = 24;
  const marginLeft = width < 700 ? 42 : 52;

  const tickValues = d3
    .range(
      Math.floor(
        d3.min(results, function(d) {
          return d.time;
        }) / 60
      ),
      Math.ceil(
        d3.max(results, function(d) {
          return d.time;
        }) / 60
      ) + 1,
      width < 700 ? 4 : 1
    )
    .map(function(d) {
      return 60 * d;
    });

  const x = d3
    .scaleLinear()
    .range([marginLeft, width - marginRight])
    .domain(d3.extent(tickValues));

  const y = d3
    .scaleBand()
    .range([marginTop, height - marginBottom])
    .domain(
      results.map(function(d) {
        return d.year;
      })
    )
    .padding(0.3);

  const handleMouseMove = (event, xScale, yScale) => {
    const rect = canvas.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const year = scaleBandInvert(yScale)(y);

    const index = leastIndex(
      results.filter(d => d.year === year),
      (a, b) =>
        Math.abs(a.time - xScale.invert(x)) -
        Math.abs(b.time - xScale.invert(x))
    );

    const club = results.filter(d => d.year === year)[index];

    const clubs = results
      .filter(d => d.year === year)
      .filter(d => d.time === club.time);

    setHover(clubs);
  };

  useEffect(() => {
    drawCanvas(
      canvas.current,
      searchEnabled
        ? search.length > 2
          ? results
              .filter(
                d => d.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
              )
              .map(d => ({ index: d.finish, year: d.year }))
          : []
        : highlights
    );

    drawSVG(svg.current, annotations);

    function drawCanvas(canvas, highlights) {
      const context = canvas.getContext('2d');
      canvas.style.width = width + 'px';

      const scale = window.devicePixelRatio;
      canvas.width = width * scale;
      canvas.height = height * scale;

      context.scale(scale, scale);

      context.clearRect(0, 0, width, height);

      context.textAlign = 'right';
      context.textBaseline = 'top';
      context.font = width < 700 ? '12px sans-serif' : '16px sans-serif';

      context.strokeStyle = 'rgba(109,116,119,0.3)';
      context.lineWidth = 2;
      context.textBaseline = 'middle';

      nestedResults.forEach(function(year, yearIndex) {
        context.fillStyle = '#f8fbfc';
        context.fillRect(
          x(tickValues[0]),
          y(year.key),
          x(tickValues[tickValues.length - 1]) - x(tickValues[0]),
          y.bandwidth()
        );

        year.values.forEach(function(d, i) {
          context.beginPath();
          context.moveTo(x(d.time), y(d.year));
          context.lineTo(x(d.time), y(d.year) + y.bandwidth());
          context.stroke();
        });

        context.fillStyle = 'darkgrey';
        context.fillText(
          year.key,
          marginLeft - 8,
          y(year.key) + y.bandwidth() / 2
        );
      });

      context.strokeStyle = '#E8336D';
      context.textAlign = 'center';
      context.lineWidth = 6;

      highlights.forEach(function(h, i) {
        context.beginPath();
        context.moveTo(
          x(
            nestedResults.find(function(d) {
              return +d.key === h.year;
            }).values[h.index - 1].time
          ),
          y(h.year)
        );
        context.lineTo(
          x(
            nestedResults.find(function(d) {
              return +d.key === h.year;
            }).values[h.index - 1].time
          ),
          y(h.year) + y.bandwidth()
        );
        context.stroke();
      });

      hover.forEach(function(h, i) {
        context.beginPath();
        context.moveTo(x(h.time), y(h.year));
        context.lineTo(x(h.time), y(h.year) + y.bandwidth());
        context.stroke();
      });

      context.fillStyle = 'darkgrey';
      context.strokeStyle = 'rgba(109,116,119,0.3)';
      context.lineWidth = 2;

      tickValues.forEach(function(d) {
        context.fillText(tickFormat(d), x(d), y.range()[1] + 10);

        context.beginPath();
        context.setLineDash([2, 4]);
        context.moveTo(x(d), y.range()[0]);
        context.lineTo(x(d), y.range()[1]);
        context.stroke();
        context.setLineDash([]);
      });

      context.font = width < 700 ? '12px sans-serif' : '14px sans-serif';
      context.textAlign = 'left';
      context.fillText('< Faster times', x.range()[0], y.range()[1] + 30);
      context.textAlign = 'right';
      context.fillText('Slower times >', x.range()[1], y.range()[1] + 30);
    }

    function drawSVG(svgElement, annotations) {
      const type = annotationCustomType(annotationLabel, {
        className: 'custom',
        connector: { end: 'dot' },
        note: { align: 'middle', orientation: 'leftRight' },
      });

      const updatedAnnotations = annotations.map(function(h, i) {
        return {
          note: {
            label: h.label,
            title: h.title,
          },
          //can use x, y directly instead of data
          x: x(
            nestedResults.find(function(d) {
              return +d.key === h.year;
            }).values[h.index - 1].time
          ),
          y: y(h.year) + y.bandwidth() / 2,
          dx: width / 5,
          dy: h.dy * y.step(),
          color: '#E8336D',
        };
      });

      if (hover.length) {
        updatedAnnotations.push({
          note: {
            title: `${tickFormat(hover[0].time)}`,
            label: hover.map(d => `${d.name}`).join(', '),
          },
          x: x(hover[0].time),
          y: y(hover[0].year) + y.bandwidth() / 2,
          dx: x(hover[0].time) > width / 2 ? -8 : 8,
          dy: 0,
          color: '#E8336D',
        });
      }

      const makeAnnotations = annotation()
        .type(type)
        .textWrap((width / 320) * 150)
        .annotations(updatedAnnotations);

      const svg = d3
        .select(svgElement)
        .attr('width', width)
        .attr('height', height);

      const g = svg
        .selectAll('.annotation-group')
        .style('font-size', width < 700 ? 10 : '1rem')
        .data([null]);

      g.enter()
        .append('g')
        .attr('class', 'annotation-group');

      g.call(makeAnnotations);

      d3.select(svgElement)
        .selectAll('text')
        .style('stroke', 'white')
        .style('stroke-width', '4px')
        .style('paint-order', 'stroke fill');
    }
  }, [
    tickValues,
    x,
    y,
    width,
    height,
    annotations,
    highlights,
    hover,
    marginLeft,
    search,
    searchEnabled,
  ]);

  return (
    <Container>
      <Canvas
        ref={canvas}
        onMouseMove={e => handleMouseMove(e, x, y)}
        onMouseLeave={e => setHover([])}
      />
      <SVG ref={svg} />
    </Container>
  );
};

export default sizeMe({ monitorHeight: true })(Chart);
