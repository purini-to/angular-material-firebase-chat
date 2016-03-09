import angular from 'angular';
import Firebase from 'firebase';

const BASE_REFPATH = 'https://burning-heat-5254.firebaseio.com';
const ref = new Firebase(BASE_REFPATH);

class FirebaseManager {
  constructor($firebaseAuth, $firebaseObject, $firebaseArray) {
    this.ref = ref;
    // 認証オブジェクト
    this.auth = $firebaseAuth(ref);

    // Google認証
    this.googleAuth = (cb, eCb) => {
      this.auth.$authWithOAuthPopup("google", {scope: "email"}).then(function (authData) {
        cb(authData);
      }).catch(function (error) {
        eCb(error);
      });
    }

    // データ
    this.data = {
      users() {
        return $firebaseArray(ref.child(`users`));
      },
      channels() {
        return $firebaseArray(ref.child(`channels`));
      },
      messages(channelId, limit) {
        let r = ref.child(`messages/${channelId}`).limitToLast(limit);
        return r;
      },
      moreMessages(channelId, limit, end) {
        let r = ref.child(`messages/${channelId}`).endAt(null, end).limitToLast(limit+1);
        return r;
      },
      messageOn(channelId, limit, start) {
        let r = ref.child(`messages/${channelId}`).limitToLast(1);
        return r;
      }
    }
  }
}

FirebaseManager.$inject = ['$firebaseAuth', '$firebaseObject', '$firebaseArray'];

export default angular.module('services.firebase', [])
  .service('firebase', FirebaseManager)
  .name;
