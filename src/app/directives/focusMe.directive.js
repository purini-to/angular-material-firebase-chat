import angular from 'angular';

function focusMe($timeout) {
  return {
    restrict: 'A',
    scope: {
      focusMe: '='
    },
    link(scope, element, attrs) {
      if (scope.focusMe) {
        $timeout(() => element.focus());
      }
    }
  }
}

focusMe.$inject = ['$timeout'];

export default angular.module('directives.focusMe', [])
  .directive('focusMe', focusMe)
  .name;
