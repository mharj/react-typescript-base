# react-typescript-base

 - Basic Typescript React base project (I18N, Helmet, HashRouter, redux, persist)
 - Have request cache support for API offline usage for data fetching
 - Redux thunk hook support
   - NOTE!: Generally don't use hooks on medium or large projects, class is always much more render stable option even with bit more boilerplate code

## Enable notifications

- REACT_APP_PUBLIC_VAPID_KEY = push notification public VAPID key
- add FCM Client ID as "gcm_sender_id" to manifest.json
- use doNotificationSubscribe action to register current client
- edit public/custom-sw.js to handle different push data

## finetune package.json browserslist depending on need to support

https://github.com/browserslist/browserslist-example

## includes IE9 support and common browser polyfills

[check index.tsx file](./src/index.tsx#1)

## includes standard browser fetch API and polyfill for non-supported platforms.

## basic cache examples for offline API requests