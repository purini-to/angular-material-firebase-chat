export default class ChannelController {
  constructor($rootScope, firebase, user) {
    $rootScope.pageTitle = 'Channel';
  }
}

ChannelController.$inject = ['$rootScope', 'firebase', 'user'];