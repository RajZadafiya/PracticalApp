# PracticalApp

A React Native application featuring:
- **Login screen** with form validation (Formik + Yup)
- **Home screen** with Text-to-Speech (TTS) player functionality
- Persistent login using AsyncStorage
- Navigation using React Navigation

## Features

### Login Screen
- Email and password fields with validation
- Uses Formik for form state and Yup for validation
- Stores login state in AsyncStorage
- Navigates to Home screen on successful login

### Home Screen
- Enter text and play it aloud using device TTS
- Uses `react-native-tts` for text-to-speech
- Logout button clears login state and returns to Login screen

## Main Libraries Used
- [react-native](https://reactnative.dev/)
- [formik](https://formik.org/)
- [yup](https://github.com/jquense/yup)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- [@react-navigation/native](https://reactnavigation.org/)
- [@react-navigation/native-stack](https://reactnavigation.org/docs/stack-navigator/)
- [react-native-tts](https://github.com/ak1394/react-native-tts)
- [native-base](https://nativebase.io/) (UI components)

## Getting Started

1. **Install dependencies:**
   ```zsh
   npm install
   # or
   yarn install
   ```
2. **Run Metro bundler:**
   ```zsh
   npm start
   # or
   yarn start
   ```
3. **Run on Android:**
   ```zsh
   npm run android
   # or
   yarn android
   ```
   **Run on iOS:**
   ```zsh
   npm run ios
   # or
   yarn ios
   ```

## Notes
- Make sure to follow the [React Native environment setup](https://reactnative.dev/docs/environment-setup) for your OS.
- For TTS to work, device audio permissions may be required.

---

This project was bootstrapped with `@react-native-community/cli`.
