import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { FormProvider } from "../FormProvider";
import { FormBody } from "../FormBody";
import { SimpleSelectQuestion } from "./SimpleSelectQuestion";

export default { title: "Form/Questions/SimpleSelectQuestion" };

export const SimpleSelectQuestionStory = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "What year were you born?",
        answer: ["1991"],
        component: {
          element: "SimpleSelectQuestion",
          props: {
            choices: [
              "2018",
              "2017",
              "2016",
              "2015",
              "2014",
              "2013",
              "2012",
              "2011",
              "2010",
              "2009",
              "2008",
              "2007",
              "2006",
              "2005",
              "2004",
              "2003",
              "2002",
              "2001",
              "2000",
              "1999",
              "1998",
              "1997",
              "1996",
              "1995",
              "1994",
              "1993",
              "1992",
              "1991",
              "1990",
              "1989",
              "1988",
              "1987",
              "1986",
              "1985",
              "1984",
              "1983",
              "1982",
              "1981",
              "1980",
              "1979",
              "1978",
              "1977",
              "1976",
              "1975",
              "1974",
              "1973",
              "1972",
              "1971",
              "1970",
              "1969",
              "1968",
              "1967",
              "1966",
              "1965",
              "1964",
              "1963",
              "1962",
              "1961",
              "1960",
              "1959",
              "1958",
              "1957",
              "1956",
              "1955",
              "1954",
              "1953",
              "1952",
              "1951",
              "1950",
              "1949",
              "1948",
              "1947",
              "1946",
              "1945",
              "1944",
              "1943",
              "1942",
              "1941",
              "1940",
              "1939",
              "1938",
              "1937",
              "1936",
              "1935",
              "1934",
              "1933",
              "1932",
              "1931",
              "1930",
              "1929",
              "1928",
              "1927",
              "1926",
              "1925",
              "1924",
              "1923",
              "1922",
              "1921",
              "1920",
              "1919",
              "1918",
              "1917",
              "1916",
              "1915",
              "1914"
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

export const SimpleSelectQuestionOther = () => (
  <FormProvider
    currentState={"1"}
    states={[
      {
        step: "1",
        questionLabel: "1",
        question: "How long have you been a pimp?",
        component: {
          element: "SimpleSelectQuestion",
          props: {
            choices: [
              "Less than 6 months",
              "Between 6 and 12 months",
              "Between 1 and 2 years",
              "Between 2 and 3 years",
              "Between 3 and 5 years",
              "Between 5 and 10 years",
              "More than 10 years",
              "For as long as I can remember"
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
