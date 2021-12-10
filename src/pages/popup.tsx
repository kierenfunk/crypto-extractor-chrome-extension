import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Popup = () => (
    <div>test</div>
);

chrome.tabs.query({ active: true, currentWindow: true }, () => {
  ReactDOM.render(<Popup />, document.getElementById('popup'));
});
