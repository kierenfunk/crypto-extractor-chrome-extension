import * as React from 'react';
import * as ReactDOM from 'react-dom';

const sendMessage = (arg: string) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"runExtraction"}, function(response){
      console.log('test')
    });
  });
}

const Popup = () => (
    <div><button onClick={()=>sendMessage('nexo')}>test</button></div>
);

chrome.tabs.query({ active: true, currentWindow: true }, () => {
  ReactDOM.render(<Popup />, document.getElementById('popup'));
});
