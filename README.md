# nblocks-react-native
This plugin supercharges your React native app with Nblocks powers in a true plug-n-play manner.

Developement instructions further down.
# Built in Functionality
* UI components for
  * Auth (Login, Social login, Submit reset password, Set new password, MFA, Choose workspace)
  * Tenant (Show, Edit, Onboard)
  * User profile (Show, Edit, Onboard)
  * User management (List, Edit, Add)
  * Brand expo (Showcase of Nblocks component default styling)
* Basic navigation support for above components which can be extendable by app developers
* Nblocks default style which can be extendable by app developers
* I18n support which can be extendable by app developers
* Support for both HTTP and GraphQL clients & Auth context aware intercepting these API calls.
* Exposed state management and Helper services useful for app developers (currentUser, authenticated events, logout functionality)
* Deep linking to consume links outside app

# Getting started
## Installing
### React native
```
npm install @nebulr-group/react-native-nblocks
```

### Expo
````
expo install @nebulr-group/react-native-nblocks
````


Wrap your app with the `NblocksProvider` in your top most App component.
```jsx
<NblocksProvider>
      <MyApp />
</NblocksProvider>
```
That's all. See Configuration section how to change default configuration.   
**By default the plugin requires a Nblocks enabled API to be present at `localhost:3000`**

# Usage
## Get current user
```typescript
const MyComponent:FunctionComponent<{}> = ({children}) => {
      
    const {currentUser} = useAuth();

    if (currentUser.authenticated)
        return (<View>Secret data</View>);
    else
        return (<View>Forbidden</View>);
}
```
## Making calls to your backend
```typescript

```
# Configuration
The plugin comes with a default style and config for its views and functionality. These defaults can easily be overriden by you by providing other config properties for the `NblocksProvider`. E.g.

