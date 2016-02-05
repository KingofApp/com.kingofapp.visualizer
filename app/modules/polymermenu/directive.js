//NOTE: http://odetocode.com/blogs/scott/archive/2014/04/08/dynamically-injecting-script-tags-with-angularjs.aspx
angular
  .directive("polyScripts", function() {
    var updateScripts = function (element) {
        return function (scripts) {
            element.empty();
            angular.forEach(scripts, function (source, key) {
                var scriptTag = angular.element(
                    document.createElement("script"));
                source = "//@ sourceURL=" + key + "\n" + source;
                scriptTag.text(source)
                element.append(scriptTag);
            });
        };
    };
 
    return {
        restrict: "EA",
        scope: {
          scripts: "=" 
        },
        link: function(scope,element) {
            scope.$watch("scripts", updateScripts(element));
        }
    };
});
