import 'angular-material/angular-material.min.css'
import 'angular-ui-router-anim-in-out/css/anim-in-out.css';
import './app.styl';

import 'lodash';

import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-resource';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-validation-match';
import 'restangular';
import 'angular-cookie';
import 'angularfire';
import 'angular-ui-router-anim-in-out';

// config
import routing from './app.config';
import run from './app.run';

// components
import login from './components/login';
import chat from './components/chat';
import channel from './components/channel';

// services
import firebase from './services/firebase.service';

//models
import user from './models/user.model';
import auth from './models/auth.model';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  'ngAnimate',
  'ngResource',
  'ngMessages',
  'ngAria',
  'ngMaterial',
  'restangular',
  'ipCookie',
  'ui.router',
  'validation.match',
  'firebase',
  'anim-in-out',
  login,
  chat,
  channel,
  firebase,
  user,
  auth,
]).config(routing).run(run);

export default MODULE_NAME;