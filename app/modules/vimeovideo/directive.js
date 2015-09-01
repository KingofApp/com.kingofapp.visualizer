angular.directive('vimeo', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<iframe id="{{id}}" height="{{vimeovideo.modulescope.height}}" width="{{vimeovideo.modulescope.width}}"> </iframe>',
      link: function postLink(scope, element, attrs) {
        var url = "http://player.vimeo.com/video/" + attrs.vid + "?title=0&byline=0&portrait=0&api=1";
        element.attr('src', url);
      }
    };
  });
