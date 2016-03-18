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
    }, () => {
      refs = refs.map((r) => {
        r.off();
        return;
      });
      let date = new Date();
      // 現在のUNIX時間を取得する (ミリ秒単位)
      var unixTimestamp = date.getTime();
      this.channels.forEach((c) => {
        let ref = firebase.data.newMessages(c.$id, unixTimestamp);
        refs.push(ref);
        ref.on('child_added', (snapshot, prevChildKey) => {
          $timeout(() => {
            let message = snapshot.val();
            if (message.userId !== this.user.$id) {
              let name = `#${c.name}`;
              if (c.private) {
                let key = c.name.replace(this.user.$id, '').replace('@', '');
                name = `@${this.users.find(u => u.$id === key).displayName}`;
              }
              notification.show(`新しいメッセージを受信しました(${name})`, {
                body: message.text
              });
            }
          })
        });
      });
    });
  }

  goDirectChannel(user) {
    let dChannel = this.channels.find(c => {
      if (!c.private || !c.invitee) return false;
      let index = c.invitee.indexOf(this.user.$id);
      let userIndex = c.invitee.indexOf(user.$id);
      return index > -1 && userIndex > -1;
    });
    if (!dChannel) {
      this.channels.$add({
        name: `${this.user.$id}@${user.$id}`,
        description: '',
        private: true,
        invitee: [this.user.$id, user.$id]
      }).then((ref) => {
        let c = this.channels[this.channels.$indexFor(ref.key())];
        console.log(c);
        this.$state.go('chat.channel', {
          channelName: c.name,
        });
        this.close();
      });
    } else {
      this.$state.go('chat.channel', {
        channelName: dChannel.name,
      });
      this.close();
    }
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
