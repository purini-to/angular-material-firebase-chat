import Firebase from 'firebase';

const ref = new Firebase("https://radiant-torch-9329.firebaseio.com");

export default class HomeController {
  constructor($firebaseAuth) {
    this.auth = $firebaseAuth(ref);
    this.account = {
      email: '',
      password: ''
    }
  }
  
  googleLogin() {
    this.auth.$authWithOAuthPopup("google").then(function(authData) {
      console.log(authData);
    }).catch(function(error) {
      console.log(error);
    });
  }
}

HomeController.$inject = ['$firebaseAuth'];