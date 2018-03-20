import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import StoryNav from './StoryNav';
import Chart from './Chart';
import Footer from './Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
`;

const chapters = [
  {
    caption: `The Women’s Eights Head of the River Race is the largest women’s rowing race in the world with around 2,880 women racing
  and up to 320 crews taking part. Over 2,400 results from 8 years of racing are visualised below.`,
    highlights: [],
    annotations: [],
  },
  {
    caption: `The fastest ever time was set by the Great Britain squad in 2014.`,
    highlights: [{ index: 0, year: 2014 }],
    annotations: [
      {
        title: 'Course record: 17:39.8',
        label:
          'Army RC/Gloucester RC/Imperial College BC/London Head RC/ Minerva-Bath RC/Oxford Brookes University BC/Tees RC',
        index: 0,
        year: 2014,
      },
    ],
  },
  {
    caption: `Some years are faster than others. The amount of water going into the river makes a big difference. As does the time of day. Here we see the results of the 100th placed crew.`,
    highlights: [
      { index: 100, year: 2018 },
      { index: 100, year: 2017 },
      { index: 100, year: 2016 },
      { index: 100, year: 2015 },
      { index: 100, year: 2014 },
      { index: 100, year: 2013 },
      { index: 100, year: 2012 },
      { index: 100, year: 2011 },
    ],
    annotations: [
      {
        title: '2015 was the slowest year',
        label:
          'Army RC/Gloucester RC/Imperial College BC/London Head RC/ Minerva-Bath RC/Oxford Brookes University BC/Tees RC',
        index: 100,
        year: 2015,
      },
      {
        title: '2013 was the fastest year',
        label:
          'Army RC/Gloucester RC/Imperial College BC/London Head RC/ Minerva-Bath RC/Oxford Brookes University BC/Tees RC',
        index: 100,
        year: 2013,
      },
    ],
  },
  {
    caption: `Here's how my club, City of Cambridge, have performed since 2011`,
    highlights: [
      { index: 150, year: 2018 },
      { index: 220, year: 2018 },
      { index: 265, year: 2018 },
      { index: 39, year: 2017 },
    ],
    annotations: [
      {
        title: 'Best placing',
        label: '39th overall and 3rd fastest Provincial Club',
        index: 39,
        year: 2017,
      },
    ],
  },
  {
    caption: `Take a look at your club using the search box below`,
    highlights: [],
    annotations: [],
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    const initialCount = 1;

    this.state = {
      count: initialCount,
      total: chapters.length,
      caption: chapters[initialCount - 1].caption,
      highlights: chapters[initialCount - 1].highlights,
      annotations: chapters[initialCount - 1].annotations,
    };
  }

  moveForwards = () => {
    const count = Math.min(this.state.count + 1, this.state.total);
    this.setState({
      count,
      caption: chapters[count - 1].caption,
      highlights: chapters[count - 1].highlights,
      annotations: chapters[count - 1].annotations,
    });
  };

  moveBackwards = () => {
    const count = Math.max(this.state.count - 1, 1);
    this.setState({
      count,
      caption: chapters[count - 1].caption,
      highlights: chapters[count - 1].highlights,
      annotations: chapters[count - 1].annotations,
    });
  };

  render() {
    return (
      <AppContainer>
        <Header>How do you stack up?</Header>
        <StoryNav
          count={this.state.count}
          total={this.state.total}
          caption={this.state.caption}
          handleMoveForwards={this.moveForwards}
          handleMoveBackwards={this.moveBackwards}
        />
        <Chart
          highlights={this.state.highlights}
          annotations={this.state.annotations}
        />
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
