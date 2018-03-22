import React, { Component } from 'react';
import styled from 'styled-components';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  EmailIcon,
  EmailShareButton,
} from 'react-share';

const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
`;

const shareUrl = 'https://www.mulberryhousesoftware.com/how-do-you-stack-up';

class Header extends Component {
  render() {
    return (
      <Container>
        <Title>How do you stack up?</Title>
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </Container>
    );
  }
}

export default Header;
