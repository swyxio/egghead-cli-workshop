# Why write CLI's?

## Productivity

> "Here's a thing that I learned at FB that I wish I knew much earlier. Invest in building custom tools! It can be a script you could write in a day. And at small and medium companies, even a little effort can yield a huge return."
- [Dan Abramov](https://twitter.com/dan_abramov/status/1140259247680315393)


I Defer to XCKD on this:
[![https://imgs.xkcd.com/comics/is_it_worth_the_time.png](https://imgs.xkcd.com/comics/is_it_worth_the_time.png)](https://xkcd.com/1205/)

Most people can only work on saving weekly tasks of 1hr or more:

![is_it_worth_the_time2](https://user-images.githubusercontent.com/6764957/69046347-aff68500-0a33-11ea-9203-a40a0ac63a10.png)

In this workshop, the goal is to get you to here:

![is_it_worth_the_time3](https://user-images.githubusercontent.com/6764957/69046351-b258df00-0a33-11ea-8a6b-fbcf45f83881.png)

## Developer Experience

- https://github.com/ChristopherBiscardi/gatsby-theme
- https://github.com/netlify/cli/
- https://github.com/plopjs/plop#why-generators

It's not just about staying in the terminal, it is also an opportunity to provide guard rails for your users so they spend less time futzing around your docs and more time just getting productive.

Developer facing Companies all have large CLI's in production:

- [Stripe](https://stripe.com/en-sg/blog/stripe-cli)
- [Twilio](https://www.twilio.com/blog/announcing-beta-twilio-cli)
- [Heroku](https://devcenter.heroku.com/articles/heroku-cli)
- [Salesforce](https://developer.salesforce.com/tools/sfdxcli)
- [Auth0](https://auth0.com/docs/extensions/deploy-cli)
- [Algolia](https://github.com/algolia/algolia-cli)
- [Box](https://developer.box.com/en/guides/tooling/sdks/cli/)
- [SendGrid](https://github.com/sendgrid/sendgrid-cli)
- [AWS](https://aws.amazon.com/cli/)
- [Serverless](https://serverless.com/cli/)
- [Zeit](https://zeit.co/download)
- [Netlify](https://www.netlify.com/products/dev/?utm_source=workshop&utm_medium=swyxcli&utm_campaign=devex)

## Developer Tool Mastery

You already use CLI's EVERYWHERE:

- git
- create-react-app/vue-cli/ng-cli
- yarn/npm
- Webpack/Rollup/Parcel
- Babel
- TypeScript/Flow
- ESlint/Prettier
- [graphql codegen](https://graphql-code-generator.com/), [graphql nexus](https://nexus.js.org/), [typegraphql](https://typegraphql.ml/docs/installation.html), [Relay compiler](https://github.com/facebook/relay/tree/master/packages/relay-compiler)
- Cypress/Storybook/Jest/Mocha
- gulp/grunt
- sirv/serve
- `postcss-cli`/`tailwind`
- now/netlify/amplify

When you run into problems with any CLI's you use, being able to deconstruct which causing problems is super helpful.

## Who am I

I have a love affair with CLI's:

- I wrote [create-react-app-parcel](https://www.npmjs.com/package/create-react-app-parcel)
- and did a [talk about the history of Create-React-App](https://www.youtube.com/watch?v=Et571vTAtT8)
- and have contributed and studied both `gatsby` and `tsdx` as CLI's
- I was the lead CLI dev on [Netlify Dev](https://news.ycombinator.com/item?id=19615546)
- I am currently working on a fork of [Svelte Sapper](https://sapper.svelte.dev/) that is a [static site generator](https://github.com/sw-yx/ssg)

## A note on Node

Node.js isn't the only language/environment to write CLI's with. It can be slower than Go or Rust or YOUR_LANGUAGE_OF_CHOICE. But it has two advantages:

- JS devs will already have it installed, no extra step needed
- Being able to leverage the vast npm ecosystem, including everything [Sindre Sorhus](https://github.com/sindresorhus/) has done

