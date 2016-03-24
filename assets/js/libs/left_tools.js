'use strict';

const options = {
	element: '#left-tools',
  btn: '#app-left',
  well: '#well',
  move: ['app-left', 'app-left-move'],
  hide: ['app-well', 'app-well-hidden']
}

const leftTools = (opts) => {
  opts = Object.assign(options, opts);
  $(opts.btn + ', ' + opts.element + ' a, ' + opts.well).on('click', () => {
    if ($(opts.btn + ':hidden').size() > 0) {
      return;
    }
    if ($(opts.element).attr('class') === opts.move[1]) {
      $(opts.element).attr('class', opts.move[0]);
      $(opts.well).attr('class', opts.hide[1]);
    }
    else {
      $(opts.element).attr('class', opts.move[1]);
      $(opts.well).attr('class', opts.hide[0]);
    }
  });
}

export default leftTools;
