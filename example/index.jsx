import React from 'react';
import { render } from 'react-dom';

import DateTime from './dateTime';
import './index.html';

render(
  <div className="root-bg">
    <DateTime />
  </div>,
  document.getElementById('app')
);

