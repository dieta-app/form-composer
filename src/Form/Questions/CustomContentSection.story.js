import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormProgress } from "../FormProgress";
import { FormBody } from "../FormBody";
import { FormFooter } from "../FormFooter";
import { CustomContentSection } from "./CustomContentSection";

export default { title: "Form/Questions/CustomContentSection" };

export const CustomContentSectionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        checkpoint: "Dietary",
        checkpointSubtext:
          "Now let's understand if you've tried any Dietary triggers",
        component: {
          element: "CustomContentSection",
          html:
            '<style>pre code {font-size: 16px;line-height: 1.75;background: 0 0;padding: 30px;white-space: pre;-webkit-overflow-scrolling: touch;display: block;overflow-x: scroll;max-width: 100%;min-width: 100px;scrollbar-color: #666;scrollbar-width: .5em;}pre[rel=HTML]:before { color: #4caf50;font-family: Rubik,Lato,Lucida Grande,Lucida Sans Unicode,Tahoma,Sans-Serif;font-weight: 700;font-size: 12px;content: attr(rel);color: #fff;position: absolute;top: .33rem;left: .52rem;width: 100%;padding: 0; } pre[rel=HTML] { padding-top: 20px;background: #001628;font-family: Operator Mono SSm A,Operator Mono SSm B,Operator Mono,Source Code Pro,Menlo,Consolas,Monaco,monospace;clear: both;color: #fff;padding: 0;-moz-tab-size: 2;-o-tab-size: 2;tab-size: 2;-ms-word-break: normal;word-break: normal;-webkit-hyphens: none;-ms-hyphens: none;hyphens: none;position: relative;line-height: 28px;border-radius: 8px;min-width: 100px;max-width: 100%;overflow: hidden;}}</style><pre rel="HTML" class=" language-markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>blank.gif<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>this-classs-is-lazy<span class="token punctuation">"</span></span> <span class="token attr-name">data-src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>/images/full-size.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>240<span class="token punctuation">"</span></span> <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>152<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span></code></pre>'
        },
        states: [
          {
            step: "1-1",
            questionLabel: "1a",
            question: "What kind of pets have you had?",
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
          }
        ]
      }
    ]}
    onAnsweredCallback={(payload, context) => {
      // context.markStateComplete(context.activeState, {
      //   answer: payload.answer
      // });
    }}
  >
    <FormProgress />
    <FormBody />
    <FormFooter />
  </FormProvider>
);
