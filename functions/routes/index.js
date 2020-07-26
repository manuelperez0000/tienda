const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://usuarios-b6168.firebaseio.com"
});
var firebase = require("firebase/app");
require("firebase/firestore")
require("firebase/auth")
require("firebase/storage")
/**/
var firebaseConfig = {
    apiKey: "AIzaSyDRSDPUDAaQZqLAtsJtRnex5uhKBqWb5vw",
    authDomain: "usuarios-b6168.firebaseapp.com",
    databaseURL: "https://usuarios-b6168.firebaseio.com",
    projectId: "usuarios-b6168",
    storageBucket: "usuarios-b6168.appspot.com",
    messagingSenderId: "1077345151387",
    appId: "1:1077345151387:web:5c9c23d441d8924ba8993e"
  };
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var db = firebase.firestore();
  var stor = firebase.storage(); 

/*var serviceAccount = require('./mrdeliveryvnz-firebase-adminsdk-qy0up-4688b812d7.json');
 //cert(serviceAccount)
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://usuarios-b6168.firebaseio.com/'
})
const db = admin.database(); */

//------todas las paginas --------//
router.get('/',(req, res)=>{ 
    auth.onAuthStateChanged((user)=> {
        if (user) {
        var data = "user: "+user.email;
        } else {
        var data = "No";
        }
        res.render('index',{ usuario: data })   
    });  
});
router.get('/login',      (req, res)=>{res.render('login'      )});
router.get('/register',   (req, res)=>{res.render('register'   )});
router.get('/forgot', (req, res)=>{res.render('forgot' )});
router.get('/perfil',     (req, res)=>{res.render('perfil'     )});
router.get('/carrito',    (req, res)=>{res.render('carrito'    )});
router.get('/menu',       (req, res)=>{res.render('menu'       )});
router.get('/pagos',      (req, res)=>{res.render('pagos'      )});
router.get('/categorias', (req, res)=>{res.render('categorias' )});
router.get('/negocio',    (req, res)=>{res.render('negocio'    )});
router.get('/editar-menu',(req, res)=>{res.render('editar-menu')});

router.post('/forgot', (req, res)=>{
 
  var emailAddress = req.body.email;

  auth.sendPasswordResetEmail(emailAddress).then(function() {
    res.send("Correo enviado");
  }).catch(function(error) {
    res.send("Ocurrio un error al enviar el correo"+error)
  });
});

router.post('/register', (req, res)=>{
    /*//resibir un json y luego registrar devolder algo
    const user = {
        nombre: req.body.name,
        telefono: req.body.telefono,
        email: req.body.email,
        clave: req.body.pass
    }
    db.ref('users').push(user);
    console.log(req.body);
   
    var email = req.body.email;
    var password = req.body.pass;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    alert("Registrado con exito");
    var errorCode = error.code;
    var errorMessage = error.message;
    res.redirect('/');
    admin.auth().createUser({
        email: 'user@example.com',
        emailVerified: false,
        phoneNumber: '+11234567890',
        password: 'secretPassword',
        displayName: 'John Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false
      })
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
        })
        .catch(function(error) {
          console.log('Error creating new user:', error);
        }); */
  });

router.post('/login', (req, res)=>{
    var e = req.body.email;
    var p = req.body.password;
    auth.signInWithEmailAndPassword(e, p).then(()=>{
        console.log("Autenticado con exito");
        res.redirect('/');
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    }); 
    /*console.log(req.body)
    res.redirect('/');*/
  });

//comentario
module.exports = router;