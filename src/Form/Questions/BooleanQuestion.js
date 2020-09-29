import React, { Component } from "react";
import styled, { ThemeContext, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "../FormProvider";
import Color from "color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

const scaleIn = keyframes`
  0%{
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
  100% {
    transform: scale(1.3);
    -webkit-transform: scale(1.3);
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-color: black;
  border-style: solid;
  border-width: 1px;
  // @media (max-width: 425px) {
  //   flex-direction: column;
  // }
`;

const ChoiceContainers = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (min-width: 472px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 471px) {
    width: 150px;
    height: 150px;
  }
  // border: 1px 1px 1px 1px;
  &:first-child {
    border-color: black;
    border-style: solid;
    // border: 0px 1px 0px 1px;
  }
  &:last-child {
    border-color: black;
    border-style: solid;
    border: 0px 1px 0px 0px;
  }
  &:only-child {
    border-left-width: 1px;
    border-right-width: 1px;
  }

  ${(props) => !props.isStatic ? `
  &:hover {
      cursor: pointer;
      background-color: ${props =>
        props.positive
          ? Color(props.theme.colors.PRIMARY_LIGHT)
              .lighten(0.3)
              .rgb()
              .round()
              .string()
          : Color(props.theme.colors.WARNING)
              .lighten(0.3)
              .rgb()
              .round()
              .string()};
    }
  ` : `
  &:hover {
    pointer-events: none;
    cursor: default;
  }
  `}

  &.selected {
    background-color: ${props =>
      props.positive
        ? Color(props.theme.colors.PRIMARY_LIGHT)
            .lighten(0.3)
            .rgb()
            .round()
            .string()
        : Color(props.theme.colors.WARNING)
            .lighten(0.3)
            .rgb()
            .round()
            .string()};
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &.selected {
    animation: ${scaleIn} 0.15s linear;
  }
`;

const DecisionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: proxima-nova;
  font-weight: bold;
  font-size: ${props => (props.selected ? "40px" : "30px")};
  color: ${props => (props.color ? props.color : props.theme.colors.BLACK)};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome, Opera and Firefox */
`;

class BooleanQuestion extends Component {
  static propTypes = {
    answer: PropTypes.array.isRequired,
    positive: PropTypes.string.isRequired,
    negative: PropTypes.string.isRequired
  };

  static defaultProps = {
    answer: [],
    positive: "Yes",
    negative: "No"
  };

  // state = {
  //   answer: this.props.answer || ""
  // };

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
                    <ChoiceContainers
                      isStatic={context.static}
                      negative
                      onClick={() =>
                        this.onClick(
                          context.activeStateContent.question,
                          this.props.negative,
                          context.cb,
                          context
                        )
                      }
                      selected={this.props.answer === this.props.negative}
                      className={
                        this.props.answer &&
                        this.props.answer.length &&
                        this.props.answer.includes(this.props.negative)
                          ? "selected"
                          : ""
                      }
                    >
                      <IconContainer
                        selected={this.props.answer === this.props.negative}
                        className={
                          this.props.answer &&
                          this.props.answer.length &&
                          this.props.answer.includes(this.props.negative)
                            ? "selected"
                            : ""
                        }
                      >
                        <FontAwesomeIcon
                          size={
                            this.props.answer &&
                            this.props.answer.includes(this.props.negative)
                              ? "6x"
                              : "5x"
                          }
                          icon={faTimes}
                          color={
                            this.props.answer &&
                            this.props.answer.includes(this.props.negative)
                              ? themeContext.colors.WARNING
                              : themeContext.colors.BLACK
                          }
                        />
                      </IconContainer>
                      <DecisionContainer
                        selected={this.props.answer === this.props.negative}
                        color={
                          this.props.answer &&
                          this.props.answer.includes(this.props.negative)
                            ? themeContext.colors.WARNING
                            : themeContext.colors.BLACK
                        }
                      >
                        {this.props.negative}
                      </DecisionContainer>
                    </ChoiceContainers>
                    <ChoiceContainers
                      isStatic={context.static}
                      positive
                      onClick={() =>
                        this.onClick(
                          context.activeStateContent.question,
                          this.props.positive,
                          context.cb,
                          context
                        )
                      }
                      selected={this.props.answer === this.props.positive}
                      className={
                        this.props.answer &&
                        this.props.answer.includes(this.props.positive)
                          ? "selected"
                          : ""
                      }
                    >
                      <IconContainer
                        selected={this.props.answer === this.props.positive}
                        className={
                          this.props.answer &&
                          this.props.answer.includes(this.props.positive)
                            ? "selected"
                            : ""
                        }
                      >
                        <FontAwesomeIcon
                          size={
                            this.props.answer &&
                            this.props.answer.includes(this.props.positive)
                              ? "6x"
                              : "5x"
                          }
                          icon={faCheck}
                          color={
                            this.props.answer &&
                            this.props.answer.includes(this.props.positive)
                              ? themeContext.colors.PRIMARY_LIGHT
                              : themeContext.colors.BLACK
                          }
                        />
                      </IconContainer>
                      <DecisionContainer
                        selected={this.props.answer === this.props.positive}
                        color={
                          this.props.answer &&
                          this.props.answer.includes(this.props.positive)
                            ? themeContext.colors.PRIMARY_LIGHT
                            : themeContext.colors.BLACK
                        }
                      >
                        {this.props.positive}
                      </DecisionContainer>
                    </ChoiceContainers>
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

export { BooleanQuestion };
