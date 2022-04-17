
import firebase from 'firebase/app' //node_modulesからコアとなるfirebaseのパッケージをimportする、firebaseを使うなら必ずimportする必要がある
import 'firebase/firestore' // firestoreを使いたいのでimportする
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "APIキー",
  authDomain: "ドメインアドレス",
  projectId: "プロジェクトID",
  storageBucket: "ストレージバケット",
  messagingSenderId: "メッセージの送信者ID",
  appId: "appID"
};

// init firebase
firebase.initializeApp(firebaseConfig) // バックエンドのfirebaseを初期化する

// init firestore service
const projectFirestore = firebase.firestore() // firebaseのサービスも初期化する
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp //firebaseのtimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
