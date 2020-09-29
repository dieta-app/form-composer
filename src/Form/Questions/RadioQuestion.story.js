import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { BooleanQuestion } from "./BooleanQuestion";

export default { title: "Form/Questions/RadioQuestion" };

export const RadioQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "Why don't the chickens have large talons tho?",
        component: {
          element: "RadioQuestion",
          props: {
            choices: [
              {
                option: "They are in cages"
              },
              {
                option:
                  "They frequently file their nails out due to anxiety.  This is my really long answer that is here to illustrate a UI edge case"
              },
              {
                option: "They don't have talons"
              },
              {
                option: "Other"
              }
            ]
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

export const RadioQuestionStoryNormal = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "Why don't the chickens have large talons tho?",
        component: {
          element: "RadioQuestion",
          props: {
            choices: [
              {
                option: "They are in cages"
              },
              {
                option: "They frequently file their nails out due to anxiety."
              },
              {
                option: "They don't have talons"
              },
              {
                option: "Other"
              }
            ]
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
