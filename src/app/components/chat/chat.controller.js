import angular from 'angular';

export default class ChatController {
  constructor($rootScope, $scope, $mdDialog, $mdMedia, $window, $state, $mdSidenav, firebase, user, auth, channel) {
    this.user = user.user;
    this.users = user.users;
    this.auth = auth.auth;
    this.channels = channel.channels;
    this.originalEvent = null;
    this.firebase = firebase;
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
    $rootScope.pageTitle = 'Chat';

    $scope.$watch(() => $mdMedia('xs') || $mdMedia('sm'), (wantsFullScreen) => this.customFullscreen = (wantsFullScreen === true));

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

  openCreateChannelDialog(ev) {
    this.close();
    this.$mdDialog.show({
      controller: 'CreateChannelController',
      controllerAs: 'dChannel',
      parent: angular.element(document.body),
      template: require('../dialogs/createChannel/createChannel.jade')(),
      targetEvent: ev,
      clickOutsideToClose: false,
    });
  }

  close() {
    return this.$mdSidenav('sideNav').close();
  }
}

ChatController.$inject = ['$rootScope', '$scope', '$mdDialog', '$mdMedia', '$window', '$state', '$mdSidenav', 'firebase', 'user', 'auth', 'channel'];
