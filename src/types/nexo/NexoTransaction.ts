type SystemVars = {
  tier_name: string
  interest_rate: number
};

type NexoTransaction = {
  id: string
  transaction_assortment_id: number
  currency_short_name: string
  currency_pseudonym: string
  credit: number
  debit: number
  fee: number
  fees: null
  discount: number
  discounts: null
  details: string
  txid: null
  crypto_wallet_address: null
  outstanding_overdraft_before: number
  outstanding_overdraft_after: number
  time: number
  status: string
  system_vars: SystemVars
  type_id: string
  time_formated: string
  currency_id: number
  usd_value: number
  output_value: number
  is_exchange: boolean
};

export default NexoTransaction;
