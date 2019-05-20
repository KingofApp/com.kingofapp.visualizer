(function() {
  'use strict';

  angular
    .module('king.loaders.common')
    .config(interceptor)
    .service('trafficGuardiaCivil', trafficGuardiaCivil);

  function trafficGuardiaCivil() {
    // I keep track of the total number of HTTP requests that have been
    // initiated with the application.
    var total = {
      all: 0,
      get: 0,
      post: 0,
      delete: 0,
      put: 0,
      head: 0
    };

    // I keep track of the total number of HTTP requests that have been
    // initiated, but have not yet completed (ie, are still running).
    var pending = {
      all: 0,
      get: 0,
      post: 0,
      delete: 0,
      put: 0,
      head: 0
    };

    var lastRequest = {
      url    : '',
      status : 0
    };

    // Return the public API.
    return ({
      pending: pending,
      total: total,
      lastRequest: lastRequest,
      endRequest: endRequest,
      startRequest: startRequest
    });

    // ---
    // PUBLIC METHODS.
    // ---
    // I stop tracking the given HTTP request.
    function endRequest(httpMethod, url, status) {
      httpMethod = normalizedHttpMethod(httpMethod);
      pending.all--;
      pending[httpMethod]--;
      total.all--;
      total[httpMethod]--;

      lastRequest.url = url;
      lastRequest.status = status;
      
      // EDGE CASE: In the unlikely event that the interceptors were not
      // able to obtain the config object; or, the method was changed after
      // our interceptor reached it, there's a chance that our numbers will
      // be off. In such a case, we want to try to redistribute negative
      // counts onto other properties.
      if (pending[httpMethod] < 0) {
        redistributePendingCounts(httpMethod);
      }
    }

    // I start tracking the given HTTP request.
    function startRequest(httpMethod) {
      httpMethod = normalizedHttpMethod(httpMethod);
      total.all++;
      total[httpMethod]++;
      pending.all++;
      pending[httpMethod]++;
    }

    // ---
    // PRIVATE METHODS.
    // ---
    // I make sure the given HTTP method is recognizable. If it's not, it is
    // converted to 'get' for consumption.
    function normalizedHttpMethod(httpMethod) {
      httpMethod = (httpMethod || '').toLowerCase();
      switch (httpMethod) {
        case 'get':
        case 'post':
        case 'delete':
        case 'put':
        case 'head':
          return (httpMethod);
      }
      return ('get');
    }

    // I attempt to redistribute an [unexpected] negative count to other
    // non-negative counts. The HTTP methods are iterated in likelihood of
    // execution. And, while this isn't an exact science, it will normalize
    // after all HTTP requests have finished processing.
    function redistributePendingCounts(negativeMethod) {
      var overflow = Math.abs(pending[negativeMethod]);
      pending[negativeMethod] = 0;

      // List in likely order of precedence in the application.
      var methods = ['get', 'post', 'delete', 'put', 'head'];

      // Trickle the overflow across the list of methods.
      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (overflow && pending[method]) {
          pending[method] -= overflow;
          if (pending[method] < 0) {
            overflow = Math.abs(pending[method]);
            pending[method] = 0;
          } else {
            overflow = 0;
          }
        }
      }
    }
  }

  interceptor.$inject = ['$httpProvider'];

  function interceptor($httpProvider) {
    // Wire up the traffic cop interceptors. This method will be invoked with
    // full dependency-injection functionality.
    // --
    // NOTE: This approach has been available since AngularJS 1.1.4.
    $httpProvider.interceptors.push(interceptHttp);
    // We're going to TRY to track the outgoing and incoming HTTP requests.
    // I stress "TRY" because in a perfect world, this would be very easy
    // with the promise-based interceptor chain; but, the world of
    // interceptors and data transformations is a cruel she-beast. Any
    // interceptor may completely change the outgoing config or the incoming
    // response. As such, there's a limit to the accuracy we can provide.
    // That said, it is very unlikely that this will break; but, even so, I
    // have some work-arounds for unfortunate edge-cases.
    function interceptHttp($q, trafficGuardiaCivil) {
      // Return the interceptor methods. They are all optional and get
      // added to the underlying promise chain.
      return ({
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
      });

      // ---
      // PUBLIC METHODS.
      // ---
      // Intercept the request configuration.
      function request(config) {
        // NOTE: We know that this config object will contain a method as
        // this is the definition of the interceptor - it must accept a
        // config object and return a config object.
        trafficGuardiaCivil.startRequest(config.method);
        // Pass-through original config object.
        return (config);
      }

      // Intercept the failed request.
      function requestError(rejection) {
        // At this point, we don't why the outgoing request was rejected.
        // And, we may not have access to the config - the rejection may
        // be an error object. As such, we'll just track this request as
        // a "GET".
        // --
        // NOTE: We can't ignore this one since our responseError() would
        // pick it up and we need to be able to even-out our counts.
        trafficGuardiaCivil.startRequest('get');
        // Pass-through the rejection.
        return ($q.reject(rejection));
      }

      // Intercept the successful response.
      function response(response) {   
        trafficGuardiaCivil.endRequest(extractMethod(response), extractUrl(response), extractStatus(response));
        // Pass-through the resolution.
        return (response);
      }

      // Intercept the failed response.
      function responseError(response) {
        trafficGuardiaCivil.endRequest(extractMethod(response), extractUrl(response), extractStatus(response));
        // Pass-through the rejection.
        return ($q.reject(response));
      }

      // ---
      // PRIVATE METHODS.
      // ---
      // I attempt to extract the HTTP method from the given response. If
      // another interceptor has altered the response (albeit a very
      // unlikely occurrence), then we may not be able to access the config
      // object or the the underlying method. If this fails, we return GET.
      function extractMethod(response) {
        try {
          return (response.config.method);
        } catch (error) {
          return ('get');
        }
      }

      function extractUrl(response) {
        try {
          return (response.config.url)
        } catch (error) {
          console.error('[E] Extracting url: ', error)
          return (false)
        }
      }

      function extractStatus(response) {
        try {
          return (response.status)
        } catch (error) {
          console.error('[E] Extracting url: ', error)
          return (false)
        }
      }

    }
  }
}());
