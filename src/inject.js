(function () {

const constantMock = window.fetch;
window.fetch = function() {
    return new Promise((resolve, reject) => {
        constantMock.apply(this, arguments)
            .then((response) => {
                //console.log(response)
                /*if(response.url.indexOf("/me") > -1 && response.type != "cors"){
                    console.log(response);
                    // do something for specificconditions
                }*/
                if(arguments[1].hasOwnProperty('headers') && arguments[1]['headers'].hasOwnProperty('Authorization')){
                    window.dispatchEvent(new CustomEvent('CryptoExtractorAuth', {
                        detail: {
                            authHeader: arguments[1].headers.Authorization,
                            provider: 'Uphold'
                        },
                    }));
                }
                resolve(response);
            })
            .catch((error) => {
                reject(response);
            })
    });
}

  const XHR = XMLHttpRequest.prototype;
  const { send } = XHR;
  const { open } = XHR;
  XHR.open = function (method, url) {
    this.url = url;
    console.log(this.headers)
    return open.apply(this, arguments);
  };
  XHR.send = function () {
    this.addEventListener('load', function () {
        console.log(this.headers)
      if (this.url.includes('https://m5api.connective.com.au/api/mercury5/session/login')) {
        window.dispatchEvent(new CustomEvent('BrokerLabzMessage', {
          detail: {
            token: JSON.parse(this.response).token,
            partnerId: JSON.parse(this.response).partnerId,
          },
        }));
      }
    });
    return send.apply(this, arguments);
  };
}());
