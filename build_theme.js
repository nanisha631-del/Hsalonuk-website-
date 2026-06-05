/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { execSync } from "child_process";

try {
  console.log("Running Shopify Theme compilation & packaging...");
  const stdout = execSync("python3 build_theme.py", { encoding: "utf-8" });
  console.log(stdout);
  console.log("Shopify Theme compiled & zipped successfully.");
} catch (error) {
  console.error("Failed to execute theme packager:", error);
  process.exit(1);
}
