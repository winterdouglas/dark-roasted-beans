# dark-roasted-beans

A small React Native app that will allow you to brew the tastiest coffee

## Description

This app implements a basic coffee brewing flow for a virtual coffee machine, with the coffee machine configuration and options coming from an API. The design is fully based and compliant with a provided Figma layout.

Check out the [screenshots](screenshots/README.md)!

## Features

- Allows picking a coffee type (eg.: cappuccino, ristretto)
- Allows picking a coffee size (eg.: small, medium, large)
- Allows picking optional extras (eg.: milk, sugar)
- It has an overview where you can see the current selection and edit the previously selected options
- A beautiful result screen with a Lottie animation telling the users that they succeeded making their coffee
- Error handling and crash reporting with a boundary
- Internationalization
- Dark and light modes: Follows the system theme
- Ability to refetch data on reconnect

## Stack

- React Native (0.71.x)
  - Using the bare template (not Expo)
- Typescript
- Yarn 3.x
- Redux Toolkit for the store
- Redux Toolkit Query (RTKQ) for API calls and caching through redux
- Reanimated for in-app animations
- Lottie for AfterEffects animations
  - Animations from LottieFiles
- React Navigation for navigation
- react-i18next for i18n
- react-native-svg for SVG icons
- react-native-config for config/environment variables
- ESLint and Prettier for linting and formatting
- Jest

## Instructions

Clone the repo

Configure the environment variables `.env` based on the `.env.example` file

Install packages with yarn. It should be really fast because of the Yarn cache!

```
yarn
```

Install Pods: **Skip it**, there's no need to install pods manually since there's a `post-install` script that does that for you

Running:

```
yarn ios
yarn android
```

## App structure

```
/assets     // fonts, animation files, etc
/components // fully reusable components
/config     // project configuration, exposes settings from the env
/contexts   // for app wide contexts
/features   // holds the many features the app could have, each feature can contain its own hooks, components, etc
/hooks      // app wide hooks
/lib        // abstracts away libraries (facade)
/navigation // app navigators (react navigation)
/screens    // the container screens, they should have the bare minimum
/store      // store setup
/theme      // all sorts of theming aspects, including spacings, typography and the themes themselves
/utils      // utility functions
/App.tsx    // the starting point :}
```

### VS Code

The project is configured with vscode recommendations and settings, therefore you should be prompted to install the recommended extensions when opening the workspace. Formatting on save and the default formatter are also configured by default.

### Additional Info

The project was created with React Native's Typescript template, therefore it has been fully setup and created from scratch.

Some pieces of code in this project were based on Ignite (https://github.com/infinitered/ignite). More specifically the `post-install` script, the `useSafeAreaInsetsStyle` and a few components (like the `Screen` and `Text`). None of them are direct copies, they were taken as references / ideas and modified for the needs of this project.

## What's next

- [ ] To save the chosen coffee
- [ ] NFC scanning to connect with a coffee machine
- [ ] Fix some SVG rendering issues on Android
- [ ] To include the correct font on Android
- [ ] Beautiful empty states for the lists
- [ ] Pull-to-refresh on the lists
- [ ] Move some code that's left in the screens and could be made part of the feature
- [ ] Detox tests
- [ ] Unit tests
- [ ] Storybook
- [ ] CI/CD
