export default function routes($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/',
      template: require('./login.jade'),
      controller: 'LoginController',
      controllerAs: 'login',
    });
}

routes.$inject = ['$stateProvider'];