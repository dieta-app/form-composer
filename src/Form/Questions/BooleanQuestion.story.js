import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { BooleanQuestion } from "./BooleanQuestion";

export default { title: "Form/Questions/BooleanQuestion" };

export const BooleanQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "Do the chickens have large talons?",
        component: {
          element: "BooleanQuestion",
          props: {
            negative: "Non",
            positive: "Ci"
          }
        },
        complete: true
      }
    ]}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >
    <FormBody />
  </FormProvider>
);

export const BooleanQuestionStoryStatic = () => (
  <FormProvider
    currentState={"1"}
    static
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "Do the chickens have large talons?",
        component: {
          element: "BooleanQuestion",
          props: {
            negative: "Non",
            positive: "Ci"
          }
        },
        complete: true
      }
    ]}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >
    <FormBody />
  </FormProvider>
);

// storiesOf("Form", module)
//   .addDecorator(storyFn => <div style={{ margin: "10px" }}>{storyFn()}</div>)
//   .add("BooleanQuestion", () => (

//   ));
