export default class HomeController {
  constructor(firebase) {
    this.account = {
      email: '',
      password: ''
    }
    this.firebase = firebase;
  }
  
  googleLogin() {
    this.firebase.googleAuth(data => console.log(data), error => console.log(error));
  }
}

HomeController.$inject = ['firebase'];