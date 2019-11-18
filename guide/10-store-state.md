# Store State on Filesystem in CLI's respecting XDG-spec with Conf

Most of the time, your CLI UX can be improved by remembering what the user last used (because that is likely to be what they want again). In other words, **your CLI should have memory**. However, most of us tend to write CLI's as stateless scripts (Apart from state, there are [other problems with this](https://www.youtube.com/watch?v=ZueoIYnHiaI&feature=emb_title)).

I suspect this is mostly because we aren't aware how easy it can be to store state in CLI's. If we knew how easy it was, we'd do it more often.