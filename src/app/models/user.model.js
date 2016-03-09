import angular from 'angular';

class UserModel {
  constructor() {
    this.users = [];
    this.user = {
      id: '',
      displayName: '',
      profileImageURL: '',
      email: ''
    }
  }
}

export default angular.module('models.user', [])
  .service('user', UserModel)
  .name;
