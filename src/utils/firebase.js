import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: "AIzaSyBeruGTC4td3r-NjQmNcz3laRTkBaxwZzw",
	authDomain: "todoapp-c17d7.firebaseapp.com",
	databaseURL: "https://todoapp-c17d7-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "todoapp-c17d7",
	storageBucket: "todoapp-c17d7.appspot.com",
	messagingSenderId: "707390838647",
	appId: "1:707390838647:web:261567db4cbc4679c2f372",
	measurementId: "G-Q73KVYWW94"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getDatabase(app)
export default app