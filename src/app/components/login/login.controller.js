export default class LoginController {
  constructor($rootScope, $mdToast, $state, firebase, user, auth) {
    this.account = {
      email: '',
      password: ''
    }
    $rootScope.pageTitle = 'Login';
    this.$mdToast = $mdToast;
    this.$state = $state;
    this.firebase = firebase;
    this.user = user;
    this.auth = auth;
  }

  googleLogin() {
    this.firebase.googleAuth(data => {
      // 認証成功
      // ユーザー情報保存
      this.user.user.id = data.google.id;
      this.user.user.displayName = data.google.displayName;
      this.user.user.profileImageURL = data.google.profileImageURL;

      // 認証情報保存
      this.auth.auth.provider = data.provider;
      this.auth.auth.uid = data.uid;
      this.auth.auth.expires = data.expires;
      this.auth.auth.token = data.token;
      this.auth.auth.accessToken = data.google.accessToken;
      this.$state.go('chat.channel', {channelNam: 'general'});
    }, error => {
      this.$mdToast.show(
        this.$mdToast.simple()
        .textContent('Google認証に失敗しました')
        .position('bottom right')
        .hideDelay(3000)
      );
    });
  }
}

LoginController.$inject = ['$rootScope', '$mdToast', '$state', 'firebase', 'user', 'auth'];