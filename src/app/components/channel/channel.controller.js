import Firebase from 'firebase';

export default class ChannelController {
  constructor($rootScope, $timeout, $mdSidenav, $mdMedia, firebase, user, channel) {
    this.channel = channel.active;
    this.channels = channel.channels;
    this.user = user.user;
    this.users = user.users;
    this.messages = firebase.data.messages(channel.active.$id);
    this.message = {
      text: '',
      type: 1,
      userId: user.user.$id,
      editedAt: Firebase.ServerValue.TIMESTAMP
    }
    this.isInputMessageFocus = $mdMedia('gt-sm');
    this.$mdSidenav = $mdSidenav;
    this.$mdMedia = $mdMedia;
    this.$timeout = $timeout;
    this.typingPromise = null;
    $rootScope.pageTitle = this.channel.name;
    this.stopTyping(0);
  }

  addMessage() {
    let text = (this.message.text) ? this.message.text.trim() : '';
    if (text) {
      this.stopTyping(0);
      this.message.text = text;
      this.messages.$add(this.message);
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
}

ChannelController.$inject = ['$rootScope', '$timeout', '$mdSidenav', '$mdMedia', 'firebase', 'user', 'channel'];
