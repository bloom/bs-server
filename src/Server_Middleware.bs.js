// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE
'use strict';

var Prom = require("bs-prom/src/Prom.bs.js");
var Util = require("util");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Express = require("bs-express/src/Express.js");
var Express$1 = require("express");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Server_ExpressExt = require("./Server_ExpressExt.bs.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

var Types = /* module */[];

function toString(whatever) {
  return Util.inspect(whatever, {
              depth: 100
            });
}

function _middlewareToExpressMiddleware(handler) {
  return Express.PromiseMiddleware[/* from */0]((function (param, req, res) {
                return Prom.$$catch(Prom.map(Curry._3(handler, req, res, /* () */0), (function (param) {
                                  return param[0];
                                })), (function (err) {
                              console.log("An unexpected error was thrown inside of the handler", err);
                              return Prom.wrap(Express.$$Response[/* sendStatus */7](/* InternalServerError */47)(res));
                            }));
              }));
}

function _handlerToMiddleware(handler, req, res, ctx) {
  return Prom.map(Curry._3(handler, req, res, ctx), (function (a) {
                return /* Ok */Block.__(0, [a]);
              }));
}

var Private = /* module */[
  /* toString */toString,
  /* _middlewareToExpressMiddleware */_middlewareToExpressMiddleware,
  /* _handlerToMiddleware */_handlerToMiddleware
];

function middlewareFromExpress(em, req, res, a) {
  var match = Prom.make(/* () */0);
  var resolve = match[1];
  var next = function (param) {
    if (param !== undefined) {
      console.log("Failure from wrapped express middleware", Caml_option.valFromOption(param));
      return Curry._1(resolve, /* Error */Block.__(1, [Express.$$Response[/* sendStatus */7](/* InternalServerError */47)(res)]));
    } else {
      return Curry._1(resolve, /* Ok */Block.__(0, [a]));
    }
  };
  Curry._3(em, req, res, next);
  return match[0];
}

var Compat = /* module */[/* middlewareFromExpress */middlewareFromExpress];

var Options = /* module */[];

var JsonMiddleware = /* module */[/* Options */Options];

function bodyAsJson(size) {
  var partial_arg = Express$1.json({
        type: (function (param) {
            return true;
          }),
        limit: size
      });
  return (function (param, param$1, param$2) {
      return middlewareFromExpress(partial_arg, param, param$1, param$2);
    });
}

var safeJson = bodyAsJson(5242880);

var bigJson = bodyAsJson(104857600);

function requireQuery(decoder, req, res, ctxBuilder) {
  var exit = 0;
  var thing;
  try {
    thing = Curry._1(decoder, Server_ExpressExt.queryJson(req));
    exit = 1;
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    return Prom.wrapError(Express.$$Response[/* sendString */2]("Could not decode expected params from query string:" + toString(e), Express.$$Response[/* status */9](/* BadRequest */19)(res)));
  }
  if (exit === 1) {
    return Prom.wrapOk(Curry._1(ctxBuilder, thing));
  }
  
}

function requireParams(decoder, req, res, ctxBuilder) {
  var paramsAsJson = Express.$$Request[/* params */0](req);
  var exit = 0;
  var thing;
  try {
    thing = Curry._1(decoder, paramsAsJson);
    exit = 1;
  }
  catch (raw_e){
    var e = Caml_js_exceptions.internalToOCamlException(raw_e);
    return Prom.wrapError(Express.$$Response[/* sendString */2]("Could not decode expected params from the URL path:" + toString(e), Express.$$Response[/* status */9](/* BadRequest */19)(res)));
  }
  if (exit === 1) {
    return Prom.wrapOk(Curry._1(ctxBuilder, thing));
  }
  
}

function requireBody(decoder, req, res, ctxBuilder) {
  var match = Express.$$Request[/* bodyJSON */3](req);
  if (match !== undefined) {
    var rawBodyJson = Caml_option.valFromOption(match);
    var exit = 0;
    var decodedBody;
    try {
      decodedBody = Curry._1(decoder, rawBodyJson);
      exit = 1;
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn[0] === Json_decode.DecodeError) {
        console.log("Error decoding expected body", rawBodyJson);
        return Prom.wrapError(Express.$$Response[/* sendString */2]("Error decoding body: " + exn[1], Express.$$Response[/* status */9](/* BadRequest */19)(res)));
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return Prom.wrapOk(Curry._1(ctxBuilder, decodedBody));
    }
    
  } else {
    return Prom.wrapError(Express.$$Response[/* sendString */2]("Body Required", Express.$$Response[/* status */9](/* BadRequest */19)(res)));
  }
}

function requireToken(req, res, ctxBuilder) {
  var header = Express.$$Request[/* get */22]("Authorization", req);
  if (header !== undefined) {
    return Prom.wrapOk(Curry._1(ctxBuilder, header));
  } else {
    return Prom.wrapError(Express.$$Response[/* sendString */2]("Must include an Authorization header.", Express.$$Response[/* status */9](/* Unauthorized */20)(res)));
  }
}

function startWith(ctxBuilder, _req, _res, param) {
  return Prom.wrap(/* Ok */Block.__(0, [ctxBuilder]));
}

function just(m, req, res, param) {
  return Curry._3(m, req, res, (function (a) {
                return a;
              }));
}

function andThen(m, m2, req, res, a) {
  return Prom.flatMap(Curry._3(m, req, res, a), (function (param) {
                if (param.tag) {
                  return Prom.wrap(/* Error */Block.__(1, [param[0]]));
                } else {
                  return Curry._3(m2, req, res, param[0]);
                }
              }));
}

function andThenHandle(middleware, handler) {
  return _middlewareToExpressMiddleware((function (param, param$1, param$2) {
                return andThen(middleware, (function (param, param$1, param$2) {
                              return _handlerToMiddleware(handler, param, param$1, param$2);
                            }), param, param$1, param$2);
              }));
}

function handle(handler) {
  return _middlewareToExpressMiddleware((function (param, param$1, param$2) {
                return _handlerToMiddleware(handler, param, param$1, param$2);
              }));
}

var Composers = /* module */[
  /* startWith */startWith,
  /* just */just,
  /* andThen */andThen,
  /* andThenHandle */andThenHandle,
  /* handle */handle
];

function none(param, param$1, param$2) {
  return Prom.wrap(/* Ok */Block.__(0, [/* () */0]));
}

exports.Types = Types;
exports.Private = Private;
exports.Compat = Compat;
exports.middlewareFromExpress = middlewareFromExpress;
exports.JsonMiddleware = JsonMiddleware;
exports.bodyAsJson = bodyAsJson;
exports.safeJson = safeJson;
exports.bigJson = bigJson;
exports.requireQuery = requireQuery;
exports.requireParams = requireParams;
exports.requireBody = requireBody;
exports.requireToken = requireToken;
exports.Composers = Composers;
exports.startWith = startWith;
exports.just = just;
exports.andThen = andThen;
exports.andThenHandle = andThenHandle;
exports.handle = handle;
exports.none = none;
/* safeJson Not a pure module */
