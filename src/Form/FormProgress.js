import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "./FormProvider";
import Color from "color";
import QuestionComponents from "./Questions";

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const IndicatorContainer = styled.div`
  padding: 5px
    ${props => (props.count ? Math.ceil(20 / props.count) + "px" : "10px")};
  &:first-child {
    padding: 5px
      ${props => (props.count ? Math.ceil(10 / props.count) + "px" : "10px")} 0
      0;
  }
  &:last-child {
    padding: 5px 0 5px
      ${props => (props.count ? Math.ceil(10 / props.count) + "px" : "10px")};
  }
  &:only-child {
    padding: 5px 0;
  }
  flex-grow: 1;
`;
const ProgressIndicator = styled.div`
  border-radius: 20px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }

  &.active {
    background-color: ${props =>
      props.completedColor ? completedColor : props.theme.colors.PRIMARY_LIGHT};
  }
  &:not(.active) {
    background-color: ${props =>
      props.completedColor
        ? Color(completedColor)
            .lighten(0.2)
            .rgb()
            .round()
            .string()
        : Color(props.theme.colors.PRIMARY_LIGHT)
            .lighten(0.2)
            .rgb()
            .round()
            .string()};
  }
  &[disabled] {
    background-color: ${props => props.theme.colors.MID};
  }
  &[disabled]:hover {
    cursor: not-allowed;
  }
`;

class ProgressIndicatorGroups extends Component {
  static propTypes = {
    states: PropTypes.array.isRequired
  };

  static defaultProps = {
    states: []
  };

  state = {
    states: this.props.states
  };

  pressIndicator = step => {
    this.setState({
      active: true
    });
    if (this.props.onStateClick) {
      this.props.onStateClick(step);
    }
  };

  generateHeritageGroups = stateMap => {
    const states = stateMap.split("-");
    return states.reduce((acc, node) => {
      if (!acc.length) {
        acc.push(node);
      } else {
        const last = acc[acc.length - 1];
        acc.push(`${last}-${node}`);
        // acc.forEach((ancestor, i) => {
        //   acc.push(`${ancestor}-${node}`);
        // });
      }
      return acc;
    }, []);
  };

  render() {
    return (
      <FormConsumer>
        {context => {
          const activeStateDepth = context.activeState.split("-").length;
          return (
            <ProgressContainer>
              {this.props.states
                .map((state, index) => {
                  const thisStateDepth = state.step.split("-").length;
                  const active = context.activeState === state.step;
                  const complete = state.complete || (active && context.checkStateComplete(state.answer))
                  const generationNodes = this.generateHeritageGroups(
                    context.activeState
                  );
                  const currentGenerationNodes = this.generateHeritageGroups(
                    state.step
                  );
                  let isDirectAncestor = generationNodes.includes(state.step);
                  const sharedAncestor = generationNodes.filter(x =>
                    currentGenerationNodes.includes(x)
                  );
                  const ComponentStatics = context.activeStateContent.component
                    ? QuestionComponents[
                        context.activeStateContent.component.element
                      ]
                    : null;

                  const componentType = ComponentStatics
                    ? ComponentStatics.type
                    : "question";

                  const isCousin = !!sharedAncestor.length;
                  const isCheckpoint = componentType === "content";

                  if (this.props.depth > 0) {
                    if (isDirectAncestor || isCousin) {
                      if (activeStateDepth >= thisStateDepth) {
                        return (
                          <IndicatorContainer
                            count={this.props.states.length}
                            key={index}
                          >
                            <ProgressIndicator
                              question={state.question}
                              complete={complete}
                              active={active}
                              onClick={() =>
                                (complete || active) &&
                                this.pressIndicator(state.step)
                              }
                              disabled={
                                !complete && !active && !isDirectAncestor
                              }
                              className={active ? "active" : ""}
                            />
                          </IndicatorContainer>
                        );
                      } else {
                        return (
                          <IndicatorContainer
                            count={this.props.states.length}
                            key={index}
                          >
                            <div style={{ height: "10px" }}>&nbsp;</div>
                          </IndicatorContainer>
                        );
                      }
                    } else {
                      if (activeStateDepth === 1 && thisStateDepth > 1) {
                        return (
                          <IndicatorContainer
                            count={this.props.states.length}
                            key={index}
                          >
                            <div style={{ height: "10px" }}>&nbsp;</div>
                          </IndicatorContainer>
                        );
                      }
                      if (thisStateDepth > activeStateDepth) {
                        return (
                          <IndicatorContainer
                            count={this.props.states.length}
                            key={index}
                          >
                            <div style={{ height: "10px" }}>&nbsp;</div>
                          </IndicatorContainer>
                        );
                      }
                    }
                  } else {
                    return (
                      <IndicatorContainer
                        count={this.props.states.length}
                        key={index}
                      >
                        <ProgressIndicator
                          question={state.question}
                          complete={complete}
                          active={active || isDirectAncestor}
                          onClick={() =>
                            (complete || active) &&
                            this.pressIndicator(state.step)
                          }
                          disabled={
                            !complete && !active && !isDirectAncestor
                          }
                          className={active ? "active" : ""}
                        />
                      </IndicatorContainer>
                    );
                  }
                })
                .filter(i => i)}
            </ProgressContainer>
          );
        }}
      </FormConsumer>
    );
  }
}

class FormProgress extends Component {
  static propTypes = {
    completedColor: PropTypes.string.isRequired
  };

  static defaultProps = {
    completedColor: "PRIMARY_LIGHT"
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
            return context.depths.map((state, index) => (
              <ProgressIndicatorGroups
                key={index}
                onStateClick={context.goToState}
                depth={index}
                states={state}
              />
            ));
          }}
        </FormConsumer>
      </div>
    );
  }
}

export { FormProgress };
