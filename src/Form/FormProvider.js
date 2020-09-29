import React, { Component, Children } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const FormContext = React.createContext();

export class FormProvider extends Component {
  static propTypes = {
    static: PropTypes.bool,
    activeState: PropTypes.string.isRequired,
    states: PropTypes.array.isRequired,
    onFormCompleted: PropTypes.func.isRequired,
    onAnsweredCallback: PropTypes.func.isRequired
  };

  static defaultProps = {
    static: false,
    completedColor: "PRIMARY_LIGHT",
    activeState: "1",
    states: [],
    onFormCompleted: () => {
      console.log("Form Complete");
    },
    onAnsweredCallback: () => {
      console.log("Question Answered");
    }
  };

  state = {
    currentState: this.props.currentState,
    activeStateContent: {},
    depths: [],
    ordering: []
  };

  componentDidMount = () => {
    this.initialize(this.props.states);
  };

  initialize = states => {
    const organization = this.groupIndicatorSections(states);
    const activeStateContent = this.deepTraverseStatesGet(
      states,
      this.state.currentState
    );
    const complete = this.checkStateComplete(activeStateContent.answer)

    this.setState({
      states: states,
      activeStateContent: {
        ...activeStateContent,
        complete: complete
      },
      depths: organization.depths,
      ordering: organization.ordering
    }); 
  };

  insertStateDepth = (states, ordering = [], depths = [], depth = 0) => {
    states.forEach(state => {
      ordering.push(state.step);
      if (!depths[depth]) {
        depths.push([]);
      }
      depths[depth].push(state);
      if (state.states && state.states.length) {
        this.insertStateDepth(state.states, ordering, depths, depth + 1);
      }
    });
    return {
      depths,
      ordering
    };
  };

  groupIndicatorSections = states => {
    return this.insertStateDepth(states, [], [], 0);
  };

  stateDecrementer = stateMap => {
    const currentIndex = this.state.ordering.findIndex(i => i === stateMap);
    if (currentIndex > 0) {
      return this.state.ordering[currentIndex - 1];
    } else {
      return this.state.ordering[currentIndex];
    }
  };

  stateIncrementer = stateMap => {
    const currentIndex = this.state.ordering.findIndex(i => i === stateMap);
    if (currentIndex < this.state.ordering.length - 1) {
      return this.state.ordering[currentIndex + 1];
    } else {
      return this.state.ordering[currentIndex];
    }
  };

  previousState = () => {
    const previousStateMap = this.stateDecrementer(this.state.currentState);

    const state = this.getStateContent(previousStateMap);
    const complete = this.checkStateComplete(state.answer)
    if (complete) {
      this.markStateComplete(state)
    }
    this.setState({
      currentState: previousStateMap,
      activeStateContent: this.deepTraverseStatesGet(
        this.state.states,
        previousStateMap
      )
    });
  };

  nextState = () => {
    const endState = this.state.ordering[this.state.ordering.length - 1];
    if (
      this.props.onNextState &&
      typeof this.props.onNextState === "function"
    ) {
      this.props.onNextState(this.state.activeStateContent);
    }

    if (this.state.currentState === endState) {
      if (
        this.props.onFormCompleted &&
        typeof this.props.onFormCompleted === "function"
      ) {
        this.props.onFormCompleted();
      }
    } else {
      const nextStateMap = this.stateIncrementer(this.state.currentState);

      const state = this.getStateContent(nextStateMap);
      const complete = this.checkStateComplete(state.answer)
      if (complete) {
        this.markStateComplete(state)
      }

      this.setState({
        currentState: nextStateMap,
        activeStateContent: this.deepTraverseStatesGet(
          this.state.states,
          nextStateMap
        )
      });
      
    }
  };

  goToState = stateMap => {
    const state = this.getStateContent(stateMap);
    const complete = this.checkStateComplete(state.answer)
    if (complete) {
      this.markStateComplete(state, )
    }
    this.setState({
      currentState: stateMap,
      activeStateContent: this.deepTraverseStatesGet(
        this.state.states,
        stateMap
      )
    });
    
  };

