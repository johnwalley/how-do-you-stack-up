import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px 15px 15px;
  background: #eee;
  font-size: 12px;
`;

class Footer extends Component {
  render() {
    return (
      <Container>
        <a href="https://www.mulberryhousesoftware.com">
          Mulberry House Software
        </a>
      </Container>
    );
  }
}

export default Footer;
