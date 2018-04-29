import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup } from 'reactstrap';
import { Form, FormGroup, Input } from 'reactstrap';

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

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const StyledButton = styled(Button)`
  font-size: 1rem;

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const StyledInput = styled(Input)`
  font-size: 1rem;
  margin-top: 5px;

  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

class StoryNav extends Component {
  render() {
    return (
      <div>
        <Container>
          <Count>{`${this.props.count}/${this.props.total}`}</Count>
          <CaptionContainer>
            <Caption>{this.props.caption}</Caption>
            {this.props.searchEnabled ? (
              <Form inline style={{}}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <StyledInput
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Type here..."
                    value={this.props.search}
                    onChange={this.props.handleSearchChange}
                    onKeyPress={event => {
                      if (event.which === 13) {
                        event.preventDefault();
                      }
                    }}
                  />
                </FormGroup>
              </Form>
            ) : null}
          </CaptionContainer>
          <ButtonContainer>
            <ButtonGroup>
              <StyledButton
                color="secondary"
                onClick={this.props.handleMoveBackwards}
                disabled={this.props.count === 1}
              >
                &lt;
              </StyledButton>
              <StyledButton
                color="secondary"
                onClick={this.props.handleMoveForwards}
                disabled={this.props.count === this.props.total}
              >
                &gt;
              </StyledButton>
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
