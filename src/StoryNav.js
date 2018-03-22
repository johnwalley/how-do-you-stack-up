import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup } from 'reactstrap';

const Container = styled.div`
  display: flex;
  padding: 8px 10px 10px;
  background: #eee;
  border-top: 1px solid darkgrey;
`;

const Count = styled.div`
  font-weight: bold;
  margin-right: 10px;
  font-size: 20px;
`;

const Caption = styled.div`
  flex: 1;
  font-size: 14px;

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const ButtonContainer = styled.div`
  margin-left: auto;
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
            <ButtonGroup>
              <Button
                color="secondary"
                onClick={this.props.handleMoveBackwards}
                disabled={this.props.count === 1}
              >
                &lt;
              </Button>
              <Button
                color="secondary"
                onClick={this.props.handleMoveForwards}
                disabled={this.props.count === this.props.total}
              >
                &gt;
              </Button>
            </ButtonGroup>
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
