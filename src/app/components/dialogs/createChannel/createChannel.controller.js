export default class CreateChannelController {
  constructor($mdDialog, $mdMedia, firebase, user, auth, channel) {
    this.channel = {
      name: '',
      description: ''
    }
    this.channels = channel.channels;
    this.firebase = firebase;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;
  }

  closeDialog() {
    this.$mdDialog.cancel();
  }

  save() {
    this.channels.$add(this.channel).then(() => this.$mdDialog.hide());
  }
}

CreateChannelController.$inject = ['$mdDialog', '$mdMedia', 'firebase', 'user', 'auth', 'channel'];
