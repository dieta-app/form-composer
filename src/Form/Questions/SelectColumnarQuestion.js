import React, { Component } from "react";
import styled, { ThemeContext, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "../FormProvider";
import Color from "color";

const fadeIn = keyframes`
  0%{
    opacity: 0;
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 0 25px rgba(0, 0, 0, 0);
  }
`;

const checkmark = keyframes`
  0%{
    height: 0;
    width: 0;
    opacity: 0;
  }
  20% {
    height: 0;
    width: calc(3em/4);
    // opacity: 1;
  }
  40% {
    // height: calc(7em/2);
    // width: calc(7em/4);
    // opacity: 1;
  }
  100% {
    height: calc(3.5em/2);
    width: calc(3em/4);
    opacity: 1;
  }
`;

const StyledQuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 275px;
  margin-bottom: 70px;
`;

const DecisionIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 15px;
  height: 15px;
  border-color: ${props => props.theme.colors.MID};
  border-style: solid;
  border-width: 1px;
  border-radius: 50px;
  &.selected {
    border-color: ${props => props.theme.colors.PRIMARY_LIGHT};
    &::before {
      animation: ${fadeIn} 0.2s linear;
      content: "";
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: 5px;
      background-color: ${props => props.theme.colors.PRIMARY_LIGHT};
      margin: auto;
    }
  }
`;

const DecisionContainer = styled.div`
  font-size: 14px;
  display: flex;
  flex: 8;
  font-family: proxima-nova;
  user-select: none;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StyledTable = styled.table`
  width: 100%;
  // border: 1px solid ${props => props.theme.colors.GRAY};
  tbody > tr td:nth-of-type(even) {
      background-color: #eee;
  }
  thead > tr th:nth-of-type(even) div {
      background-color: #eee;
  }
`;

const StyledTableHeader = styled.th`
  // border: 1px solid ${props => props.theme.colors.GRAY};
  font-size: 12px;
  padding: 0 10px;
  &.rotate {
    height: 100px;
    min-width: 30px;
    max-width: 50px;
    position: relative;
    vertical-align: bottom;
    padding: 0;
    font-size: 11px;
    line-height: 1;

    > div {
      position: relative;
      top: 0px;
      left: -50px;
      height: 100%;
      transform:skew(45deg,0deg);
      overflow: hidden;
    }

    > div > span {
      transform:skew(-45deg,0deg) rotate(45deg);
      position: relative;
      top: calc(50% - 10px);
      left: 0;
      bottom: 0;
      right: 0;
      display: inline-block;
      text-align: left;
      width: 100px;
      // text-overflow: ellipsis;
      // overflow: hidden;
      // white-space: nowrap;
      @media (max-width: 471px) {
        left: -50%;
      }
      @media (min-width: 472px) and (max-width: 676px) {
        left: -25%;
      }
    }
  }
`;

const StyledTableData = styled.td`
  // border: 1px solid ${props => props.theme.colors.GRAY};
`;

class QuestionContainer extends Component {
  state = {
    step: this.props.step
  };

  populateWithDefaults() {
    if (this.props.step === this.props.context.activeStateContent.step) {
      const componentProps =
        this.props.context.activeStateContent &&
        this.props.context.activeStateContent.component &&
        this.props.context.activeStateContent.component.props;

      const defaultSelected = componentProps && componentProps.defaultSelected;

      if (Object(componentProps).hasOwnProperty("defaultSelected")) {
        if (this.props.columns && this.props.columns.length) {
          const pagedQuestions = this.props.context.states.filter(state => {
            return (
              state.question ===
                this.props.context.activeStateContent.question &&
              state.step !== this.props.context.activeStateContent.step
            );
          });
          const initialStateQuestions = pagedQuestions.reduce((acc, item) => {
            if (item.answer) {
              Object.keys(item.answer).forEach(answer => {
                acc[answer] = item.answer[answer];
              });
            }
            return acc;
          }, {});
          this.props.choices.forEach(choice => {
            if (!this.props.answer[choice.option]) {
              initialStateQuestions[choice.option] = defaultSelected;
            }
          });

          [
            ...pagedQuestions.map(state => state.step),
            this.props.context.activeState
          ].forEach(step => {
            this.props.context.setStateAnswer(step, {
              ...this.props.answer,
              ...initialStateQuestions
            });
          });

          // This triggers the form complete check to occur
          this.props.context.markStateComplete(this.props.context.activeState, {
            answer: {
              ...this.props.answer,
              ...initialStateQuestions
            }
          });
        }
      }
    }
    this.setState({
      step: this.props.step
    });
  }

  componentDidMount() {
    this.populateWithDefaults();
  }

  componentDidUpdate() {
    if (this.props.step !== this.state.step) {
      this.populateWithDefaults();
    }
  }

  render() {
    return (
      <StyledQuestionContainer>{this.props.children}</StyledQuestionContainer>
    );
  }
}

class ChoiceContainer extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    option: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    answer: {},
    columns: [],
    option: "",
    onSelect: () => {}
  };

  render() {
    return (
      <tr>
        <StyledTableData style={{ border: 0 }}>
          <DecisionContainer style={{ maxWidth: "150px" }}>
            {this.props.option}
          </DecisionContainer>
        </StyledTableData>
        {this.props.columns.map((choice, index) => {
          return (
            <StyledTableData
              key={index}
              onClick={() => this.props.onSelect(this.props.option, choice)}
            >
              <DecisionIndicator
                selected={this.props.answer[this.props.option] === choice}
                className={
                  this.props.answer[this.props.option] === choice
                    ? "selected"
                    : ""
                }
              />
            </StyledTableData>
          );
        })}
      </tr>
    );
  }
}

class SelectColumnarQuestion extends Component {
  static propTypes = {
    answer: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    choices: PropTypes.array.isRequired,
    defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    answer: {},
    columns: [],
    choices: [],
    defaultSelected: null
  };

  static containerProps = {
    fullScreen: true
  };

  componentDidMount() {}
  componentDidUpdate() {}

  onClick = (question, response, cb, context) => {
    if (!context.static) {

      const dictionary = context.activeStateContent.answer || {};
      dictionary[response.option] = response.choice;
  
      // Update the other states silently
      const pagedQuestions = context.states.filter(state => {
        return (
          state.question === context.activeStateContent.question &&
          state.step !== context.activeStateContent.step
        );
      });
  
      pagedQuestions.forEach(state => {
        context.setStateAnswer(state.step, dictionary);
      });
  
      // Update the current state loudly
      if (cb && typeof cb === "function") {
        cb(
          {
            question,
            answer: dictionary
          },
          context
        );
      }
    }
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          return (
            <FormConsumer>
              {context => {
                return (
                  <QuestionContainer
                    step={context.activeStateContent.step}
                    context={context}
                    {...this.props}
                  >
                    <StyledTable style={{ overflow: "scroll" }}>
                      <thead>
                        <tr>
                          <StyledTableHeader
                            style={{ border: 0, maxWidth: "150px" }}
                          />
                          {this.props.columns.map((choice, index) => {
                            return (
                              <StyledTableHeader
                                className={"rotate"}
                                key={index}
                              >
                                <div>
                                  <span>{choice}</span>
                                </div>
                              </StyledTableHeader>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.choices.map((choice, index) => {
                          return (
                            <ChoiceContainer
                              context={context}
                              key={index}
                              answer={this.props.answer}
                              columns={this.props.columns}
                              {...choice}
                              onSelect={(option, choice) =>
                                this.onClick(
                                  context.activeStateContent.question,
                                  { option, choice },
                                  context.cb,
                                  context
                                )
                              }
                            />
                          );
                        })}
                      </tbody>
                    </StyledTable>
                  </QuestionContainer>
                );
              }}
            </FormConsumer>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export { SelectColumnarQuestion };
