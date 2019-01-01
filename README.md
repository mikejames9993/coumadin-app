# Coumadin Hero

This is a desktop and mobile game to help Coumadin users learn about the risks of using the drug.

## Installation

First, you will need to install [node.js](https://nodejs.org/en/download/)

Next, install the app build dependencies:

```
npm install -g bower
```

```
npm install -g firebase-tools
```

Install the app software dependencies - from project root directory, run:

```
npm install
```
```
bower install
```

## Running Locally

From the project root directory, run:

```
npm run start
```

You should now be able to access the app in your browser at [http://localhost:3000](http://localhost:3000)

## Deploying to Firebase

From the project root directory, run:

```
firebase login
```
```
firebase deploy
```

The app will now be accessible in a browser at https://coumadin-hero.firebaseapp.com
