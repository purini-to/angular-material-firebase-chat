import Firebase from 'firebase';

export default class ChannelController {
  constructor($rootScope, $mdSidenav, firebase, user, channel) {
    this.channel = channel.active;
    this.user = user.user;
    this.messages = firebase.data.messages(channel.active.$id);
    this.message = {
      text: '',
      type: 1,
      userId: user.user.$id,
      editedAt: Firebase.ServerValue.TIMESTAMP
    }
    this.isInputMessageFocus = false;
    this.$mdSidenav = $mdSidenav;
    $rootScope.pageTitle = this.channel.name;
  }

  addMessage() {
    if (this.message.text) {
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
}

ChannelController.$inject = ['$rootScope', '$mdSidenav', 'firebase', 'user', 'channel'];
