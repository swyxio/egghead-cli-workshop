// postcss relies on this to know whether to apply purgecss
const isProduction = !process.env.ROLLUP_WATCH;

module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-nested'),
    ...(isProduction
      ? [
          require('@fullhuman/postcss-purgecss')({
            // Specify the paths to all of the template files in your project
            content: [
              './index.html',
              './src/**/*.tsx'
              // './src/**/*.elm',
              //"./src/**/*.html",
              //"./src/**/*.vue",
              // etc.
            ],

            // Include any special characters you're using in this regular expression
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ]
      : [])
  ]
};
