# Create CLI's that Intelligently Adapt to Usage with Frecency

The best CLI I have ever used is https://github.com/rupa/z.

It has one API: `z`.

But that's not the great thing about it - it is the fact that it "learns" via your usage.

This is the same algorithm underlying [Slack's `Command+K` selections](https://slack.engineering/a-faster-smarter-quick-switcher-77cbc193cb60) and [Mozilla](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/Places/Frecency_algorithm):

[![https://miro.medium.com/max/700/1*jFMEoAe7fzF-PERNF9aBQQ.gif](https://miro.medium.com/max/700/1*jFMEoAe7fzF-PERNF9aBQQ.gif)](https://slack.engineering/a-faster-smarter-quick-switcher-77cbc193cb60)

For long lists, this can result in 10x faster searches!

[https://miro.medium.com/max/604/1*on6QoCfx2At6gn03Krmh1w.png](https://miro.medium.com/max/604/1*on6QoCfx2At6gn03Krmh1w.png)

```bash
yarn add frecency
```

Frecency is made for the browser, so in Node it assumes the localStorage API:

```js
const Conf = require('conf');
const path = require('path');
import { LocalStorage } from "node-localstorage";
 
const config = new Conf();
const storageProviderFrecencyFilePath = path.join(path.basedir(config.path), 'frecency');
const storageProvider = new LocalStorage(storageProviderFrecencyFilePath);
const Fruitcency = new Frecency({
  key: 'fruits',
  // idAttribute: '_id', // unique identifier, defaults to '_id'
  storageProvider
});
```

Now when your user makes selections:

```js
onSelect: (searchQuery, selectedResult) => {
  // ...
  Fruitcency.save({
    searchQuery, // an object, with _id in it
    selectedId: selectedResult._id
  });
  // ...
}
```

And before you display:

```js
onSearch: (searchQuery) => {
  ...
  // Search results received from a search API.
  const searchResults = [
    { _id: 'Apple'}, 
    { _id: 'Banana' }, 
    // ...
  ];
 
  return Fruitcency.sort({
    searchQuery,
    results: searchResults
  });
```

## No Exercise

We won't try to use this since it is so niche, but I figured I'd mention it for anything where you have long lists bc it is so cool.