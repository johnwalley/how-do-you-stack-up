import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 10px 15px 15px;
  background: #eee;
`;

const Count = styled.div`
  font-weight: bold;
  margin-right: 10px;
  font-size: 20px;
`;

const Caption = styled.div`
  flex: 1;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

const StoryNavButton = styled.button`
  font-size: 28px;
`;

const ProgressIndicator = styled.div`
  width: 100%;
  height: 5px;
`;

const Progress = styled.div`
  width: ${props => (props.count - 1) / (props.total - 1) * 100}%;
  height: 100%;
  background: #777;
  transition: width 0.5s ease;
`;

class StoryNav extends Component {
  render() {
    return (
      <div>
        <Container>
          <Count>{`${this.props.count}/${this.props.total}`}</Count>
          <Caption>{this.props.caption}</Caption>
          <ButtonContainer>
            <StoryNavButton
              onClick={this.props.handleMoveBackwards}
              disabled={this.props.count === 1}
            >
              &lt;
            </StoryNavButton>
            <StoryNavButton
              onClick={this.props.handleMoveForwards}
              disabled={this.props.count === this.props.total}
            >
              &gt;
            </StoryNavButton>
          </ButtonContainer>
        </Container>
        <ProgressIndicator>
          <Progress count={this.props.count} total={this.props.total} />
        </ProgressIndicator>
      </div>
    );
  }
}

export default StoryNav;
