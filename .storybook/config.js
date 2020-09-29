import { configure, addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

// automatically import all files ending in *.stories.js
// configure(require.context('../src/stories', true, /\.stories\.js$/), module);

import { theme } from "../src/Theme";
addDecorator(withThemesProvider([theme]));

const req = require.context("../src", true, /\.story\.js$/);

// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

configure(req, module);
