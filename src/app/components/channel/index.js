import './channel.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './channel.routes';
import ChannelController from './channel.controller';

export default angular.module('app.channel', [uirouter])
  .config(routing)
  .controller('ChannelController', ChannelController)
  .name;