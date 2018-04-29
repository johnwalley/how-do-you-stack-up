import React, { Component } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
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
`;

class Chart extends Component {
  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const width = this.props.size.width;
    const height = this.props.size.height;

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

    const marginTop = 10;
    const marginBottom = 50;
    const marginRight = 20;
    const marginLeft = 110;

    const x = d3
      .scaleLinear()
      .range([marginLeft, width - marginRight])
      .domain(
        d3.extent(
          results.map(function(d) {
            return d.time;
          })
        )
      )
      .nice();

    const y = d3
      .scaleBand()
      .range([marginTop, height - marginBottom])
      .domain(
        results.map(function(d) {
          return d.year;
        })
      )
      .padding(0.3);

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

    const tickFormat = function(d) {
      return (
        d3.format('2d')(Math.floor(d / 60)) + ':' + d3.format('02d')(d % 60)
      );
    };

    // TODO: make this case insensitive
    const highlights = this.props.searchEnabled
      ? this.props.search.length > 2
        ? results
            .filter(d => d.name.indexOf(this.props.search) !== -1)
            .map(d => ({ index: d.finish, year: d.year }))
        : []
      : this.props.highlights;

    drawCanvas(this.canvas, highlights);
    drawSVG(this.svg, this.props.annotations);

    function drawCanvas(canvas, highlights) {
      const context = canvas.getContext('2d');
      canvas.style.width = width + 'px';

      const scale = window.devicePixelRatio;
      canvas.width = width * scale;
      canvas.height = height * scale;

      context.scale(scale, scale);

      context.clearRect(0, 0, width, height);

      context.textAlign = 'center';
      context.textBaseline = 'top';
      context.font = width < 700 ? '12px sans-serif' : '16px sans-serif';
      context.strokeStyle = 'darkgrey';

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
        context.fillText(year.key, 40, y(year.key) + y.bandwidth() / 2);
      });

      context.strokeStyle = '#E8336D';
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

        /*
        context.fillStyle = '#E8336D';
        context.fillText(
          nestedResults.find(function(d) {
            return +d.key === h.year;
          }).values[h.index - 1].name,
          x(
            nestedResults.find(function(d) {
              return +d.key === h.year;
            }).values[h.index - 1].time
          ),
          y(h.year) - 18
        );
        */
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

      context.font = '14px sans-serif';
      context.fillText('< Faster times', x.range()[0], y.range()[1] + 30);
      context.fillText('Slower times >', x.range()[1] - 40, y.range()[1] + 30);
    }

    function drawSVG(svgElement, annotations) {
      const type = annotationCustomType(annotationLabel, {
        className: 'custom',
        connector: { end: 'dot' },
        note: { align: 'middle' },
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

      const makeAnnotations = annotation()
        .type(type)
        .textWrap(width / 320 * 150)
        .annotations(updatedAnnotations);

      const svg = d3
        .select(svgElement)
        .attr('width', width)
        .attr('height', height);

      const g = svg
        .selectAll('.annotation-group')
        .style('font-size', width < 700 ? 10 : '1rem')
        .data([null]);

      g
        .enter()
        .append('g')
        .attr('class', 'annotation-group');

      g.call(makeAnnotations);

      d3
        .select(svgElement)
        .selectAll('text')
        .style('stroke', 'white')
        .style('stroke-width', '4px')
        .style('paint-order', 'stroke fill');
    }
  }

  render() {
    return (
      <Container>
        <Canvas
          innerRef={canvas => {
            this.canvas = canvas;
          }}
        />
        <SVG
          innerRef={svg => {
            this.svg = svg;
          }}
        />
      </Container>
    );
  }
}

export default sizeMe({ monitorHeight: true })(Chart);
