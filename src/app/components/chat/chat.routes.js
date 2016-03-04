export default function routes($stateProvider) {
  $stateProvider
    .state('chat', {
      template: require('./chat.jade'),
      controller: 'ChatController',
      controllerAs: 'chat',
      resolve: {
        "currentAuth": ["firebase", "user", "auth", function (firebase, user, auth) {
          if (auth.uid) {
            return user;
          }
          return firebase.auth.$requireAuth().then((data) => {
            // 認証成功
            // ユーザー情報保存
            user.user.id = data.google.id;
            user.user.displayName = data.google.displayName;
            user.user.profileImageURL = data.google.profileImageURL;

            // 認証情報保存
            auth.auth.provider = data.provider;
            auth.auth.uid = data.uid;
            auth.auth.expires = data.expires;
            auth.auth.token = data.token;
            auth.auth.accessToken = data.google.accessToken;
          });
        }]
      }
    });
}

routes.$inject = ['$stateProvider'];