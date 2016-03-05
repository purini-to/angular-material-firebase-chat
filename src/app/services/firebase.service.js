import angular from 'angular';
import Firebase from 'firebase';

const BASE_REFPATH = 'https://burning-heat-5254.firebaseio.com';
const ref = new Firebase(BASE_REFPATH);

class FirebaseManager {
  constructor($firebaseAuth, $firebaseObject, $firebaseArray) {
    // 認証オブジェクト
    this.auth = $firebaseAuth(ref);

    // Google認証
    this.googleAuth = (cb, eCb) => {
      this.auth.$authWithOAuthPopup("google").then(function (authData) {
        cb(authData);
      }).catch(function (error) {
        eCb(error);
      });
    }

    // データ
    this.data = {
      users() {
        return $firebaseArray(new Firebase(`${BASE_REFPATH}/users`));
      },
      channels() {
        return $firebaseArray(new Firebase(`${BASE_REFPATH}/channels`));
      },
      messages(channelId) {
        return $firebaseArray(new Firebase(`${BASE_REFPATH}/messages/${channelId}`));
      }
    }
  }
}

FirebaseManager.$inject = ['$firebaseAuth', '$firebaseObject', '$firebaseArray'];

export default angular.module('services.firebase', [])
  .service('firebase', FirebaseManager)
  .name;
