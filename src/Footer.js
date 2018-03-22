import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 8px 15px 8px 15px;
  background: #222;
  font-size: 12px;
  color: 'white';
`;

class Footer extends Component {
  render() {
    return (
      <Container>
        <p style={{ color: 'white', margin: 0 }}>© 2018</p>
        <a
          href="https://www.mulberryhousesoftware.com"
          style={{ color: 'white', marginLeft: 4 }}
        >
          Mulberry House Software
        </a>
        <p style={{ color: 'white', margin: '0px 0px 0px auto' }}>Source:</p>
        <a
          href="http://wehorr.org/results/"
          style={{ color: 'white', marginLeft: 4 }}
        >
          wehorr.org
        </a>
      </Container>
    );
  }
}

export default Footer;
