import angular from 'angular';

function pressEnter($mdMedia) {
  return {
    restrict: 'A',
    link(scope, element, attrs) {
      let media = attrs.pressEnterMedia;
      element.bind('keydown keypress', (event) => {
        if (!media || $mdMedia(media)) {
          if (event.which === 13 && !event.shiftKey) {
            scope.$apply(() => {
              var e = {
                'event': event
              };
              scope.$eval(attrs.pressEnter, e);
            });
            event.preventDefault();
          }
        }
      });
    }
  }
}

pressEnter.$inject = ['$mdMedia'];

export default angular.module('directives.pressEnter', [])
  .directive('pressEnter', pressEnter)
  .name;
