export default class ChannelController {
  constructor($rootScope, $mdSidenav, firebase, user, channel) {
    this.channel = channel.active;
    this.$mdSidenav = $mdSidenav;
    $rootScope.pageTitle = 'Channel';
  }

  toggleSideNavOpen() {
    return this.$mdSidenav('sideNav').toggle();
  }
}

ChannelController.$inject = ['$rootScope', '$mdSidenav', 'firebase', 'user', 'channel'];
