# Form Composer React Micro App

This react app is meant to be used in a parent app and can provide an interface for fascilitating surveys for tons of use cases.
The app is backend agnostic, as the answer callback functions exposed are meant to be where API calls are performed.

## Usage
In parent app:

```javascript
import React from "react";
import {
  ThemeProvider
  FormProvider,
  FormProgress,
  FormBody,
  FormFooter
} from "@dieta/form-composer";

const Survey = class Survey extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentState: "1",
    surveyStates: [] // template data objects (fetch or provide static) (if already saved, must be merged or reconciled with remote state)
  }

  async componentDidMount() {
    // fetch survey if remote
    // reconcile surveyStates and merge with template data (surveyStates)
  }

  render() {
    return (
      <ThemeProvider>
        <FormProvider
          currentState={this.state.currentState}
          states={this.state.surveyStates}
          onFormCompleted={async () => {
            // do something
          }}
          onNextState={state => {
            if (state.question) {
              // handle question being answered
              // console.log(state.question, state.answer);
            }
            window && window.scrollTo(0, 0);
          }}
          onAnsweredCallback={async (payload, context) => {
            context.markStateComplete(context.activeState, {
              answer: payload.answer
            });
            if (context.checkStateComplete(payload.answer)) {
              // handle question being answered
              // console.log(state.question, state.answer);
            }
          }}
        >
          <FormProgress />
          <FormBody />
          <FormFooter bottomSpaceHeight={50} />
        </FormProvider>
      </ThemeProvider>
    );
  }
}
```

The main props for FormProvider (React Component exposed for developers) are:

### `onAnsweredCallback`
function: 
callback which fires whenever a question has been answered.  it contains a complex payload object as its argument.  these are well structured and consistent with each FormQuestion component.

### `onNextState`
function: 
callback which fires when a question is answered. its argument is a currentState integer string.  when the FormFooter button is pressed, this fires

### `onFormCompleted`
function:
callback which fires when the last question has been answered

### `currentState`
string<integer>:
an integer string pointing to where the form focus should start when rendering the survey. only used on init

### `states
array<object>:
this is where the form content template should be passed. any already answered questions should first be merged into the template before rendering `FormProvider`


## Development

`npm run storybook` spins up a HMR storybook instance with each component
Example question surveys are provided in this repo, preloaded in src/Form/Surveys

Theme colors are static for now.  PR's welcome to make them more dynamic.

## Building / Deploying

`npm run build`
A dist folder will be generated.  You can now deploy to npm or github, importing / require should work as expected

## Docs

`npm run build-storybook`
This makes a github pages ready version of the storybook playbook. (Currently broken :/)