  deepTraverseStatesMutate = (states, mutateOps, mergeProps = {}) => {
    return states.map(state => {
      if (state[mutateOps.source.key] === mutateOps.source.value) {
        if (!state[mutateOps.target.key]) {
          state = {
            ...state,
            [mutateOps.target.key]: null
          };
        }
        state[mutateOps.target.key] = mutateOps.target.value;
        state = {
          ...state,
          ...mergeProps
        };
      }
      if (state.states) {
        state.states = this.deepTraverseStatesMutate(
          state.states,
          mutateOps,
          mergeProps
        );
      }
      return state;
    });
  };

  deepTraverseStatesGet = (states = this.state.states, stateMap) => {
    for (let state of states) {
      if (state.step === stateMap) {
        return state;
      }
      if (state.states) {
        const found = this.deepTraverseStatesGet(state.states, stateMap);
        if (found) {
          return found;
        }
      }
      continue;
    }
  };

  setStateAnswer = (stateMap, answer) => {
    this.initialize(
      this.deepTraverseStatesMutate(this.state.states, {
        source: {
          key: "step",
          value: stateMap
        },
        target: {
          key: "answer",
          value: answer
        }
      })
    );
  };

  checkStateComplete = answer => {
    let isComplete = !!answer;

    if (this.state.activeStateContent && 
      this.state.activeStateContent.component &&
      this.state.activeStateContent.component.props &&
      this.state.activeStateContent.component.props.optional) {
        isComplete = true
        console.log('set true 1');
    }

    if (this.state.activeStateContent && 
      this.state.activeStateContent.component &&
      this.state.activeStateContent.component.element === "CustomContentSection") {
        isComplete = true
        console.log('set true 2');
    }

    if (
      this.state.activeStateContent &&
      this.state.activeStateContent.component &&
      this.state.activeStateContent.component.props &&
      this.state.activeStateContent.component.props.columns
    ) {
      const set = new Set();
      this.state.activeStateContent.component.props.choices.forEach(choice => {
        set.add(choice.option);
      });
      if (typeof answer === "object") {
        Object.keys(answer).forEach(key => {
          set.delete(key);
        });
      }
      if (set.size !== 0) {
        isComplete = false;
      }
    }    
    return isComplete;
  };

  markStateComplete = (stateMap, mergeProps = {}) => {
    this.initialize(
      this.deepTraverseStatesMutate(
        this.state.states,
        {
          source: {
            key: "step",
            value: stateMap
          },
          target: {
            key: "complete",
            value: this.checkStateComplete(mergeProps.answer)
          }
        },
        mergeProps
      )
    );
  };

  markStateIncomplete = (stateMap, mergeProps) => {
    this.initialize(
      this.deepTraverseStatesMutate(
        this.state.states,
        {
          source: {
            key: "step",
            value: stateMap
          },
          target: {
            key: "complete",
            value: false
          }
        },
        mergeProps
      )
    );
  };

  getStateContent = stateMap => {
    return this.deepTraverseStatesGet(this.state.states, stateMap);
  };

  render() {
    return (
      <FormContext.Provider
        value={{
          static: this.props.static,
          depths: this.state.depths,
          ordering: this.state.ordering,
          states: this.state.states,
          activeState: this.state.currentState,
          activeStateContent: this.state.activeStateContent,
          getState: this.getStateContent,
          goToState: this.goToState,
          nextState: this.nextState,
          previousState: this.previousState,
          setStateAnswer: this.setStateAnswer,
          markStateComplete: this.markStateComplete,
          markStateIncomplete: this.markStateIncomplete,
          checkStateComplete: this.checkStateComplete,

          onFormCompleted: this.onFormCompleted,
          onNextState: this.props.onNextState,
          cb: this.props.onAnsweredCallback
        }}
      >
        {this.props.children}
      </FormContext.Provider>
    );
  }
}

export const FormConsumer = FormContext.Consumer;
