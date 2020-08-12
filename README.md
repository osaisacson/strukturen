# strukturen

iOS/Android app for structuring life

## get started

Make sure you first have installed:

- XCode
- Android Studio
- NPM
- Expo CLI

Then...
`git clone https://github.com/osaisacson/strukturen.git`
`git init`
`npm install`
`npm start`
...and start apple and android simulators

## when using as a template

- clone the project
- create a new firebase db: https://console.firebase.google.com/
- change the name of example-env in the root of your project to env.js and (IMPORTANT) include it in your gitignore file.
- in firebase, go to project settings and find your project details. Update the account details in env.js
- delete all specific firebase files in root, these will be generated in the next step
- `firebase init` - select installing all options. Follow all defaults apart for functions, do not overwrite these.
- In firebase project settings download the google-services.json file from your apps/android and the GoogleService-Info.plist from your apps/iOS, add these to the root of your project
- In firebase/auth set up your authentication
