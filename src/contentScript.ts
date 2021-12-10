import NexoTransaction from "./types/nexo/NexoTransaction";

const script = document.createElement('script');
script.src = chrome.runtime.getURL('js/inject.js');
(document.head || document.documentElement).appendChild(script);


const nexoExtract = async () => {
    const response = await fetch('https://platform.nexo.io/api/1/get_balances',{
        method:'POST'
    })
    const responseJson = await response.json()
    const balances = responseJson.payload.balances.filter((bal: any)=>{
        return bal.total_balance > 0
    })

    let payloadLength = 1
    let i = 0;
    let trxns: NexoTransaction[] = []
    while(payloadLength > 0){
        const trxns_response = await fetch('https://platform.nexo.io/api/1/get_transactions',{
            method:'POST',
            body: JSON.stringify({limit: 100, offset: i*100, order_by_date: "DESC"})
        })
        const trxns_response_json = await trxns_response.json()
        payloadLength = trxns_response_json.payload.length
        trxns = [...trxns, ...trxns_response_json.payload]
        i++;
    }
    console.log({balance: balances, transactions:trxns})
} 

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type === 'runExtraction'){
        if(window.location.hostname==='nexo'){
            nexoExtract().then(response=>{
                sendResponse('hey')
            }).catch(e=>sendResponse('hey'))
        }
        else if(window.location.hostname==='wallet.uphold.com'){
            console.log('hello?')
            upholdExtract().then(response=>{
                console.log(response)
                sendResponse('hey')
            }).catch(e=>sendResponse('hey'))
        }
    }
});


const upholdExtract = async () => {
    const query = {
        "id": "userPortfolioDataQuery",
        "query": "query userPortfolioDataQuery(\n  $count: Int\n  $defaultCurrency: String!\n  $groupByCategory: Boolean\n  $interval: Interval = ONE_DAY\n) {\n  me {\n    historicalBalances(as: $defaultCurrency, interval: $interval) {\n      available\n      balance\n      timestamp\n    }\n    portfolio {\n      assets(first: $count, groupByCategory: $groupByCategory) {\n        edges {\n          node {\n            asset {\n              code\n              color\n              formatting {\n                decimal\n                format\n                grouping\n                precision\n              }\n              image\n              marketHours {\n                nextCloseDate\n                nextOpenDate\n              }\n              name\n              status\n              symbol\n              type\n              statistics(interval: $interval, to: $defaultCurrency) {\n                close\n                open\n                to\n              }\n            }\n            cards {\n              edges {\n                node {\n                  available\n                  availableInUSD: available(as: \"USD\")\n                  availableNormalized: available(as: $defaultCurrency)\n                  balance\n                  balanceNormalized: balance(as: $defaultCurrency)\n                  createdByApplication {\n                    clientId\n                    id\n                  }\n                  currency\n                  id\n                  label\n                }\n              }\n            }\n            currentBalance {\n              available\n              availableNormalized: available(as: $defaultCurrency)\n              balance\n              balanceNormalized: balance(as: $defaultCurrency)\n            }\n          }\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n    transactions {\n      totalCount\n    }\n    id\n  }\n}\n",
        "variables": {
            "count": 20,
            "defaultCurrency": "USD",
            "groupByCategory": true,
            "interval": "ONE_DAY"
        }
    }
    const response = await fetch('https://api.uphold.com/graphql',{method: 'POST',headers:{Authorization: upholdAuthHeader,"Content-type": 'application/json'},body:JSON.stringify(query)})
    console.log('run uphold extract')
    const responseJson = await response.json()
    console.log(responseJson)
    return 'done'
    //console.log('run uphold extract')
    //console.log(upholdAuthHeader)
}

let upholdAuthHeader: string = null

// get credentials
window.addEventListener('CryptoExtractorAuth', (data: CustomEvent) => {
    if(!upholdAuthHeader){
        upholdAuthHeader = data.detail.authHeader
    }
})