import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px 15px 15px;
  background: #eee;
`;

class Footer extends Component {
  render() {
    return <Container>hello@mulberryhousesoftware.com</Container>;
  }
}

export default Footer;
