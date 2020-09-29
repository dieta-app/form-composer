import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer, FormContext } from "./FormProvider";

import Button from "../Button";

const FormFooterContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.PRIMARY_DARK};
  height: ${props => props.bottomSpaceHeight ? props.bottomSpaceHeight + 85 : 85}px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const noAutoFocus = [
  "SimpleTextInputQuestion"
]

class FormFooter extends Component {
  static propTypes = {
    bottomSpaceHeight: PropTypes.number
  };

  static defaultProps = {
    bottomSpaceHeight: 0
  };

  keyHandling(e) {
    if (this.context) {
      if (e.keyCode === 37) {
        this.context.previousState();
      }
      if (e.keyCode === 39 || e.keyCode === 13) {
        if (!!this.context.activeStateContent.complete) {
          this.context.nextState();
        }
      }
    }
  }

  componentDidMount() {
    window.removeEventListener("keyup", this.keyHandling.bind(this));
    window.addEventListener("keyup", this.keyHandling.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.keyHandling.bind(this));
  }

  render() {
    return (
      <FormConsumer>
        {context => {
          if (!!context.activeStateContent.complete && !noAutoFocus.includes(context.activeStateContent.component.element)) {
            setTimeout(() => {
              this.nextButton && this.nextButton.focus();
            }, 0);
          }
          return (
            <FormFooterContainer bottomSpaceHeight={this.props.bottomSpaceHeight}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: this.props.bottomSpaceHeight + 10
                }}
              >
                <Button
                  height={'50px'}
                  fontSize={'24px'}
                  ref={c => (this.nextButton = c)}
                  onClick={context.nextState}
                  disabled={!!!(context.activeStateContent.complete || context.checkStateComplete(context.activeStateContent.answer))}
                >
                  {context.activeState ===
                  context.ordering[context.ordering.length - 1]
                    ? "Finish"
                    : "Continue"}
                </Button>
              </div>
            </FormFooterContainer>
          );
        }}
      </FormConsumer>
    );
  }
}
FormFooter.contextType = FormContext;
export { FormFooter };
