import React, { Component } from "react";
import styled, { ThemeContext, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "../FormProvider";
import TextField from "@material-ui/core/TextField";
import debounce from "lodash.debounce";

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 275px;
  max-width: 300px;
  margin: 2px;
`;

class ChoiceContainer extends Component {
  static propTypes = {
    optional: PropTypes.bool.isRequired,
    answer: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    pattern: PropTypes.shape({
      body: PropTypes.string,
      flags: PropTypes.string
    })
  };

  static defaultProps = {
    optional: false,
    answer: [],
    label: "",
    onChange: () => {},
    pattern: {
      "body": "[a-zA-Z0-9]+",
      "flags": "gi"
    },
  };

  state = {
    touched: false,
    error: false,
    answer: this.props.answer[0]
  }

  handleChange = debounce(() => {
    this.props.onChange(this.state.answer);
  }, 1000);
  
  onChange = event => {  
    this.setState({ touched: true, error: this.checkValid(event.target.value), answer: event.target.value })
    this.handleChange()
  }

  checkValid = (answer) => {
    if (this.props.pattern) {
      const regex = RegExp(this.props.pattern.body, this.props.pattern.flags);
      if (regex.test(answer)) {
        return false;
      }
      else {
        return true
      }
    }
    return false;
  }

  render() {
    return (
      <div>
        <TextField
          id="generic"
          autoFocus
          label={this.props.label}
          fullWidth
          margin="normal"
          error={this.state.error}
          variant="outlined"
          value={this.state.answer || ''}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

class SimpleTextInputQuestion extends Component {
  static propTypes = {
    answer: PropTypes.array.isRequired
  };

  static defaultProps = {
    answer: []
  };

  componentDidMount() {}
  componentDidUpdate() {}

  onChange = (question, choice, cb, context) => {
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
                      optional={this.props.optional}
                      key={context.activeState}
                      context={context}
                      answer={this.props.answer}
                      label={this.props.label}
                      pattern={this.props.pattern}
                      onChange={choice =>
                        this.onChange(
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

export { SimpleTextInputQuestion };
