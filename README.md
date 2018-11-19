# PRJ666 - Ezmeetup React Native Application(Front-end)

This is Ezmeetup project React Native repository for PRJ666 course at Seneca college.

# Debug APK Link - [Here](https://github.com/sina-kamali/EZMeetUp/tree/master/android/app/build/outputs/apk/debug)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Also, all instructions are for Linux and MacOS. There is not much difference for Windows.

### Prerequisites

Latest nodejs and git should be installed on your local machine(v8.12.0 LTS or higher). To check if you have installed nodejs, run the following commands :


```bash
node -v
npm -v
```

Also, you need to install React Native CLI.

```bash
npm install -g react-native-cli
```

Depending on mobile platforms, JDK and Android Studio(for Android), and XCode(for iOS) are needed to develop React Native Mobile app.

See [the details](https://facebook.github.io/react-native/docs/getting-started)


### Installing

Create an empty directory, change the directory to new directory, and clone the repo to local machine. For example,

```
mkdir ezmeetup-react-native-repo
cd ezmeetup-react-native-repo
git clone https://github.com/sina-kamali/EZMeetUp.git
```

And run the following codes :

```
npm install
```

If you see the directory called **node_modules** under the root directory of this repo(i.e. ezmeetup-react-native-repo), you installed it correctly.


### Run the application

To run the application, enter following commands on the root of react-native repo:

```bash
react-native run-android

or

react-native run-ios
```
### Make Debug APK

```
cd android
./gradlew assembleDebug

```

### Dependencies

```
npm install --save react-navigation

npm install --save react-native-material-dropdown
npm install react-native-checkbox-form --save

react-native link react-native-vector-icons


npm i -S react-native-animated-hide-view

npm install --save react-native-event-listeners

npm install --save react-native-card-stack-swiper

npm install react-native-slideshow --save


npm i -S react-native-swipe-gestures

```

## Running the tests

 We will add the test functionality later.


## Deployment

Change the DB settings under config directory.

## Built With

* [NodeJS](https://nodejs.org/en/) - for running npm
* [ReactNative](https://facebook.github.io/react-native/) - Native Mobile Apps
 
## Authors

* Alexei Bonilla
* Derrick Leung (Group Leader)
* Sina Kamali
* Yeonwoo Park

