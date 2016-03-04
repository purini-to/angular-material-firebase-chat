export default function routes($stateProvider) {
  $stateProvider
    .state('chat.channel', {
      url: '/channels/:channelNam',
      template: require('./channel.jade'),
      controller: 'ChannelController',
      controllerAs: 'channel',
    });
}

routes.$inject = ['$stateProvider'];