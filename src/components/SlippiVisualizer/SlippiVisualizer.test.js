import React from 'react';
import ReactDOM from 'react-dom';
import SlippiVisualizer from './SlippiVisualizer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SlippiVisualizer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
