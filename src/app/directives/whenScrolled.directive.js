import angular from 'angular';

function whenScrolled($timeout) {
  return {
    link(scope, element, attrs) {
      var raw = element[0];

      element.bind('scroll', function () {
        if (raw.scrollTop <= 30) {
          var sh = raw.scrollHeight
          scope.$apply(attrs.whenScrolled).then(function () {
            $timeout(function () {
              raw.scrollTop = raw.scrollHeight - sh;
            })
          }).catch(() => {return});
        }
      });
    }
  }
}

whenScrolled.$inject = ['$timeout'];

export default angular.module('directives.whenScrolled', [])
  .directive('whenScrolled', whenScrolled)
  .name;
