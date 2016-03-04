import './chat.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './chat.routes';
import ChatController from './chat.controller';

export default angular.module('app.chat', [uirouter])
  .config(routing)
  .controller('ChatController', ChatController)
  .name;