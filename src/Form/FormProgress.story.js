import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "../Button";

import { FormProvider, FormConsumer } from "./FormProvider";
import { FormProgress } from "./FormProgress";
import { FormBody } from "./FormBody";
import { FormFooter } from "./FormFooter";

export default { title: "Form/FormProgress" };

export const FormProgressStory = () => (
  <FormProvider
    currentState={"2-2-1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "Do the chickens have large talons?",
        complete: true
      },
      {
        step: "2",
        questionLabel: "2",
        question: "Do the chickens have large talons?",
        complete: true,
        states: [
          {
            step: "2-1",
            questionLabel: "2a",
            question: "Why don't the chickens have large talons tho?",
            complete: true
          },
          {
            step: "2-2",
            questionLabel: "2b",
            question: "Would you prefer large beaks?",
            complete: true,
            states: [
              {
                step: "2-2-1",
                questionLabel: "2b-i",
                question: "Why don't the chickens have large talons tho?"
              }
            ]
          }
        ]
      },
      {
        step: "3",
        questionLabel: "3",
        question: "Do the chickens have large talons?"
      },
      {
        step: "4",
        questionLabel: "4",
        question: "Do the chickens have large talons?",
        states: [
          {
            step: "4-1",
            questionLabel: "4a",
            question: "Why don't the chickens have large talons tho?"
          }
        ]
      }
    ]}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >
    <FormProgress />
    <FormBody>
      <FormConsumer>
        {context => {
          return (
            <div
              style={{
                display: "flex",
                flex: 1,
                flexBasis: "end",
                flexDirection: "row",
                justifyContent: "cetner",
                alignItems: "center"
              }}
            >
              <Button
                onClick={() => context.markStateComplete(context.activeState)}
                disabled={!!context.activeStateContent.complete}
              >
                Complete
              </Button>
            </div>
          );
        }}
      </FormConsumer>
    </FormBody>
    <FormFooter />
  </FormProvider>
);
