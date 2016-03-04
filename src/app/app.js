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
import 'angularjs-viewhead';

import routing from './app.config';
import login from './components/login';
import firebase from './services/firebase.service';

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
  'viewhead',
  login,
  firebase
]).config(routing);

export default MODULE_NAME;