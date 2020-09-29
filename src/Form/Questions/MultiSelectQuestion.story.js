import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { MultiSelectQuestion } from "./MultiSelectQuestion";

export default { title: "Form/Questions/MultiSelectQuestion" };

export const MultiSelectQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "What kind of pets have you had?",
        component: {
          element: "MultiSelectQuestion",
          props: {
            choices: [
              {
                option:
                  "Cat's with allertic hairs that affect 25% of the population because they were enginerred that way by he himself"
              },
              {
                option: "Dog"
              },
              {
                option: "Fish"
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
