import angular from 'angular';

const NOTIFICATION_PERMIT = 'granted';
const NOTIFICATION_AUTOCLOSE_MS = 5000;

class NotificationManager {
  constructor($timeout) {
    let Notification = window.Notification;
    this.isPermit = Notification.permission === NOTIFICATION_PERMIT;
    this.requestPermit = () => {
      if (Notification == null) return;
      if (!this.isPermit) {
        Notification.requestPermission(result => {
          this.isPermit = result === NOTIFICATION_PERMIT;
        });
      }
    }
    this.show = (title, options = {}) => {
      if (!this.isPermit || !title) return;
      options.icon = options.icon || '/img/favicon.ico';
      let n = new Notification(title, options);
      n.onclick = () => {
        if (!document.hasFocus()) {
          window.open().close();
          window.focus();
        }
      }
      $timeout(() => {
        n.close();
      }, NOTIFICATION_AUTOCLOSE_MS)
    }
  }
}

NotificationManager.$inject = ['$timeout'];

export default angular.module('services.notification', [])
  .service('notification', NotificationManager)
  .name;
