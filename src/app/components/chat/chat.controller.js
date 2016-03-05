export default class ChatController {
  constructor($rootScope, $state, $mdSidenav, firebase, user, auth, channel) {
    this.user = user.user;
    this.auth = auth.auth;
    this.channels = channel.channels;
    this.originalEvent = null;
    this.firebase = firebase;
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    $rootScope.pageTitle = 'Chat';
  }

  openProfileMenu($mdOpenMenu, $event) {
    this.originalEvent = $event;
    $mdOpenMenu($event);
  }

  logout() {
    this.user = {};
    this.auth = {};
    this.firebase.auth.$unauth();
    this.$state.go('login');
  }

  openSideNav() {
    return this.$mdSidenav('sideNav').open();
  }

  close() {
    return this.$mdSidenav('sideNav').close();
  }
}

ChatController.$inject = ['$rootScope', '$state', '$mdSidenav', 'firebase', 'user', 'auth', 'channel'];
