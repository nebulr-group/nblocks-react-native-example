# nblocks-react-native
This is currently a hello world react native app that gradually includes more and more functionality from nblocks. The idea is to turn this project into a ui plugin published and installable with `npm`,  just like `nblocks-ionic`. 

## Built with Expo
Following the recommended way to get started with react-native nowadays this project is built with `expo`. Expo is a set of tools built around React Native to easily build, run and deploy your app. It also simplifies working with native OS APIs. Since this project aim to be an installable plugin, not deployable itself and available to as many react-native devs as possible, expo will probably be removed later on.

Initial commands used:
1. `expo init nblocks-react-native --npm`
1. Picking blank typescript project

### Documentation
* [Expo](https://docs.expo.dev)
* [React Native](https://reactnative.dev/)
* [React Native Express](https://www.reactnative.express)

## Run it
When starting the development server web browsers and mobiles (Expo Go) can access the app using QR code. Due to the project beeing inside a docker container external access outside the host machine requires the local IP to be set.

`REACT_NATIVE_PACKAGER_HOSTNAME=[YOUR_LOCAL_IP] npm run start`

![QR code](readme_assets/qr.png)

## Dependencies
We should try avoid external dependencies as much as possible. Those we add must work both for expo but also natively since we're going to ditch Expo at some point.

### Simple dependencies
#### date-fns
Lodash for dates. Greate modularized date tool, better than momentjs
`npm i date-fns`

### Native dependencies
*Installing* `expo install [package name]`
https://stackoverflow.com/questions/63784493/is-it-safe-to-use-expo-install-for-everything-that-i-need-to-install

*Uninstalling* `npm uninstall [package name]`

#### select/picker
react-native-picker-select
There exists no built in picker in react-native. Expo docs refers to this community project https://docs.expo.dev/versions/v45.0.0/sdk/picker.

`expo install @react-native-picker/picker`

It seems this breaks when opening a web run on expo mobile (`npm run web`). Will download xcode to see if stuff is working on mobile (`npm run ios`).
That did not work either. Seems a lot of packages are not built for Expo web and webpack must fix them, unsure how to configure webpack for this....

## Keeping dependencies up-to-date
* `expo upgrade` will upgrade expo sdk and also npm packages to compatable semver.
* `npm install -g expo-cli` to keep global expo cli up-to-date

(`npx react-native upgrade` when we've diched expo)

## FAQ & Loopholes
### Why style flex:1 on root view?
When using a root view it must be stretched to fill the container.
See https://reactnavigation.org/docs/troubleshooting/#nothing-is-visible-on-the-screen-after-adding-a-view
