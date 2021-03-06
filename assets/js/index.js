'use strict';

import config from './config';
import displayMode from './libs/display_mode';
import leftTools from './libs/left_tools';



$(() => {
  // tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // 左侧工具栏切换
  leftTools(config.leftTools);

  // 切换显示模式
  displayMode(config.displayMode);

});

