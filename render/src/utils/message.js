// 是否有消息提示框标志，防止出现多个影响体验， false 无 / true 有
let MSGSHOWFLAG = false;

import { Message, Notification } from 'element-ui';

/**
 *
 * @param {*} message
 * @param {*} type success/warning/info/error
 * @param duration
 * @returns
 */
export const showMessage = function showMessage(message, type = 'info', duration = 2000) {
  if (MSGSHOWFLAG) {
    return;
  }
  MSGSHOWFLAG = true;
  Message({
    message,
    type,
    duration,
  });
  setTimeout(() => {
    MSGSHOWFLAG = false;
  }, duration);
};

let toastInstance = null;
/**
 *
 * @param {*} message
 * @param {*} title
 * @param {*} type success/warning/info/error
 * @param {*} duration
 * @returns
 */
export const showToast = (message, title = '消息', type = 'info', duration = 3500) => {
  if (toastInstance) {
    toastInstance.close();
  }
  toastInstance = Notification[type]({
    title,
    message,
    duration,
  });
};
