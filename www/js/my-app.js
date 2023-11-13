// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Wanderlust360',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
        { path: '/login/',            url: 'login.html',    },
        { path: '/ciudades/',         url: 'ciudades.html',    },
        { path: '/confirmacion/',     url: 'confirmacion.html',    },
        { path: '/index/',            url: 'index.html',    },
        { path: '/info/',             url: 'info.html',    },
        { path: '/registro/',         url: 'registro.html',    },
        { path: '/ciudades/:nombreCiudad/',          url: 'rosario.html',    },
        { path: '/ciudades/:nombreCiudad/',          url: 'buenosAires.html',    },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var db = firebase.firestore();
var colRoles = db.collection("ROLES");
var colPersonas = db.collection("PERSONAS");
var colMensajes = db.collection("MENSAJES");
/* var colCiudades = db.collection("CIUDADES"); */
/* var colGuias = db.collection("GUIAS"); */


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
$$(document).on('page:init', '.page[data-name="ciudades"]', function (e) {
 /* document.addEventListener('deviceready', function () {
    // Obtén una referencia a la colección 'Ciudades'
    const colCiudades = firebase.firestore().collection('Ciudades');
  
    // Obtén los documentos de la colección 'Ciudades' y despliega su información en la página 'ciudades'
    colCiudades.get().then((querySnapshot) => {
      const listaCiudades = document.getElementById('listaCiudades');
      querySnapshot.forEach((doc) => {
        const ciudad = doc.data();
        const li = document.createElement('li');
        li.textContent = `${ciudad.nombre} - ${ciudad.país}`;
        listaCiudades.appendChild(li);
      });
    }); 
  });
  */
})

$$(document).on('page:init', '.page[data-name="info"]', function (e) {
  const colCiudades = firebase.firestore().collection('Ciudades');

  colCiudades.get().then((querySnapshot) => {
    const listaCiudades = document.getElementById('listaCiudades');
    querySnapshot.forEach((doc) => {
      const ciudad = doc.data();
      const nombreCiudad = doc.id; // El ID es el nombre de la ciudad

      if (ciudad) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = nombreCiudad; // Mostrar el nombre de la ciudad como texto del enlace
        link.href = `/ciudades/${nombreCiudad}/`; // Define el enlace para la página de detalles de la ciudad
        li.appendChild(link);
        listaCiudades.appendChild(li);

        // Manejar evento clic para navegar a la página de detalles de la ciudad
        link.addEventListener('click', (event) => {
          event.preventDefault();
          app.views.main.router.navigate(link.href); // Navegar a la página de detalles de la ciudad
          console.log('Navegando a:', link.href); // Agregar para verificar la URL antes de la navegación
app.views.main.router.navigate(link.href);

        });
      } else {
        console.error("Datos incompletos en un documento:", doc.id);
      }
    });
  }).catch((error) => {
    console.error("Error al obtener documentos:", error);
  });
});
  


$$(document).on('page:init', '.page[data-name="index"]', function (e) {
$$("#btnRegistro").on("click", fnRegistro);
platform = new H.service.Platform({
  'apikey': '8TJchdgOJVZVjFoOSSip2C03gDYQNTZTUFi8ocD6-L0'
 });


/*
sembrarDatos();

sembrarDatos2();
*/

/* sembrado de datos */
/*
function sembrarDatos() {

  var dato = { rol: "Desarrollador/a", color: "Verde" }
  var miId = "DEV";
  colRoles.doc(miId).set(dato)
  .then( function(docRef) {
      console.log("Doc creado con el id: " + docRef.id);
  })
  .catch(function(error) {
      console.log("Error: " + error);
  })
}


function sembrarDatos2() {

  var ciudad = { nombre: "Buenos Aires", categoria: "Ciudades increibles" }
  var miId2 = "Argentina";
  colCiudades.doc(miId2).set(ciudad)
  .then( function(docRef) {
      console.log("Doc creado con el id: " + docRef.id);
  })
  .catch(function(error) {
      console.log("Error: " + error);
  })
}
*/
const colCiudades = firebase.firestore().collection('Ciudades');
const batch = firebase.firestore().batch();

const ciudadesAAgregar = [
  {
    id: "Buenos Aires", 
    categoria: "Ciudades increibles"
  },
  {
    id: "Rosario", 
    categoria: "Ciudades historicas"
  },
  {
    id: "Paris", 
    categoria: "Arquitectura increible"
  },
  {
    id: "Milan", 
    categoria: "Capitales de la moda"
  },
];

ciudadesAAgregar.forEach(ciudad => {
  const ciudadRef = colCiudades.doc(ciudad.id); // Establece el ID específico
  batch.set(ciudadRef, ciudad);
});

batch.commit()
  .then(() => {
    console.log("Todas las ciudades han sido agregadas con éxito");
  })
  .catch((error) => {
    console.error("Error al agregar las ciudades: ", error);
  });



$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$("#btnFinReg").on("click", fnFinRegistro);
})

$$(document).on('page:init', '.page[data-name="login"]', function (e) {
  $$("#btnInicioSesion").on("click", fnIniciarSesion);
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

$$(document).on('page:init', '.page[data-name="rosario"]', function (e) {
  var defaultLayers = platform.createDefaultLayers();
  // Create the default UI:

 
 	// Instantiate (and display) a map object:
	map = new H.Map(
        document.getElementById('mapContainer'),
    	defaultLayers.vector.normal.map,
    	{
      	zoom: 10,
      	center: { lat: -32.9477131, lng: -60.6353367 }
        });
 
    	coords = {lat: -32.9477131, lng: -60.6353367};
    	marker = new H.map.Marker(coords);
 
    	// Add the marker to the map and center the map at the location of the marker:
    	map.addObject(marker);
    	map.setCenter(coords);
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers, `es-ES`);
  
})

$$(document).on('page:init', '.page[data-name="buenosAires"]', function (e) {
  var defaultLayers = platform.createDefaultLayers();
 
 	// Instantiate (and display) a map object:
	mapBa = new H.Map(
        document.getElementById('mapContainer'),
    	defaultLayers.vector.normal.map,
    	{
      	zoom: 10,
      	center: { lat: -34.6098208, lng: -58.395181 }
        });
 
    	coords = {lat: -34.6098208, lng: -58.395181};
    	marker = new H.map.Marker(coords);
 
    	// Add the marker to the map and center the map at the location of the marker:
    	mapBa.addObject(marker);
    	mapBa.setCenter(coords);
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapBa));
      const ui = H.ui.UI.createDefault(map, defaultLayers);
  
})
/* UI */
// 
// const ui = H.ui.UI.createDefault(map, defaultLayers);


/* mis funciones */
var email, clave, nombre, apellido, latitud, longitud, map, platform, pos;

function fnIniciarSesion() {
email = $$("#loginEmail").val();
clave = $$("#loginClave").val();

if (email!="" && clave!="") {
  
 
  firebase.auth().signInWithEmailAndPassword(email, clave)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

    // console.log("Bienvenid@!!! " + email);
    mainView.router.navigate('/info/');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.error(errorCode);
        console.error(errorMessage);
  });


}
}

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
}
}

function fnFinRegistro() {
  nombre = $$("#regNombre").val();
  apellido = $$("#regApellido").val();
  
  if (nombre!="" && apellido!="") {
    datos = { nombre: nombre, apellido: apellido, rol: "Dev" }
    elID = email;
    
    colPersonas.doc(elID).set(datos)
    .then( function(docRef) {
      mainView.router.navigate("/confirmacion/")
  })
  .catch(function(error) {
      console.log("Error: " + error);
  })
  
    
  }
}




