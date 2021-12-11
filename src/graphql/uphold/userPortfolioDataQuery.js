const query = `query userPortfolioDataQuery(
  $count: Int
  $defaultCurrency: String!
  $groupByCategory: Boolean
  $interval: Interval = ONE_DAY
) {
  me {
    portfolio {
      assets(first: $count, groupByCategory: $groupByCategory) {
        edges {
          node {
            asset {
              code
              formatting {
                decimal
                format
                grouping
                precision
              }
              name
              status
              symbol
              type
              statistics(interval: $interval, to: $defaultCurrency) {
                close
                open
                to
              }
            }
            cards {
              edges {
                node {
                  available
                  availableInUSD: available(as: "USD")
                  availableNormalized: available(as: $defaultCurrency)
                  balance
                  balanceNormalized: balance(as: $defaultCurrency)
                  createdByApplication {
                    clientId
                    id
                  }
                  currency
                  id
                  label
                }
              }
            }
            currentBalance {
              available
              availableNormalized: available(as: $defaultCurrency)
              balance
              balanceNormalized: balance(as: $defaultCurrency)
            }
          }
        }
      }
    }
    id
  }
}`;

export default query;
