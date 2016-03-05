import angular from 'angular';

function pressEnter() {
  return {
    restrict: 'A',
    link(scope, element, attrs) {
      element.bind('keydown keypress', (event) => {
        if (event.which === 13 && !event.shiftKey) {
          scope.$apply(() => {
            var e = {
              'event': event
            };
            scope.$eval(attrs.pressEnter, e);
          });
          event.preventDefault();
        }
      });
    }
  }
}

export default angular.module('directives.pressEnter', [])
  .directive('pressEnter', pressEnter)
  .name;
