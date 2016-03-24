'use strict';

import config from '../config';

const options = {
  element: '#message',
  timeOut: 3000,
  fadeIn: 'fadeInDown',
  fadeOut: 'fadeOutUp'
};

const Message = (status, message, callback) => {
  let opts = Object.assign(options, config.message);
  $(opts.element)
    .html(message)
    .removeClass(opts.fadeOut)
    .show()
    .addClass(opts.fadeIn);
  setTimeout( () => {
    $(opts.element)
      .removeClass(opts.fadeIn)
      .addClass(opts.fadeOut)
      .html('');
      callback();
  }, opts.timeOut);
};

export default Message;