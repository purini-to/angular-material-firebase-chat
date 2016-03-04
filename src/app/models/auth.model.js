import angular from 'angular';

class AuthModel {
  constructor() {
    this.auth = {
      provider: '',
      uid: '',
      expires: 0,
      token: '',
      accessToken: ''
    }
  }
}

export default angular.module('models.auth', [])
  .service('auth', AuthModel)
  .name;