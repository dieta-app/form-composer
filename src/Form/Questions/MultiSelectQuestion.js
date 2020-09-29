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

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 275px;
  @media (min-width: 472px) {
    max-width: 300px;
  }
  margin-bottom: 70px;
`;

const StyledChoiceContainer = styled.div`
  position: relative;
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
  &.selected {
    border-color: ${props => props.theme.colors.PRIMARY_LIGHT};
    &::before {
      animation: ${fadeIn} 0.2s linear;
      content: "";
      display: inline-block;
      width: 15px;
      height: 15px;
      margin: auto;
    }
    &:after {
      opacity: 1;
      animation: ${checkmark} ease 300ms;
      transform: scaleX(-1) rotate(135deg);
      height: calc(3.5em / 2);
      width: calc(3em / 4);
      transform-origin: left top;
      border-right: ${props => "3px solid " + props.theme.colors.PRIMARY_LIGHT};
      border-top: ${props => "3px solid " + props.theme.colors.PRIMARY_LIGHT};
      content: "";
      left: calc(7em / 6);
      //top: calc(3em / 2);
      top: 45%;
      position: absolute;
    }
  }
`;

const DecisionContainer = styled.div`
  display: flex;
  flex: 8;
  align-items: center;
  font-family: proxima-nova;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Opera and Firefox */
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
        isStatic={this.props.context.isStatic}
        onClick={() => this.props.onSelect(this.props.option)}
        selected={this.props.answer && this.props.answer === this.props.option}
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

class MultiSelectQuestion extends Component {
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
      const set = new Set(context.activeStateContent.answer || []);
      if (set.has(choice)) {
        set.delete(choice);
      } else {
        set.add(choice);
      }
      if (cb && typeof cb === "function") {
        cb(
          {
            question,
            answer: Array.from(set)
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

export { MultiSelectQuestion };