```jsx
<NblocksProvider 
      config={{}} 
      i18nOverrides={[{lang: 'en', resources: {"FORGOT_PASSWORD": "iForgot?"}}]} 
      colorOverrides={{primaryColor: 'red'}} 
      styleOverrides={{buttonText: {color: 'black', padding: 10, fontWeight: "700"}}}
>
      <MyApp />
</NblocksProvider>
```
## General config
The plugin accepts a config object to be provided. This object must implement `LibConfig` as shown below.
```typescript
export interface LibConfig {

  // Output debug messages from plugin
  debug: boolean

  /** Base Url to a backend API running a NBlocks compatable feature set. E.g. `https://api.myapp.com` */
  apiHost: string;

  /** The path which host the graphql endpoint, will be concatenated with apiHost. E.g. `/graphql` */
  graphqlPath: string;

  /** View routes that are considered public accessable and interceptors should not require authentication context. E.g. `['/about', '/home']` */
  openRoutes: string[];

  /** Available languages that the user can set for the workspace. Can just be 'en' or 'sv' at the moment */
  languages: string[];

  /** Enable password complexity according to ISO27001 */
  passwordComplexity: boolean;

  /** Ask for personal information after first time user logs in. Can be setup to require specific fields */
  onboarding: {
    enabled: boolean,
    requiredFields: {
      firstName: boolean;
      lastName: boolean;
      phoneNumber: boolean;
    }
  }

  /** Available social login providers and account api data that the user can use for authorization. */
  socialLogins: {
    accountApiHost: string;
    appId: string;
    providers: {
      google: boolean;
      github: boolean;
      facebook: boolean;
    }
  },
}
```
## Styling and Brand
All Nblocks components inherit the default style which is composed by both a style object and color object.
### Changing default style
The plugin accepts a style override object to be provided using the property `styleOverrides`. This object must implement `BrandingConfig` as shown below.
```typescript
type BrandingConfig = {
    body: ViewStyle;
    textGlobal: TextStyle;
    defaultPadding: ViewStyle;
    title: TextStyle;
    subTitle: TextStyle;
    textIngress: TextStyle;
    inputGroup: ViewStyle;
    textInput: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    divider: ViewStyle;
    chip: TextStyle
};
```
### Changing default colors
The plugin accepts a color override object to be provided using the property `colorOverrides`. This object must implement `ColorConfig` as shown below. These strings must be either hex code or strings conforming to color/backgroundColor of react stylesheet TextStyle/ViewStyle.
```typescript
type ColorConfig = {
    primaryColor: string;
    secondaryColor: string;
    dangerColor: string;
    cancelColor: string;
    backgroundColor: string;
    textColor: string;
}
```
## I18n & Translations
You can add your own custom language overrides using the `i18nOverrides` property.
The data must be in `LangOverrideParam[]` format where:
```typescript
export type LangOverrideParam = {lang: string, resources: any};
```
# Conceps and tools used
## Global state management and Event handling
- Built in React `Context API` exposed via different `hooks`.
- @react-native-async-storage/async-storage for persistent data between sessions
## Networking and HTTP
- `axios` - Wrapped into and exposed as `AuthHttpClient`.
- `@apollo/client` - Wrapped into and exposed as `AuthApolloClient`.
- `@graphql-codegen` to generate graphql types from API
## I18n
- `i18next` via `react-i18next`.
## Branding
- Custom components pulling the overridable style state via `useTheme` hook.
---
# Development environment
Following the recommended way to get started with react-native nowadays this project is built with `expo`. Expo is a set of tools built around React Native to easily build, run and deploy your app. It also simplifies working with native OS APIs. Since this project aim to be an installable plugin, not deployable itself and available to as many react-native devs as possible, expo will probably be removed later on.

Initial commands used:
1. `expo init nblocks-react-native --npm`
1. Picking blank typescript project

## Setup
Project comes within a docker container. Just open the project in VSCode and let it build the container automatically.
## Running it
When starting the development server web browsers and mobiles (using the app Expo Go) can access the app using QR code. Due to the project beeing inside a docker container external access outside the host machine requires the local IP to be set.

`REACT_NATIVE_PACKAGER_HOSTNAME=[YOUR_LOCAL_IP] npm run start`

![QR code](readme_assets/qr.png)

# Developer notes
We should try avoid external dependencies as much as possible. Those we add must work both for expo but also natively since we're going to ditch Expo at some point.

## Simple dependencies
### date-fns
Lodash for dates. Greate modularized date tool, better than momentjs
`npm i date-fns`

### lodash + @types/lodash probably not?

### react-i18next i18next

## Native dependencies
*Installing* `expo install [package name]`
https://stackoverflow.com/questions/63784493/is-it-safe-to-use-expo-install-for-everything-that-i-need-to-install

*Uninstalling* `npm uninstall [package name]`

### select/picker
react-native-picker-select
There exists no built in picker in react-native. Expo docs refers to this community project https://docs.expo.dev/versions/v45.0.0/sdk/picker.

`expo install @react-native-picker/picker`

It seems this breaks when opening a web run on expo mobile (`npm run web`). Will download xcode to see if stuff is working on mobile (`npm run ios`).
That did not work either. Seems a lot of packages are not built for Expo web and webpack must fix them, unsure how to configure webpack for this....

### react-native-webview
Requires linking?

# Keeping dependencies up-to-date
* `expo upgrade` will upgrade expo sdk and also npm packages to compatable semver.
* `npm install -g expo-cli` to keep global expo cli up-to-date

(`npx react-native upgrade` when we've diched expo)

# FAQ & Loopholes
## Why style flex:1 on root view?
When using a root view it must be stretched to fill the container.
See https://reactnavigation.org/docs/troubleshooting/#nothing-is-visible-on-the-screen-after-adding-a-view

## Helpers
* AccessControllComponent


## Overriding default configurations
The plugin supports overriding different default configurations like styling and translations (i18n).

 
This is done by providing props to the root `NblocksProvider` component.

Supported props:
- i18nOverrides
- colorOverrides
- styleOverrides

E.g.

```tsx
<NblocksProvider 
    i18nOverrides={[{lang: 'en', resources: {"FORGOT_PASSWORD": "iForgot?"}}]} 
    colorOverrides={{primaryColor: 'red'}} 
    styleOverrides={{buttonText: {color: 'black', padding: 10,
      fontWeight: "700"}}}
>
      <......>
</NblocksProvider>
```
