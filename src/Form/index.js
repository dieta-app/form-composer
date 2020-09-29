import { FormProgress } from "./FormProgress";
import { FormProvider, FormConsumer, FormContext } from "./FormProvider";
import { FormBody } from "./FormBody";
import { FormFooter } from "./FormFooter";
import * as Questions from "./Questions";

exports.FormProvider = FormProvider;
exports.FormConsumer = FormConsumer;
exports.FormContext = FormContext;
exports.FormBody = FormBody;
exports.FormFooter = FormFooter;
exports.FormProgress = FormProgress;
Object.keys(Questions).forEach(Question => {
  exports[Question] = Questions[Question];
});
