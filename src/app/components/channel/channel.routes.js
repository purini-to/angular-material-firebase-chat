export default function routes($stateProvider) {
  $stateProvider
    .state('chat.channel', {
      url: '/channels/:channelName',
      template: require('./channel.jade'),
      controller: 'ChannelController',
      controllerAs: 'channel',
      resolve: {
        "activeChannel": ["$stateParams", "channel", ($stateParams, channel) => {
          return new Promise(resolve => {
            channel.channels.$loaded(() => {
              channel.active = channel.channels.find(c => {
                return c.name === $stateParams.channelName
              });
              resolve(channel.active);
            });
          });
        }]
      }
    });
}

routes.$inject = ['$stateProvider'];
