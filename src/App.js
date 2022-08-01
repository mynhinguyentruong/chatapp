
import './App.css';
import React from 'react'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyAKsvCMyRoCeEUVOHJFzWTrOikmL4eU-ig",
  authDomain: "superchat-3e163.firebaseapp.com",
  projectId: "superchat-3e163",
  storageBucket: "superchat-3e163.appspot.com",
  messagingSenderId: "330282569535",
  appId: "1:330282569535:web:6451cdc77752774e5b0d8a",
  measurementId: "G-Q077ZDZEK4"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  )
}

export default App;
