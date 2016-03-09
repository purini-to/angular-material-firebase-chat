export default class ChatController {
  constructor($rootScope, $scope, $window, $state, $mdSidenav, firebase, user, auth, channel) {
    this.user = user.user;
    this.users = user.users;
    this.auth = auth.auth;
    this.channels = channel.channels;
    this.originalEvent = null;
    this.firebase = firebase;
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    $rootScope.pageTitle = 'Chat';

    $scope.$on('$destroy', () => {
      this.user.loggedIn = false;
      this.users.$save(this.user);
    });
    $window.addEventListener('beforeunload', () => {
      this.logout();
    });

    this.user.loggedIn = true;
    this.users.$save(this.user);
  }

  openProfileMenu($mdOpenMenu, $event) {
    this.originalEvent = $event;
    $mdOpenMenu($event);
  }

  logout() {
    this.user.loggedIn = false;
    this.users.$save(this.user).then(() => {
      this.user = {};
      this.auth = {};
      this.firebase.auth.$unauth();
      this.$state.go('login');
    });
  }

  openSideNav() {
    return this.$mdSidenav('sideNav').open();
  }

  close() {
    return this.$mdSidenav('sideNav').close();
  }
}

ChatController.$inject = ['$rootScope', '$scope', '$window', '$state', '$mdSidenav', 'firebase', 'user', 'auth', 'channel'];
