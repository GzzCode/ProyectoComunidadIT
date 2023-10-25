// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
        { path: '/login/',            url: 'login.html',    },
        { path: '/confirmacion/',     url: 'confirmacion.html',    },
        { path: '/index/',            url: 'index.html',    },
        { path: '/info/',             url: 'info.html',    },
        { path: '/registro/',         url: 'registro.html',    },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {

  
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
$$("#btnRegistro").on("click", fnRegistro);


$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$("#btnFinReg").on("click", fnFinRegistro);
})

$$(document).on('page:init', '.page[data-name="confirmacion"]', function (e) {
$$("#confNombre").text(nombre)
$$("#confEmail").text(email)
  
   // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    var fnLeeOkelGPS = function(position) {
      latitud = + position.coords.latitude
      longitud = + position.coords.longitude

      $$("#confLatitud").text(latitud)
      $$("#confLongitud").text(longitud)
      
      /* alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n'); */
  };

  // onError Callback receives a PositionError object
  //
  function onErrorGPS(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(fnLeeOkelGPS, onErrorGPS);
  
})
})

$$(document).on('page:init', '.page[data-name="info"]', function (e) {

  
})


/* mis funciones */
var email, clave, nombre, apellido, latitud, longitud;

function fnRegistro() {
email = $$("#indexEmail").val();
clave = $$("#indexClave").val();

if (email!="" && clave!="") {
    // cada un@ pone su magia para recuperar el mail y la clave de un form...
  
    firebase.auth().createUserWithEmailAndPassword(email, clave)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + email);
        // ...
        mainView.router.navigate('/registro/');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode);
        console.error(errorMessage);

        if (errorCode == "auth/email-already-in-use") {
            console.error("el mail ya esta usado");
        }

        // ..
      });

  
  // mainView.router.navigate("/registro/")
}
}

function fnFinRegistro() {
  nombre = $$("#regNombre").val();
  apellido = $$("#regApellido").val();
  
  if (nombre!="" && apellido!="") {
    mainView.router.navigate("/confirmacion/")
  }
}