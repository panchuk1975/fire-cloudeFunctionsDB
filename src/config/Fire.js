import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC7upDKFTdml2k5hmyCztxlNQHOPIZwOr4",
    authDomain: "tehsupport-react-firebase.firebaseapp.com",
    databaseURL: "https://tehsupport-react-firebase.firebaseio.com",
    projectId: "tehsupport-react-firebase",
    storageBucket: "tehsupport-react-firebase.appspot.com",
    messagingSenderId: "239751210523",
    appId: "1:239751210523:web:0142dfefd377246be9fabe"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(config);
  export default fire;