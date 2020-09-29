import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { SimpleTextInputQuestion } from "./SimpleTextInputQuestion";

export default { title: "Form/Questions/SimpleTextInputQuestion" };

export const SimpleTextInputQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "What is your name?",
        component: {
          element: "SimpleTextInputQuestion",
          props: {
            label: "First Last"
          }
        }
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

export const SimpleTextInputQuestionStoryMMDDYYYY = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "When were you born",
        component: {
          element: "SimpleTextInputQuestion",
          props: {
            label: "MM/DD/YYYY",
            pattern: {
              "body": "^\\d{2}\/\\d{2}\/\\d{4}$",
              "flags": "gi"
            }
          }
        }
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
