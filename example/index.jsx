import React from 'react';
import { render } from 'react-dom';

import DateTime from '../src/js/index';
import './index.html';

render(
  <div className="root-bg">
    <div className="zh-cn-input">
      <DateTime
        lang="zh-cn"
        placeholder="年-月-日"
        format="YYYY-MM-DD HH:mm"
        needTime
      />
    </div>
    <div className="en-input">
      <DateTime />
    </div>
  </div>,
  document.getElementById('app')
);

