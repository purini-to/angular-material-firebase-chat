import angular from 'angular';

export default class ChatController {
  constructor($rootScope, $scope, $mdDialog, $mdMedia, $window, $state, $mdSidenav, $timeout, firebase, user, auth, channel, notification) {
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
    notification.requestPermit();

    var refs = [];

    // チャンネルを監視して、変更があった場合は新しいメッセージのイベントリスナーを再定義する
    $scope.$watch(() => {
      return this.channels.toString();
    },() => {
      refs = refs.map((r) => {
        r.off();
        return;
      });
      let date = new Date() ;
      // 現在のUNIX時間を取得する (ミリ秒単位)
      var unixTimestamp = date.getTime() ;
      this.channels.forEach((c) => {
        let ref = firebase.data.newMessages(c.$id, unixTimestamp);
        refs.push(ref);
        ref.on('child_added', (snapshot, prevChildKey) => {
          $timeout(() => {
            let message = snapshot.val();
            notification.show(`新しいメッセージを受信しました(#${c.name})`, {body: message.text});
          })
        });
      });
    });
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

ChatController.$inject = ['$rootScope', '$scope', '$mdDialog', '$mdMedia', '$window', '$state', '$mdSidenav', '$timeout', 'firebase', 'user', 'auth', 'channel', 'notification'];
