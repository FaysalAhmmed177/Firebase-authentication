import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log(user);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        console.log(errorCode, errorMessage, email);

      });
  }

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        setUser(user);
        console.log('fb user', user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log('Github user: ', user);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorCode, errorMessage, email, credential);
      });
  }

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In with Google</button><br />
      <button onClick={handleFacebookSignIn}>Sign In with Facebook</button><br />
      <button onClick={handleGithubSignIn}>Sign In with Github</button><br />
      
      <h3>User name: {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
