import "jest-styled-components";

describe("Index", () => {
  test("The components should exist", () => {
    const {
      Button,
      ThemeProvider,
      FormProvider,
      FormConsumer,
      FormContext,
      FormBody,
      FormFooter,
      FormProgress,
      BooleanQuestion,
      RadioQuestion,
      MultiSelectQuestion,
      CityStateQuestion,
      SimpleSelectQuestion,
      SimpleTextInputQuestion
    } = require(".");

    expect(Button).toBeDefined();
    expect(ThemeProvider).toBeDefined();
    expect(FormProvider).toBeDefined();
    expect(FormConsumer).toBeDefined();
    expect(FormContext).toBeDefined();
    expect(FormBody).toBeDefined();
    expect(FormFooter).toBeDefined();
    expect(FormProgress).toBeDefined();
    expect(BooleanQuestion).toBeDefined();
    expect(RadioQuestion).toBeDefined();
    expect(MultiSelectQuestion).toBeDefined();
    expect(CityStateQuestion).toBeDefined();
    expect(SimpleSelectQuestion).toBeDefined();
    expect(SimpleTextInputQuestion).toBeDefined();
  });
});
