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
        nexoExtract();
    }

    // console.log(message, sender)
    // sendResponse('hey') 
});

let upholdAuthHeader: string = null

// get credentials
window.addEventListener('CryptoExtractorAuth', (data: CustomEvent) => {
    if(!upholdAuthHeader){
        upholdAuthHeader = data.detail.authHeader
        console.log(data.detail)
    }
})