import NexoTransaction from './types/nexo/NexoTransaction';
import query from './graphql/uphold/userPortfolioDataQuery';
import metaTransactionHistoryQuery from './graphql/uphold/metaTransactionHistory';

const script = document.createElement('script');
script.src = chrome.runtime.getURL('js/inject.js');
(document.head || document.documentElement).appendChild(script);

const nexoExtract = async () => {
  const response = await fetch('https://platform.nexo.io/api/1/get_balances', {
    method: 'POST',
  });
  const responseJson = await response.json();
  const balances = responseJson.payload.balances.filter((bal: any) => bal.total_balance > 0);

  let payloadLength = 1;
  let i = 0;
  let trxns: NexoTransaction[] = [];
  while (payloadLength > 0) {
    const trxns_response = await fetch('https://platform.nexo.io/api/1/get_transactions', {
      method: 'POST',
      body: JSON.stringify({ limit: 100, offset: i * 100, order_by_date: 'DESC' }),
    });
    const trxns_response_json = await trxns_response.json();
    payloadLength = trxns_response_json.payload.length;
    trxns = [...trxns, ...trxns_response_json.payload];
    i++;
  }
  console.log({ balance: balances, transactions: trxns });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'runExtraction') {
    if (window.location.hostname === 'nexo') {
      nexoExtract().then((response) => {
        sendResponse('hey');
      }).catch((e) => sendResponse('hey'));
    } else if (window.location.hostname === 'wallet.uphold.com') {
      upholdExtract().then((response) => {
        sendResponse('hey');
      }).catch((e) => sendResponse('hey'));
    }
    else if(window.location.hostname === 'app.wirexapp.com'){
      wirexExtract().then((response) => {
        sendResponse('hey');
      }).catch((e) => sendResponse('hey'));
    }
    else if(window.location.hostname === 'app.youhodler.com'){
      youHodlerExtract().then((response) => {
        sendResponse('hey');
      }).catch((e) => sendResponse('hey'));
    }
    else if(window.location.hostname === 'exchange.gemini.com'){
      geminiExtract().then((response) => {
        sendResponse('hey');
      }).catch((e) => sendResponse('hey'));
    }
    else{
        console.log(window.location.hostname)
    }
  }
});

const upholdExtract = async () => {
  const qlquery = {
    id: 'userPortfolioDataQuery',
    query,
    variables: {
      count: 20,
      defaultCurrency: 'USD',
      groupByCategory: true,
      interval: 'ONE_DAY',
    },
  };
  const bals = await fetch('https://api.uphold.com/graphql', {
    method: 'POST',
    headers: { Authorization: upholdAuthHeader, 'Content-type': 'application/json' },
    body: JSON.stringify(qlquery),
  });
  const balsJson = await bals.json();
    
  console.log(balsJson);
  const trxns = await fetch('https://api.uphold.com/graphql', {
    method: 'POST',
    headers: { Authorization: upholdAuthHeader, 'Content-type': 'application/json' },
    body: JSON.stringify(metaTransactionHistoryQuery),
  });
  const trxnsJson = await trxns.json();
  console.log(trxnsJson.data.me.metaTransactions.edges)


  return 'done';
  // console.log('run uphold extract')
  // console.log(upholdAuthHeader)
};

let upholdAuthHeader: string = null;
let wirexAuthHeader: string = null;
let youHodlerAuthHeader: string = null;

// get credentials
window.addEventListener('CryptoExtractorAuth', (data: CustomEvent) => {
  if (!upholdAuthHeader && data.detail.provider === 'Uphold') {
    upholdAuthHeader = data.detail.authHeader;
  }
  else if (!wirexAuthHeader && data.detail.provider === 'Wirex') {
    wirexAuthHeader = data.detail.authHeader;
  }
  else if (!youHodlerAuthHeader && data.detail.provider === 'YouHodler') {
    youHodlerAuthHeader = data.detail.authHeader;
  }
});

const wirexExtract = async () => {
    const bals = await fetch('https://api.wirexapp.com/service/accounts/v2', {
        headers: {
            Authorization: wirexAuthHeader
        }
    })
    const balsJson = await bals.json();
    console.log(balsJson)
    const trxns = await fetch('https://api.wirexapp.com/service/activities/transactional?page_size=100', {
        headers: {
            Authorization: wirexAuthHeader
        }
    })
    const trxnsJson = await trxns.json();
    console.log(trxnsJson)
}

const youHodlerExtract = async () => {
    const bals = await fetch('https://app.youhodler.com/api/v2/balance', {
        headers: {
            Authorization: youHodlerAuthHeader
        }
    })
    const { wallets } = await bals.json();
    console.log(wallets)

    let trxns: any = []
    let totalTrxns = 1
    while(trxns.length < totalTrxns){
        const response = await fetch(`https://app.youhodler.com/api/v1/balance/history?limit=100&offset=${trxns.length}`, {
            headers: {
                Authorization: youHodlerAuthHeader
            }
        })
        const trxnsJson = await response.json();
        trxns = [...trxns, ...trxnsJson.rows]
        totalTrxns = trxnsJson.total;
    }
    console.log(trxns)
}

const geminiExtract = async () => {
    const r = await fetch('https://exchange.gemini.com/history/transfers?includeEarn=true')
    const rj = await r.json()
    console.log(rj)
    const r2 = await fetch('https://exchange.gemini.com/web/account/balances')
    const r2j = await r2.json()
    console.log(r2j)
    return ''
}