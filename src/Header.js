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
  padding-right: 5px;
`;

const Title = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
`;

const shareUrl = 'https://www.mulberryhousesoftware.com/how-do-you-stack-up';

class Header extends Component {
  render() {
    return (
      <Container>
        <Title>How do you stack up?</Title>
        <FacebookShareButton
          url={shareUrl}
          style={{ marginLeft: 5, cursor: 'pointer' }}
        >
          <FacebookIcon size={22} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          style={{ marginLeft: 5, cursor: 'pointer' }}
        >
          <TwitterIcon size={22} round />
        </TwitterShareButton>
        <EmailShareButton
          url={shareUrl}
          style={{ marginLeft: 5, cursor: 'pointer' }}
        >
          <EmailIcon size={22} round />
        </EmailShareButton>
      </Container>
    );
  }
}

export default Header;
