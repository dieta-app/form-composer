import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider, FormConsumer } from "./FormProvider";
import { FormProgress } from "./FormProgress";
import { FormBody } from "./FormBody";
import { FormFooter } from "./FormFooter";

export default { title: "Form/FormProvider" };

export const FormProviderStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "What is your favourite animal?",
        component: {
          element: "MultiSelectQuestion",
          props: {
            choices: [
              {
                option: "Cat"
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
      },
      {
        step: "2",
        questionLabel: "2",
        question: "Where do you live?",
        component: {
          element: "CityStateQuestion",
          props: {}
        }
      },
      {
        step: "3",
        questionLabel: "3",
        question: "Do the chickens have large talons?",
        component: {
          element: "BooleanQuestion",
          props: {}
        },
        states: [
          {
            step: "3-1",
            questionLabel: "3a",
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
          },
          {
            step: "3-2",
            questionLabel: "3b",
            question: "Would you prefer large beaks?",
            component: {
              element: "BooleanQuestion",
              props: {}
            },
            states: [
              {
                step: "3-2-1",
                questionLabel: "3b-i",
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
            ]
          }
        ]
      },
      {
        step: "4",
        questionLabel: "4",
        question: "Do the chickens have large talons?",
        component: {
          element: "BooleanQuestion",
          props: {}
        },
        states: [
          {
            step: "4-1",
            questionLabel: "4a",
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
    <FormBody />
    <FormFooter />
  </FormProvider>
);


export const FormProviderWorkbenchStory1 = () => {
  const onboarding = require("./surveys/onboarding.json")
  return (
  <FormProvider
    currentState={"1"}
    states={onboarding.data}
    onNextState={state => {}}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >
    <FormProgress />
    <FormBody />
    <FormFooter />
  </FormProvider>
)};

export const FormProviderWorkbenchStory2 = () => {
  const generalGI = require("./surveys/general_gi.json")
  return (
  <FormProvider
    currentState={"1"}
    states={generalGI.data}
    onNextState={state => {}}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >
    <FormProgress />
    <FormBody />
    <FormFooter />
  </FormProvider>
)};

export const FormProviderWorkbenchStory3 = () => {
  const telemed = require("./surveys/telemedicine_intro.json")
  return (
  <FormProvider
    currentState={"1"}
    states={telemed.data}
    onNextState={state => {}}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >
    <FormProgress />
    <FormBody />
    <FormFooter bottomSpaceHeight={30}/>
  </FormProvider>
)};


export const FormProviderWorkbenchStoryStatic = () => {
  return (
  <FormProvider
    static
    currentState={"1"}
    states={[{
      "step": "1",
      "questionLabel": "",
      "question": "Which of the following GI symptoms do you have?",
      "questionSubtext": "If you don't have any of these, select N/A!",
      "component": {
        "element": "MultiSelectQuestion",
        "props": {
          "choices": [
            {
              "option": "Diarrhea"
            },
            {
              "option": "Constipation"
            },
            {
              "option": "Nausea/Vomiting"
            },
            {
              "option": "Reflux/Heartburn"
            },
            {
              "option": "Abdominal Pain"
            },
            {
              "option": "Gas that improves with belching"
            },
            {
              "option": "Gas that improves with flatulence (farting)"
            },
            {
              "option": "Bloating/Distention that improves with neither belching nor flatulence"
            },
            {
              "option": "Feeling full early"
            },
            {
              "option": "N/A"
            }
          ]
        }
      }
    },]}
    onNextState={state => {}}
    onAnsweredCallback={(payload, context) => {
      context.markStateComplete(context.activeState, {
        answer: payload.answer
      });
    }}
  >

    <FormBody />
  </FormProvider>
)};
