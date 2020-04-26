(function () {
    "use strict";
  
    var Response = {};
  
    Response.OK = {
      http_status_code: 200,
      status: "SUCCESS",
      message: "OK"
    };
  
    Response.CREATED = {
      http_status_code: 201,
      status: "SUCCESS",
      message: "The request has been fulfilled and resulted in a new resource being created."
    };
  
    Response.ACCEPTED = {
      http_status_code: 202,
      status: "SUCCESS",
      message: "The request has been accepted for processing, but the processing has not been completed."
    };
  
    Response.NO_CONTENT = {
      http_status_code: 204,
      status: "SUCCESS",
      message: "The server successfully processed the request, but is not returning any content."
    };
  
    Response.MULTI_STATUS = {
      http_status_code: 207,
      status: "MULTI_STATUS",
      message: "The message body can contain a number of separate response codes, depending on" +
      " how many sub-requests were made."
    };
  
    Response.MOVED_PERMANENTLY = {
      http_status_code: 301,
      status: "SUCCESS",
      message: "The requested resource has been assigned a new permanent URI and any future" +
      " references to this resource SHOULD use one of the returned URIs."
    };
  
    Response.MOVED_TEMPORARILY = {
      http_status_code: 302,
      status: "SUCCESS",
      message: "The requested resource resides temporarily under a different URI."
    };
  
    Response.BAD_REQUEST = {
      http_status_code: 400,
      status: "ERROR",
      message: "The request could not be understood by the server due to malformed syntax."
    };
  
    Response.UNAUTHORIZED = {
      http_status_code: 401,
      status: "ERROR",
      message: "The request requires authentication."
    };
  
    Response.PAYMENT_REQUIRED = {
      http_status_code: 402,
      status: "ERROR",
      message: "Insufficient balance to proceed with the request"
    };
  
    Response.FORBIDDEN = {
      http_status_code: 403,
      status: "ERROR",
      message: "The server understood the request, but is refusing to fulfill it." +
      " Authorization will not help and the request SHOULD NOT be repeated."
    };
  
    Response.NOT_FOUND = {
      http_status_code: 404,
      status: "ERROR",
      message: "The requested resource could not be found but may be available again in the future."
    };
  
    Response.METHOD_NOT_ALLOWED = {
      http_status_code: 405,
      status: "ERROR",
      message: "A request was made of a resource using a request method not supported by that resource."
    };
  
    Response.UNSUPPORTED_MEDIA_TYPE = {
      http_status_code: 415,
      status: "ERROR",
      message: "The request entity has a media type which the server or resource does not support." +
      " Support only exists for application/json data"
    };
  
    Response.INTERNAL_SERVER_ERROR = {
      http_status_code: 500,
      status: "ERROR",
      message: "The server encountered an unexpected condition which prevented it from" +
      " fulfilling the request."
    };
  
    Response.NOT_IMPLEMENTED = {
      http_status_code: 501,
      status: "ERROR",
      message: "The server either does not recognise the request method, or it lacks" +
      " the ability to fulfill the request."
    };
  
    Response = Object.freeze(Response);
  
    module.exports = Response;
  
  })();
  