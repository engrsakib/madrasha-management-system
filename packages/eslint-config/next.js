import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

import base from "./base.js";

/** @type {import("eslint").Linter.Config[]} */
export default [...nextCoreWebVitals, ...nextTypescript, ...base];
