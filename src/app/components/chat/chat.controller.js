export default class ChatController {
  constructor($rootScope, $state, firebase, user, auth) {
    this.user = user.user;
    this.auth = auth.auth;
    this.originalEvent = null;
    this.firebase = firebase;
    this.$state = $state;
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
}

ChatController.$inject = ['$rootScope', '$state', 'firebase', 'user', 'auth'];