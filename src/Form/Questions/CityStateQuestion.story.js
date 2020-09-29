import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { CityStateQuestion } from "./CityStateQuestion";

export default { title: "Form/Questions/CityStateQuestion" };

// window.google_maps_apiKey = ''

export const CityStateQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        answer: ["Oak Park, CA, USA"],
        question: "Where your crib at tho?",
        component: {
          element: "CityStateQuestion",
          props: {}
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
