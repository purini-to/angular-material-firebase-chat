import Firebase from 'firebase';

export default class ChannelController {
  constructor($rootScope, $scope, $timeout, $mdSidenav, $mdMedia, $stateParams, firebase, user, channel) {
    this.channel = channel.active;
    this.channels = channel.channels;
    this.user = user.user;
    this.users = user.users;
    this.messages = [];
    this.message = {
      text: '',
      type: 1,
      userId: user.user.$id,
      editedAt: Firebase.ServerValue.TIMESTAMP
    }
    this.status = {
      loading: false,
      loaded: false
    }
    this.ref = firebase.data.messages(channel.active.$id, 30);
    this.ref.on('child_added', (snapshot, prevChildKey) => {
      $timeout(() => {
        let m = snapshot.val();
        m.$id = snapshot.key();
        this.messages.push(m);
        $rootScope.glued = true;
      })
    });
    this.firebase = firebase;
    this.$rootScope = $rootScope;

    this.isInputMessageFocus = $mdMedia('gt-sm');
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;
    this.$timeout = $timeout;
    this.typingPromise = null;

    $rootScope.pageTitle = this.channel.name;

    if (this.channel.private) {
      let key = this.channel.name.replace(this.user.$id, '').replace('@', '');
      this.name = this.users.find(u => u.$id === key).displayName;
      $rootScope.pageTitle = this.name;
    }

    this.stopTyping(0);

    $scope.$on('$destroy', () => {
      this.stopTyping(0);
      this.messages = [];
      if (this.ref) {
        this.ref.off();
        this.ref = null;
      }
    });
  }

  addMessage() {
    let text = (this.message.text) ? this.message.text.trim() : '';
    if (text) {
      this.message.text = text;
      this.ref.ref().push().set(this.message, () => this.stopTyping(0));
      this.message.text = '';
    }
  }

  toggleSideNavOpen() {
    return this.$mdSidenav('sideNav').toggle();
  }

  isContinuation(index) {
    if (index === 0) return false;
    var pre = index - 1;
    var target = this.messages[index];
    var preTarget = this.messages[pre];
    var l = target.userId;
    var lp = preTarget.userId;
    var dateL = new Date(target.editedAt).getTime();
    var dateLp = new Date(preTarget.editedAt).getTime();
    var diff = (dateL - dateLp) / (1000 * 60);
    return l === lp && diff < 5;
  }

  showSendBtn() {
    let text = (this.message.text) ? this.message.text.trim() : '';
    return !this.$mdMedia('gt-sm') && text !== '';
  }

  addTypingUser() {
    if (!this.channel.typing) this.channel.typing = [];
    if (this.channel.typing.indexOf(this.user.$id) > -1) return this.stopTyping(5000);
    this.channel.typing.push(this.user.$id);
    this.channels.$save(this.channel).then(() => this.stopTyping(5000));
  }

  stopTyping(deley) {
    if (this.typingPromise) this.$timeout.cancel(this.typingPromise);
    this.typingPromise = this.$timeout(() => {
      this.typingPromise = null;
      let i = (this.channel.typing) ? this.channel.typing.indexOf(this.user.$id) : -1;
      if (i === -1) return;
      this.channel.typing.splice(i, 1);
      this.channels.$save(this.channel);
    }, deley);
  }

  getUser($id) {
    return this.users.find(user => user.$id === $id);
  }

  getSendMessageUser(message) {
    return this.users.find(u => u.$id === message.userId);
  }

  loadMore() {
    return new Promise((resolve, reject) => {
      if (this.status.loaded || this.status.loading || !this.messages || this.messages.length === 0) return reject();
      this.status.loading = true;
      let startMessage = this.messages[0];
      let ref = this.firebase.data.moreMessages(this.channel.$id, 30, startMessage.$id);
      ref.once('value').then(data => {
        this.$timeout(() => {
          let ms = [];
          let exist = false;
          data.forEach(mSnap => {
            let m = mSnap.val();
            if (exist || startMessage.editedAt === m.editedAt) return exist = true;
            m.$id = mSnap.key();
            ms.push(m);
          });
          ms.reverse();
          for (let i = 0, len = ms.length; i < len; i++) {
            let m = ms[i];
            this.messages.unshift(m);
          }
          if (ms.length !== 30) this.status.loaded = true;
          this.status.loading = false;
          resolve();
        });
      });
    });
  }
}

ChannelController.$inject = ['$rootScope', '$scope', '$timeout', '$mdSidenav', '$mdMedia', '$stateParams', 'firebase', 'user', 'channel'];
