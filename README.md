# PostCSS Generate Asset PHP

[PostCSS] plugin that generates a PHP file containing a hashed version number for a stylesheet.

[PostCSS]: https://github.com/postcss/postcss

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-generate-asset-php
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
    require('autoprefixer'),
+	require('postcss-generate-asset-php'),
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
