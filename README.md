# react-typescript-base
Basic Typescript React base project (I18N, Helmet, HashRouter, redux, persist, loadable)

## Enable notifications
REACT_APP_PUBLIC_VAPID_KEY = push notification public VAPID key 
add FCM Client ID as "gcm_sender_id" to manifest.json
use doNotificationSubscribe action to register current client
edit public/custom-sw.js to handle different push data