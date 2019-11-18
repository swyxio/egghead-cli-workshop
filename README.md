
# CLI Workshop


👋 hi there! My name is [swyx](https://swyx.io) and this is the
source material for [the Egghead CLI workshop!](https://swyx.io/teaching/CLI)!

![image](https://user-images.githubusercontent.com/6764957/69071656-3c6d6b80-0a65-11ea-8aad-2ceeff65f913.png)

## Pre-Workshop Instructions/Requirements

In order for us to maximize our efforts during the workshop, please do the
following:

- [ ] Setup the project (follow the setup instructions below) (~5 minutes)
- [ ] Install and setup [Zoom](https://zoom.us) on the computer you will be
      using (~5 minutes)
- [ ] Watch
      [Use Zoom for KCD Workshops](https://egghead.io/lessons/egghead-use-zoom-for-kcd-workshops)
      (~8 minutes).
- [ ] Read [12 Factor CLI Apps](https://medium.com/@jdxcode/12-factor-cli-apps-dd3c227a0e46) or Watch [Rules for creating great developer CLIs](https://devrel.net/developer-experience/rules-for-creating-great-developer-clis) (20 mins)
- [ ] Write down 2-3 small Node.js CLI's you'd like to explore (points if I haven't heard of them!)
- [ ] (Optional) Browse the [CLI Cheatsheet](https://github.com/sw-yx/cli-cheatsheet)

The more prepared you are for the workshop, the better it will go for you.

## System Requirements

- [git][git] v2.20.1 or greater
- [NodeJS][node] v10.15.3 or greater
- [npm][npm] v6.9.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Structure

- 1 - CLI Basics
  - 1A: Create a Hello World Single-Command CLI with Oclif
  - 1B: Parse Arguments and Flags in an Oclif Command
  - 1C: Understand when to use Multi-Command vs Single-Command in Oclif
  - 1D: Set up Debugging and Testing for CLI's
- 2 - Heavy Lifting
  - 2A: Beautiful Prompts for User Input with Enquirer
  - 2B: Read User Config with Cosmiconfig
  - 2C: Build Your Own Boilerplate Scaffolding CLI with Copy-Template-Dir
  - 2D: Execute and Pipe Child Processes with Execa
- 3 - Polish
  - 3A: Prompt Users to Update CLI Versions with Update Notifier
  - 3B: Store State on Filesystem in CLI's respecting XDG-spec with Conf
  - 3C: Create CLI's that Intelligently Adapt to Usage with Frecency
  - 3D: Polish CLI Output with Ora, CLI-UX, and Chalk
- 4 - React Ink
  - 4A: Build Interactive CLI Components with React Ink
  - 4B: Create Flexible CLI Layouts with React Ink's Box Component
  - 4C: Create Dynamic Command Line User Interfaces with React Ink Input Components

## License

MIT

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[win-path]:
  https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
