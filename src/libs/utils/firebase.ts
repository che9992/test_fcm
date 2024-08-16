import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// Firebase 설정: 애플리케이션을 Firebase와 연동하기 위한 구성 정보입니다.
// 아래 정보는 변경 금지
const firebaseConfig = {
  apiKey: "AIzaSyB7Sz1nCmrm4qvwEU1_XAkPrSQ31zqnCFc",
  authDomain: "intra-backend.firebaseapp.com",
  projectId: "intra-backend",
  storageBucket: "intra-backend.appspot.com",
  messagingSenderId: "415655221909",
  appId: "1:415655221909:web:c29b1bda3c1fab1249199c",
};

const firebaseApp = initializeApp(firebaseConfig);

const messaging =
  typeof window !== "undefined" ? getMessaging(firebaseApp) : null;

export { firebaseApp, messaging };
