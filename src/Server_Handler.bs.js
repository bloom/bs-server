// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Express = require("bs-express/src/Express.js");
var Server_Middleware = require("./Server_Middleware.bs.js");

function Make(Cfg) {
  var use = function (router) {
    var match = Cfg[/* verb */1];
    var fn;
    switch (match) {
      case 0 : 
          fn = Express.Router[/* get */4];
          break;
      case 1 : 
          fn = Express.Router[/* post */9];
          break;
      case 2 : 
          fn = Express.Router[/* put */11];
          break;
      case 3 : 
          fn = Express.Router[/* delete */15];
          break;
      
    }
    return Curry._3(fn, router, Cfg[/* path */0], Server_Middleware.andThenHandle(Cfg[/* middleware */2], Cfg[/* handler */3]));
  };
  return /* module */[/* use */use];
}

exports.Make = Make;
/* Express Not a pure module */