import React, { Component } from "react";
import styled, { ThemeContext, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "../FormProvider";
import Color from "color";
import Select from "react-responsive-select";
import "react-responsive-select/dist/ReactResponsiveSelect.css";

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 275px;
  max-width: 300px;
  margin: 2px;
`;

const CaretIcon = () => (
  <svg
    className="caret-icon"
    x="0px"
    y="0px"
    width="11.848px"
    height="6.338px"
    viewBox="351.584 2118.292 11.848 6.338"
  >
    <g>
      <path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z" />
    </g>
  </svg>
);

class ChoiceContainer extends Component {
  static propTypes = {
    answer: PropTypes.array.isRequired,
    choices: PropTypes.array.isRequired,
    option: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    answer: [],
    choices: [],
    option: "",
    onSelect: () => {}
  };
  
  componentDidMount() {
    if (!this.props.answer.length) {
      this.onChange({
        altered: true,
        value: this.props.choices[0]
      });
    }
  }

  onChange = newValue => {
    if (newValue.altered) {
      this.props.onSelect(newValue.value);
    }
  };

  render() {
    return (
      <Select
        caretIcon={<CaretIcon key="caret"/>}
        options={this.props.choices}
        onChange={this.onChange}
        {...(this.props.answer && this.props.answer.length
          ? {
              selectedValue: this.props.answer[0]
            }
          : {})}
      />
    );
  }
}

class SimpleSelectQuestion extends Component {
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
                    <ChoiceContainer
                      context={context}
                      choices={this.props.choices.map(choice => {
                        return {
                          text: choice,
                          value: choice
                        };
                      })}
                      answer={this.props.answer}
                      onSelect={choice =>
                        this.onClick(
                          context.activeStateContent.question,
                          choice,
                          context.cb,
                          context
                        )
                      }
                    />
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

export { SimpleSelectQuestion };
