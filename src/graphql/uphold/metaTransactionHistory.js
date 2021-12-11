const queryString = `
query metaTransactionsMetaTransactionsQuery(
  $automatedTransactionId: ID
  $cardId: ID
  $count: Int
  $cursor: String
  $id: ID
  $types: [MetaTransactionType!]
  $userCurrency: String
) {
  me {
    metaTransactions(after: $cursor, automatedTransactionId: $automatedTransactionId, cardId: $cardId, first: $count, id: $id, types: $types) {
      edges {
        node {
          __typename
          ... on AutomatedMetaTransaction {
            automatedTransaction {
              beginsAt
              category
              denomination {
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                source
                target
              }
              destination {
                amount
                base
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  asset {
                    code
                    color
                    formatting {
                      decimal
                      format
                      grouping
                      precision
                    }
                    image
                    marketHours {
                      nextCloseDate
                      nextOpenDate
                    }
                    name
                    status
                    symbol
                    type
                  }
                  ... on AchBankAccountEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on BankAccountEngineNode {
                    node {
                      __typename
                      currency
                      label
                      id
                    }
                  }
                  ... on CardAccountEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on CardEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on ContactEngineNode {
                    node {
                      details {
                        id
                        name {
                          first
                          last
                        }
                      }
                      email
                      isRegistered
                    }
                  }
                  ... on CryptoNetworkEngineNode {
                    network
                  }
                  ... on MultiAssetNetworkEngineNode {
                    network
                  }
                  type
                  id
                }
              }
              endsAt
              id
              isUSRemittance
              label
              message
              occurrences
              origin {
                amount
                base
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  asset {
                    code
                    color
                    formatting {
                      decimal
                      format
                      grouping
                      precision
                    }
                    image
                    marketHours {
                      nextCloseDate
                      nextOpenDate
                    }
                    name
                    status
                    symbol
                    type
                  }
                  ... on AchBankAccountEngineNode {
                    node {
                      currency
                      label
                      provider
                      id
                    }
                  }
                  ... on CardAccountEngineNode {
                    node {
                      currency
                      id
                      label
                    }
                  }
                  ... on CardEngineNode {
                    node {
                      currency
                      id
                      label
                    }
                  }
                  ... on ContactEngineNode {
                    node {
                      details {
                        id
                        name {
                          first
                          last
                        }
                      }
                      email
                      isRegistered
                    }
                  }
                  ... on CryptoNetworkEngineNode {
                    network
                  }
                  ... on MultiAssetNetworkEngineNode {
                    network
                  }
                  type
                  id
                }
              }
              periodicity
              priority
              reference
              settlement {
                availableBefore
                estimate {
                  maximum
                  minimum
                  unit
                }
              }
              status
            }
            category
            status
            transactAt
            transaction {
              createdAt
              denomination {
                amount
                currency
              }
              destination {
                __typename
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                base
                currency
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  type
                  ... on AchNode {
                    label
                  }
                  ... on AnonymousNode {
                    label
                  }
                  ... on BankNode {
                    label
                  }
                  ... on CardNode {
                    label
                  }
                  ... on CreditCardNode {
                    brand
                    cardType
                    label
                  }
                  ... on CryptoAddressTransactionNode {
                    address
                  }
                  ... on InviteNode {
                    email
                  }
                  ... on UserNode {
                    email
                    name {
                      first
                      last
                    }
                  }
                  ... on XrpLedgerAddressNode {
                    tag
                  }
                }
                rate
                ... on AbstractCryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on CryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on DashTransactionEndpoint {
                  blockchainUrl
                  instant
                  txid
                }
                amountNormalized: amount(as: $userCurrency)
              }
              error {
                code
                detail
              }
              id
              message
              origin {
                __typename
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                base
                currency
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  type
                  ... on AchNode {
                    label
                  }
                  ... on AnonymousNode {
                    label
                  }
                  ... on BankNode {
                    label
                  }
                  ... on CardNode {
                    label
                  }
                  ... on CreditCardNode {
                    brand
                    cardType
                    label
                  }
                  ... on CryptoAddressTransactionNode {
                    address
                  }
                  ... on InviteNode {
                    email
                  }
                  ... on UserNode {
                    email
                    name {
                      first
                      last
                    }
                  }
                  ... on XrpLedgerAddressNode {
                    tag
                  }
                }
                rate
                ... on AbstractCryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on CryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on DashTransactionEndpoint {
                  blockchainUrl
                  instant
                  txid
                }
                amountNormalized: amount(as: $userCurrency)
              }
              settlement {
                availableBefore
                estimate {
                  maximum
                  minimum
                  unit
                }
              }
              status
              type
            }
            type
          }
          ... on CoreMetaTransaction {
            category
            transaction {
              createdAt
              denomination {
                amount
                currency
              }
              destination {
                __typename
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                base
                currency
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  type
                  ... on AchNode {
                    label
                  }
                  ... on AnonymousNode {
                    label
                  }
                  ... on BankNode {
                    label
                  }
                  ... on CardNode {
                    label
                  }
                  ... on CreditCardNode {
                    brand
                    cardType
                    label
                  }
                  ... on CryptoAddressTransactionNode {
                    address
                  }
                  ... on InviteNode {
                    email
                  }
                  ... on UserNode {
                    email
                    name {
                      first
                      last
                    }
                  }
                  ... on XrpLedgerAddressNode {
                    tag
                  }
                }
                rate
                ... on AbstractCryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on CryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on DashTransactionEndpoint {
                  blockchainUrl
                  instant
                  txid
                }
                amountNormalized: amount(as: $userCurrency)
              }
              error {
                code
                detail
              }
              id
              message
              origin {
                __typename
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                base
                currency
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  type
                  ... on AchNode {
                    label
                  }
                  ... on AnonymousNode {
                    label
                  }
                  ... on BankNode {
                    label
                  }
                  ... on CardNode {
                    label
                  }
                  ... on CreditCardNode {
                    brand
                    cardType
                    label
                  }
                  ... on CryptoAddressTransactionNode {
                    address
                  }
                  ... on InviteNode {
                    email
                  }
                  ... on UserNode {
                    email
                    name {
                      first
                      last
                    }
                  }
                  ... on XrpLedgerAddressNode {
                    tag
                  }
                }
                rate
                ... on AbstractCryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on CryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on DashTransactionEndpoint {
                  blockchainUrl
                  instant
                  txid
                }
                amountNormalized: amount(as: $userCurrency)
              }
              settlement {
                availableBefore
                estimate {
                  maximum
                  minimum
                  unit
                }
              }
              status
              type
            }
            type
          }
          ... on LimitOrderMetaTransaction {
            category
            limitOrder {
              category
              denomination {
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                source
                target
              }
              destination {
                amount
                node {
                  __typename
                  asset {
                    code
                    color
                    formatting {
                      decimal
                      format
                      grouping
                      precision
                    }
                    image
                    marketHours {
                      nextCloseDate
                      nextOpenDate
                    }
                    name
                    status
                    symbol
                    type
                  }
                  ... on AchBankAccountEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on BankAccountEngineNode {
                    node {
                      __typename
                      currency
                      label
                      id
                    }
                  }
                  ... on CardAccountEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on CardEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on ContactEngineNode {
                    node {
                      details {
                        id
                        name {
                          first
                          last
                        }
                      }
                      email
                      isRegistered
                    }
                  }
                  ... on CryptoNetworkEngineNode {
                    network
                  }
                  ... on MultiAssetNetworkEngineNode {
                    network
                  }
                  type
                  id
                }
              }
              expiresAt
              error {
                type
              }
              id
              isUSRemittance
              label
              message
              origin {
                amount
                node {
                  __typename
                  asset {
                    code
                    color
                    formatting {
                      decimal
                      format
                      grouping
                      precision
                    }
                    image
                    marketHours {
                      nextCloseDate
                      nextOpenDate
                    }
                    name
                    status
                    symbol
                    type
                  }
                  ... on AchBankAccountEngineNode {
                    node {
                      currency
                      label
                      provider
                      id
                    }
                  }
                  ... on CardAccountEngineNode {
                    node {
                      currency
                      id
                      label
                    }
                  }
                  ... on CardEngineNode {
                    node {
                      currency
                      id
                      label
                    }
                  }
                  ... on ContactEngineNode {
                    node {
                      details {
                        id
                        name {
                          first
                          last
                        }
                      }
                      email
                      isRegistered
                    }
                  }
                  ... on CryptoNetworkEngineNode {
                    network
                  }
                  ... on MultiAssetNetworkEngineNode {
                    network
                  }
                  type
                  id
                }
              }
              settlement {
                availableBefore
                estimate {
                  maximum
                  minimum
                  unit
                }
              }
              status
              target {
                condition
                from {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                rate
                to {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
              }
            }
            transaction {
              createdAt
              denomination {
                amount
                currency
              }
              destination {
                __typename
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                base
                currency
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  type
                  ... on AchNode {
                    label
                  }
                  ... on AnonymousNode {
                    label
                  }
                  ... on BankNode {
                    label
                  }
                  ... on CardNode {
                    label
                  }
                  ... on CreditCardNode {
                    brand
                    cardType
                    label
                  }
                  ... on CryptoAddressTransactionNode {
                    address
                  }
                  ... on InviteNode {
                    email
                  }
                  ... on UserNode {
                    email
                    name {
                      first
                      last
                    }
                  }
                  ... on XrpLedgerAddressNode {
                    tag
                  }
                }
                rate
                ... on AbstractCryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on CryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on DashTransactionEndpoint {
                  blockchainUrl
                  instant
                  txid
                }
                amountNormalized: amount(as: $userCurrency)
              }
              error {
                code
                detail
              }
              id
              message
              origin {
                __typename
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                base
                currency
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  type
                  ... on AchNode {
                    label
                  }
                  ... on AnonymousNode {
                    label
                  }
                  ... on BankNode {
                    label
                  }
                  ... on CardNode {
                    label
                  }
                  ... on CreditCardNode {
                    brand
                    cardType
                    label
                  }
                  ... on CryptoAddressTransactionNode {
                    address
                  }
                  ... on InviteNode {
                    email
                  }
                  ... on UserNode {
                    email
                    name {
                      first
                      last
                    }
                  }
                  ... on XrpLedgerAddressNode {
                    tag
                  }
                }
                rate
                ... on AbstractCryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on CryptoTransactionEndpoint {
                  blockchainUrl
                  txid
                }
                ... on DashTransactionEndpoint {
                  blockchainUrl
                  instant
                  txid
                }
                amountNormalized: amount(as: $userCurrency)
              }
              settlement {
                availableBefore
                estimate {
                  maximum
                  minimum
                  unit
                }
              }
              status
              type
            }
            type
          }
          ... on UpcomingAutomatedMetaTransaction {
            automatedTransaction {
              beginsAt
              category
              denomination {
                amount
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                source
                target
              }
              destination {
                amount
                base
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  asset {
                    code
                    color
                    formatting {
                      decimal
                      format
                      grouping
                      precision
                    }
                    image
                    marketHours {
                      nextCloseDate
                      nextOpenDate
                    }
                    name
                    status
                    symbol
                    type
                  }
                  ... on AchBankAccountEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on BankAccountEngineNode {
                    node {
                      __typename
                      currency
                      label
                      id
                    }
                  }
                  ... on CardAccountEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on CardEngineNode {
                    node {
                      currency
                      label
                      id
                    }
                  }
                  ... on ContactEngineNode {
                    node {
                      details {
                        id
                        name {
                          first
                          last
                        }
                      }
                      email
                      isRegistered
                    }
                  }
                  ... on CryptoNetworkEngineNode {
                    network
                  }
                  ... on MultiAssetNetworkEngineNode {
                    network
                  }
                  type
                  id
                }
              }
              endsAt
              id
              isUSRemittance
              label
              message
              occurrences
              origin {
                amount
                base
                fees {
                  amount
                  currency
                  percentage
                  type
                }
                node {
                  __typename
                  asset {
                    code
                    color
                    formatting {
                      decimal
                      format
                      grouping
                      precision
                    }
                    image
                    marketHours {
                      nextCloseDate
                      nextOpenDate
                    }
                    name
                    status
                    symbol
                    type
                  }
                  ... on AchBankAccountEngineNode {
                    node {
                      currency
                      label
                      provider
                      id
                    }
                  }
                  ... on CardAccountEngineNode {
                    node {
                      currency
                      id
                      label
                    }
                  }
                  ... on CardEngineNode {
                    node {
                      currency
                      id
                      label
                    }
                  }
                  ... on ContactEngineNode {
                    node {
                      details {
                        id
                        name {
                          first
                          last
                        }
                      }
                      email
                      isRegistered
                    }
                  }
                  ... on CryptoNetworkEngineNode {
                    network
                  }
                  ... on MultiAssetNetworkEngineNode {
                    network
                  }
                  type
                  id
                }
              }
              periodicity
              priority
              reference
              settlement {
                availableBefore
                estimate {
                  maximum
                  minimum
                  unit
                }
              }
              status
            }
            category
            transactAt
            type
          }
          ... on UpcomingMicroPaymentInvoice {
            category
            microPayment {
              destination {
                amount
                amountNormalized: amount(as: $userCurrency)
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                node {
                  __typename
                  ... on CardNode {
                    id
                    label
                  }
                }
              }
              id
              isClaimable
              lastReceivedAt
              minimumClaimableAmount
              origin {
                amount
                amountNormalized: amount(as: $userCurrency)
                asset {
                  code
                  color
                  formatting {
                    decimal
                    format
                    grouping
                    precision
                  }
                  image
                  marketHours {
                    nextCloseDate
                    nextOpenDate
                  }
                  name
                  status
                  symbol
                  type
                }
                node {
                  __typename
                  type
                }
              }
            }
            type
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    id
  }
}
`

const query = {
    "id": "metaTransactionsMetaTransactionsQuery",
    "query": queryString,
    "variables": {
        "automatedTransactionId": null,
        "cardId": null,
        "count": 100,
        "cursor": null,
        "id": null,
        "types": [
            "AUTOMATED",
            "CORE",
            "LIMIT_ORDER",
            "UPCOMING_AUTOMATED",
            "UPCOMING_MICRO_PAYMENT"
        ],
        "userCurrency": "USD"
    }
}

export default query;