var express = require('express');
var router = express.Router();
const request = require('request');
const URL = "https://dev.tuten.cl:443/TutenREST/rest/user/";


/* Solución para CORS - Realiza la llamada PUT para el login */
router.get('/', function(req, res, next) {
  var usuario = req.query.usuario;
  var password = req.query.password;
  var aplicacion = req.query.aplicacion;
  
  request( URL + usuario,{
    method : "PUT",
    headers: {
      'Content-Type' : "application/json",
      'app': aplicacion,
      'password': password,
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
      var token = "";
      if (rq_res.statusCode == 200){
        //parse de JSON y almacenamiento de token
        var cuerpo = JSON.parse(rq_body);
        token = cuerpo["sessionTokenBck"];
      }
      var data = JSON.stringify({
        "status" : rq_res.statusCode,
        "token" : token
      });
      res.send(data);
    }
  });
});

module.exports = router;