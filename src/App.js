
import './App.css';
import React from 'react'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
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
console.log(auth)
const firestore = firebase.firestore()


function App() {

  const [user] = useAuthState(auth)
  // console.log(user)

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
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
    // console.log(provider)
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>SignOut</button>
  )
}

function ChatRoom() {

  const dummy = React.useRef()

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})
  // console.log(messagesRef)
  // console.log(query)
  // console.log(messages)

  const [formValue, setFormValue] = React.useState('')

  const sendMessage = async(e) => {
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue("")

    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button>Send Message 📤</button>
      </form>
    </>
  )
}

function ChatMessage(props) {

  const { text, uid, photoURL } = props.message
  console.log(props.message)

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  console.log(text)
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
    
  )
}

export default App;
