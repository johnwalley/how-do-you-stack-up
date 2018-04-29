import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import StoryNav from './StoryNav';
import Chart from './Chart';
import Footer from './Footer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const chapters = [
  {
    caption: `The Women’s Eights Head of the River Race is the largest women’s rowing race in the world with 320 crews taking part. Over 2,300 results from 8 years of racing are are shown below`,
    highlights: [{ index: 93, year: 2014 }],
    annotations: [
      {
        title: `Each line represents a crew's finish time`,
        label: `For example in 2014 York University Boat Club finished with a time of 20:37.8 placing them 93rd`,
        index: 93,
        year: 2014,
        dy: -1,
      },
    ],
    searchEnabled: false,
  },
  {
    caption: `The fastest ever time was set by the Great Britain squad in 2014`,
    highlights: [{ index: 1, year: 2014 }],
    annotations: [
      {
        title: 'Course record: 17:39.8',
        label:
          'Army RC/Gloucester RC/Imperial College BC/London Head RC/ Minerva-Bath RC/Oxford Brookes University BC/Tees RC',
        index: 1,
        year: 2014,
        dy: -1,
      },
    ],
    searchEnabled: false,
  },
  {
    caption: `Some years are faster than others. The amount of water going into the river upstream makes a big difference. As does the time of day. Here we see the results of the 100th placed crew`,
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
          '100th placed Newcastle University BC C finished with a time of 22:48.3',
        index: 100,
        year: 2015,
        dy: -1,
      },
      {
        title: '2013 was the fastest year',
        label:
          '100th placed Barnes Bridge Ladies BC, Mortlake, Anglian & Alpha BC finished with a time of 20:33.9',
        index: 100,
        year: 2013,
        dy: 1,
      },
    ],
    searchEnabled: false,
  },
  {
    caption: `Here's how my club, City of Cambridge, have performed since 2011`,
    highlights: [
      { index: 150, year: 2018 },
      { index: 265, year: 2018 },
      { index: 197, year: 2017 },
      { index: 39, year: 2017 },
      { index: 77, year: 2016 },
      { index: 233, year: 2016 },
      { index: 26, year: 2015 },
      { index: 111, year: 2015 },
      { index: 114, year: 2015 },
      { index: 42, year: 2014 },
      { index: 128, year: 2014 },
      { index: 91, year: 2013 },
      { index: 214, year: 2013 },
      { index: 106, year: 2012 },
      { index: 122, year: 2012 },
      { index: 209, year: 2012 },
      { index: 238, year: 2012 },
      { index: 61, year: 2011 },
      { index: 220, year: 2011 },
      { index: 230, year: 2011 },
    ],
    annotations: [
      {
        title: 'Highest finish',
        label:
          '26th overall and 2nd fastest Provincial Club with a time of 21:18.1',
        index: 26,
        year: 2015,
        dy: -1,
      },
    ],
    searchEnabled: false,
  },
  {
    caption: `Take a look at your club using the search box below. Hover over or touch a crew to see details`,
    highlights: [],
    annotations: [],
    searchEnabled: true,
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
      serchEnabled: chapters[initialCount - 1].searchEnabled,
      search: '',
    };
  }

  handleSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  moveForwards = () => {
    const count = Math.min(this.state.count + 1, this.state.total);
    this.setState({
      count,
      caption: chapters[count - 1].caption,
      highlights: chapters[count - 1].highlights,
      annotations: chapters[count - 1].annotations,
      searchEnabled: chapters[count - 1].searchEnabled,
    });
  };

  moveBackwards = () => {
    const count = Math.max(this.state.count - 1, 1);
    this.setState({
      count,
      caption: chapters[count - 1].caption,
      highlights: chapters[count - 1].highlights,
      annotations: chapters[count - 1].annotations,
      searchEnabled: chapters[count - 1].searchEnabled,
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
          searchEnabled={this.state.searchEnabled}
          search={this.state.search}
          handleMoveForwards={this.moveForwards}
          handleMoveBackwards={this.moveBackwards}
          handleSearchChange={this.handleSearchChange}
        />
        <Chart
          highlights={this.state.highlights}
          annotations={this.state.annotations}
          searchEnabled={this.state.searchEnabled}
          search={this.state.search}
        />
        <Footer />
      </AppContainer>
    );
  }
}

export default App;
