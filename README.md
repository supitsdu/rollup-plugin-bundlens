# Bundlens - Rollup.js Plugin

A Rollup.js plugin that analyzes and reports bundle metrics including file sizes, gzip sizes, and detailed bundle information.

## Features

- 📊 Reports bundle size metrics
- 📦 Shows individual chunk and asset sizes
- 🗜️ Includes gzip size information
- 🎨 Color-coded size indicators
- 📝 Detailed bundle summary

## Usage

Add the plugin to your rollup.config.js:

```js
import { reportDetails } from "rollup-plugin-bundlens"

export default {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [reportDetails()],
}
```

## Output Example

![Plugin Output Preview](/metrics-output.webp)

## Color-coded indicators for bundle sizes

- 🟢 Green: < 16kB
- 🟡 Yellow: < 64kB
- 🔴 Red: < 120kB
- 🟣 Magenta: >= 120kB

## License

Licensed under the [MIT License](/LICENSE)
