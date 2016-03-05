import angular from 'angular';

class ChannelModel {
  constructor() {
    this.channels = [];
    this.messages = [];
    this.active = null;
  }
}

export default angular.module('models.channel', [])
  .service('channel', ChannelModel)
  .name;
