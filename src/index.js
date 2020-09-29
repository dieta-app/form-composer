
import Button from "./Button";
import { ThemeProvider } from "./Theme";
import * as FormComponents from "./Form";

exports.Button = Button;
exports.ThemeProvider = ThemeProvider;
Object.keys(FormComponents).forEach(Component => {
  exports[Component] = FormComponents[Component];
});
