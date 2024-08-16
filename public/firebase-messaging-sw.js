importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7Sz1nCmrm4qvwEU1_XAkPrSQ31zqnCFc",
  authDomain: "intra-backend.firebaseapp.com",
  projectId: "intra-backend",
  storageBucket: "intra-backend.appspot.com",
  messagingSenderId: "415655221909",
  appId: "1:415655221909:web:c29b1bda3c1fab1249199c",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 응답", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.click_action,
    icon: payload.data.icon || "./favicon.ico",
    data: { click_action: payload.data.click_action },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("push", function (event) {
  console.log(event);

  if (event.data) {
    const data = event.data.json().data;
    const options = {
      body: data.body,
      icon: data.icon,
      data: {
        click_action: data.click_action,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log("This push event has no data.");
  }
});

// Notification Click Event Handler
self.addEventListener("notificationclick", function (event) {
  event.preventDefault();
  event.notification.close();

  const urlToOpen = event.notification.data.click_action;

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
