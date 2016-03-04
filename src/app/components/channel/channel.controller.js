export default class ChannelController {
  constructor($rootScope, $mdSidenav, firebase, user) {
    this.$mdSidenav = $mdSidenav;
    $rootScope.pageTitle = 'Channel';
  }
}

ChannelController.$inject = ['$rootScope', '$mdSidenav', 'firebase', 'user'];