import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { FormConsumer, FormContext } from "./FormProvider";
import QuestionComponents from "./Questions";

const fadeInRight = keyframes`
  0%{
    opacity: 0;
    // transform: translateX(500px);
  }
  100% {
    opacity: 1;
    // transform: translateX(0);
  }
`;

const fadeInLeft = keyframes`
  0%{
    opacity: 0;
    // transform: translateX(-500px);
  }
  100% {
    opacity: 1;
    // transform: translateX(0);
  }
`;

const FormBodyContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin-bottom: ${props => props.noFooter ? 0 : '80px'};
  animation: ${fadeInRight} 0.2s linear;
  overflow-x: hidden;
`;

const FormBodyQuestionContainer = styled.div`
  flex: 1;
  flex-direction: row;
`;

const FormBodyQuestionLabel = styled.h2`
  margin: 0;
  padding: 5px 0;
  font-family: proxima-nova;
`;

const FormBodyContentHeader = styled.h2`
  margin: auto;
  text-align: center;
  padding: 5px 0;
  font-family: proxima-nova;
`;

const FormBodyQuestionSubtext = styled.h4`
  margin: 0;
  padding: 5px 0 0 0;
  font-family: proxima-nova;
  font-weight: 100;
`;

const FormBodyContentSubtext = styled.h4`
  margin: auto;
  text-align: center;
  padding: 5px 0 0 0;
  font-family: proxima-nova;
  font-weight: 100;
`;

const FormBodyQuestion = styled.h3`
  margin: 0;
  padding: 5px 0;
  font-family: proxima-nova;
`;

const FormBodyAnswers = styled.div`
  width: ${props => (props.fullScreen ? "100%" : "auto")};
  @media (min-width: 472px) {
    margin: auto;
  }
  padding-top: ${props => (props.noTopSpacing ? "10px" : "40px")};
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  justify-content: center;
`;

class FormBody extends Component {
  static propTypes = {};

  static defaultProps = {
    noFooter: false
  };

  state = {
    activeState: []
  };

  componentDidMount() {
    this.setState({
      activeState: this.context.activeState
    });
  }
  componentDidUpdate() {
    if (this.state.activeState !== this.context.activeState) {
      const pastIndex = this.context.ordering.findIndex(
        stateMap => this.state.activeState === stateMap
      );
      const newIndex = this.context.ordering.findIndex(
        stateMap => this.context.activeState === stateMap
      );

      if (pastIndex < newIndex) {
        console.log("animate right");
      } else {
        console.log("animate left");
      }
      this.setState({
        activeState: this.context.activeState
      });
    }
  }

  computeComponent = context => {
    let Component = <></>;
    if (context.activeStateContent.component) {
      const props = context.activeStateContent.component.props;
      Component = React.createElement(
        QuestionComponents[context.activeStateContent.component.element],
        context.activeStateContent.answer
          ? {
              ...props,
              answer: context.activeStateContent.answer
            }
          : props
      );
    } else {
      Component = <>{this.props.children}</>;
    }
    return Component;
  };

  renderQuestionPreContent = context => {
    return (
      <div>
        {!context.static ? (
          <FormBodyQuestionLabel>
            Question {context.activeStateContent.questionLabel}
          </FormBodyQuestionLabel>
        ) : (<></>)}
        
          <FormBodyQuestion>
            {context.activeStateContent.questionPrefix
              ? `${context.activeStateContent.questionPrefix} `
              : ""}
            {context.activeStateContent.question}
          </FormBodyQuestion>
          {!context.static ? (
            context.activeStateContent.questionSubtext ? (
              <FormBodyQuestionSubtext>
                {context.activeStateContent.questionSubtext}
              </FormBodyQuestionSubtext>
            ) : (<></>)
          ) : (<></>)}
               
      </div>
    );
  };

  renderContentPreContent = context => {
    return (
      <div>
        <FormBodyContentHeader>
          {context.activeStateContent.checkpoint}
        </FormBodyContentHeader>
        {context.activeStateContent.checkpointSubtext && (
          <FormBodyContentSubtext>
            {context.activeStateContent.checkpointSubtext}
          </FormBodyContentSubtext>
        )}
      </div>
    );
  };

  renderPreContent = (context, type) => {
    switch (type) {
      case "question":
        return this.renderQuestionPreContent(context);
      case "content":
        return this.renderContentPreContent(context);
      default:
        return this.renderQuestionPreContent(context);
    }
  };

  render() {
    return (
      <div
        style={{
          margin: "10px"
        }}
      >
        <FormConsumer>
          {context => {
            const Component = this.computeComponent(context);
            const ComponentStatics = context.activeStateContent.component
              ? QuestionComponents[context.activeStateContent.component.element]
              : null;
            const containerProps = ComponentStatics
              ? ComponentStatics.containerProps
              : {};
            const componentType = ComponentStatics
              ? ComponentStatics.type
              : "question";

            return (
              <FormBodyContainer>
                <FormBodyQuestionContainer>
                  {this.renderPreContent(context, componentType)}
                </FormBodyQuestionContainer>
                
                <FormBodyAnswers {...containerProps}>
                  {Component}
                </FormBodyAnswers>
              </FormBodyContainer>
            );
          }}
        </FormConsumer>
      </div>
    );
  }
}

FormBody.contextType = FormContext;
export { FormBody };
