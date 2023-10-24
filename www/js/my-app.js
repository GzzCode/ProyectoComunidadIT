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
        { path: '/about/',            url: 'about.html',    },
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
  
})

$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
  $$("#btnFinReg").on("click", fnFinRegistro);
  
})

$$(document).on('page:init', '.page[data-name="confirmacion"]', function (e) {
$$("#confNombre").text(nombre)
$$("#confEmail").text(email)
  
})

$$(document).on('page:init', '.page[data-name="info"]', function (e) {

  
})


/* mis funciones */
var email, clave, nombre, apellido;

function fnRegistro() {
email = $$("#indexEmail").val();
clave = $$("#indexClave").val();

if (email!="" && clave!="") {
  mainView.router.navigate("/registro/")
}
}

function fnFinRegistro() {
  nombre = $$("#regNombre").val();
  apellido = $$("#regApellido").val();
  
  if (nombre!="" && apellido!="") {
    mainView.router.navigate("/confirmacion/")
  }
}