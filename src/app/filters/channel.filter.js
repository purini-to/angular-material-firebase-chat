import angular from 'angular';

function channelFilter($mdMedia) {
  return (channel) => {
    return channel.filter(c => !c.private);
  }
}

export default angular.module('filters.channelFilter', [])
  .filter('channelFilter', channelFilter)
  .name;
