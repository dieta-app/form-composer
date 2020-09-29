import React, { Component } from "react";
import styled, { ThemeContext, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "../FormProvider";
import Color from "color";

class ContextConsumer extends Component {
  componentDidMount() {
    if (
      this.props.context &&
      typeof this.props.context.markStateComplete === "function"
    ) {
      this.props.context.markStateComplete(this.props.context.activeState);
    }
  }
  render() {
    const createMarkup = htmlString => ({ __html: htmlString });
    const html = this.props.context.activeStateContent.component.html;
    return <div dangerouslySetInnerHTML={createMarkup(html)} />;
  }
}

class CustomContentSection extends Component {
  static type = "content";

  static containerProps = {
    noTopSpacing: true
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          return (
            <FormConsumer>
              {context => {
                return <ContextConsumer context={context} />;
              }}
            </FormConsumer>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export { CustomContentSection };
