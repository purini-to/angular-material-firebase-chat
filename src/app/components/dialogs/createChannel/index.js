import './createChannel.styl';

import angular from 'angular';

import CreateChannelController from './createChannel.controller';

export default angular.module('app.createChannel', [])
  .controller('CreateChannelController', CreateChannelController)
  .name;
