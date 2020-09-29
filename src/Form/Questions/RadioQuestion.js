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

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 275px;
  @media (min-width: 472px) {
    max-width: 300px;
  }
`;

const StyledChoiceContainer = styled.div`
  display: flex;
  border-color: ${props => props.theme.colors.MID};
  border-style: solid;
  border-width: 1px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 10px;
  &:not(:last-child) {
    border-bottom-width: 0px;
  }
  ${(props) => !props.isStatic ? `
  &:hover {
    cursor: pointer;
    background-color: ${props =>
      Color(props.theme.colors.PRIMARY_LIGHT)
        .lighten(0.3)
        .rgb()
        .round()
        .string()};
    @media (hover: none) and (pointer: coarse) {
      background-color: transparent !important;
    }
  }
  ` : `
  &:hover {
    pointer-events: none;
    cursor: default;
  }
  `}
  
  &.selected {
    background-color: ${props =>
      Color(props.theme.colors.PRIMARY_LIGHT)
        .lighten(0.3)
        .rgb()
        .round()
        .string()}!important;
  }
`;

const DecisionIndicator = styled.div`
  display: flex;
  align-items: center;
  margin: auto 15px;
  width: 25px;
  height: 25px;
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
      width: 15px;
      height: 15px;
      -moz-border-radius: 7.5px;
      -webkit-border-radius: 7.5px;
      border-radius: 7.5px;
      background-color: ${props => props.theme.colors.PRIMARY_LIGHT};
      margin: auto;
    }
  }
`;

const DecisionContainer = styled.div`
  display: flex;
  flex: 8;
  align-items: center;
  font-family: proxima-nova;
  user-select: none;
`;

class ChoiceContainer extends Component {
  static propTypes = {
    answer: PropTypes.array.isRequired,
    option: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    answer: [],
    option: "",
    onSelect: () => {}
  };

  render() {
    return (
      <StyledChoiceContainer
        isStatic={this.props.context.static}
        onClick={() => this.props.onSelect(this.props.option)}
        selected={
          this.props.answer.length &&
          this.props.answer.includes(this.props.option)
        }
        className={
          this.props.answer.length &&
          this.props.answer.includes(this.props.option)
            ? "selected"
            : ""
        }
      >
        <DecisionIndicator
          selected={
            this.props.answer.length &&
            this.props.answer.includes(this.props.option)
          }
          className={
            this.props.answer.length &&
            this.props.answer.includes(this.props.option)
              ? "selected"
              : ""
          }
        />
        <DecisionContainer>{this.props.option}</DecisionContainer>
      </StyledChoiceContainer>
    );
  }
}

class RadioQuestion extends Component {
  static propTypes = {
    answer: PropTypes.array.isRequired,
    choices: PropTypes.array.isRequired
  };

  static defaultProps = {
    answer: [],
    choices: []
  };

  componentDidMount() {}
  componentDidUpdate() {}

  onClick = (question, choice, cb, context) => {
    if (!context.static) {
      if (cb && typeof cb === "function") {
        cb(
          {
            question,
            answer: [choice]
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
                  <QuestionContainer>
                    {this.props.choices.map((choice, index) => {
                      return (
                        <ChoiceContainer
                          context={context}
                          key={index}
                          answer={this.props.answer}
                          {...choice}
                          onSelect={choice =>
                            this.onClick(
                              context.activeStateContent.question,
                              choice,
                              context.cb,
                              context
                            )
                          }
                        />
                      );
                    })}
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

export { RadioQuestion };
