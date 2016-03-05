export default class ChannelController {
  constructor($rootScope, $mdSidenav, firebase, user) {
    this.$mdSidenav = $mdSidenav;
    $rootScope.pageTitle = 'Channel';
  }

  toggleSideNavOpen() {
    return this.$mdSidenav('sideNav').toggle();
  }
}

ChannelController.$inject = ['$rootScope', '$mdSidenav', 'firebase', 'user'];
