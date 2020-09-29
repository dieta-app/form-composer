import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { SelectColumnarQuestion } from "./SelectColumnarQuestion";

export default { title: "Form/Questions/SelectColumnarQuestion" };

export const SelectColumnarQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "What is your level of experience with the following",
        answer: {
          "Trying Polyethylene Glycol": "Not Sure"
        },
        component: {
          element: "SelectColumnarQuestion",
          props: {
            defaultSelected: "Didn't try this",
            columns: [
              "Didn't try this",
              "Tried but didn't help",
              "Tried and it helped",
              "Not Sure",
              "Other / Not Applicable LALAALAL"
            ],
            choices: [
              {
                option: "Trying Polyethylene Glycol"
              },
              {
                option: "Dogs"
              },
              {
                option: "Fishes"
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
