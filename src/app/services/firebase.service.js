import angular from 'angular';
import Firebase from 'firebase';

const ref = new Firebase("https://radiant-torch-9329.firebaseio.com");

class FirebaseManager {
  constructor($firebaseAuth) {
    this.auth = $firebaseAuth(ref);
    this.googleAuth = (cb, eCb) => {
      this.auth.$authWithOAuthPopup("google").then(function (authData) {
        cb(authData);
      }).catch(function (error) {
        eCb(error);
      });
    }
  }
}

FirebaseManager.$inject = ['$firebaseAuth'];

export default angular.module('services.firebase', [])
  .service('firebase', FirebaseManager)
  .name;