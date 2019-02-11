var express = require('express');
var router = express.Router();
const request = require('request');

const URL = "https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true";


/* Solución para CORS - Realiza la llamada GET para rescate de bookings */
router.get('/', function(req, res, next) {
  /*
  var usuario = req.query.usuario;
  var aplicacion = req.query.aplicacion;
  var token = req.query.token;
  */
  var usuario = "testapis@tuten.cl";
  var aplicacion = "APP_BCK";
  var token = "testapis@tuten.clmnre472pvb69h23psobvmhfef8";
  
  request( URL ,{
    method : "GET",
    headers: {
      'Content-Type' : "application/json",
      'adminemail' : usuario,
      'app': aplicacion,
      'token' : token,
      'Accept': "application/json"
    }
  },(rq_err, rq_res, rq_body) => {
    
    //fija el header de la respuesta
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    });
    
    if (rq_res) {
      //imprime directamente el status code resultante
      var cuerpo = [];
      if (rq_res.statusCode == 200){
        //parse de JSON y almacenamiento de token
        var cuerpo = JSON.parse(rq_body);
      }
      var data = JSON.stringify({
        "status" : rq_res.statusCode,
        "listado" : cuerpo
      });
      res.send(data);
    }
  });
});

module.exports = router;