import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 28px;
`;

class Header extends Component {
  render() {
    return (
      <Container>
        <Title>How do you stack up?</Title>
        <button>Facebook</button>
        <button>Twitter</button>
      </Container>
    );
  }
}

export default Header;
