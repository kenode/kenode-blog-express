'use strict';

const options = {
  element: '#display-mode',
  event: 'click',
  class: {
    sun: 'fa-sun-o',
    moon: 'fa-moon-o'
  },
  text: {
    sun: '白天模式',
    moon: '夜间模式'
  },
  name: 'dark-page'
}

const displayMode = (opts) => {
  opts = Object.assign(options, opts);
  $(opts.element).on(opts.event, (evt) => {
    let $target = $(evt.currentTarget);
    let state = $target.children('span:first').hasClass(opts.class.moon);
    setDisplayMode(state, opts);
  });
};

const setDisplayMode = (state, opts) => {
  if (state) {
    if ($('body').attr('class') === opts.name) return;
    $(opts.element).children('span:first')
      .removeClass(opts.class.moon)
      .addClass(opts.class.sun);
    $(opts.element).children('span:eq(1)').text(opts.text.sun);
    $('body').addClass(opts.name);
    $.cookie('display_mode', 'dark', { expires: 365 });
  }
  else {
    if ($('body').attr('class') !== opts.name) return;
    $(opts.element).children('span:first')
      .removeClass(opts.class.sun)
      .addClass(opts.class.moon);
    $(opts.element).children('span:eq(1)').text(opts.text.moon);
    $('body').removeClass(opts.name);
    $.cookie('display_mode', 'default', { expires: 365 });
  }
}

export default displayMode;
