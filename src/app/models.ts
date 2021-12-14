export interface APIResponse<T> {
  results: Array<T>
}

export interface Coin {
  id: string
  symbol: string
  name: string
  image: { large: string; small: string; thumb: string }
  categories: string[]
  links: { homepage: string[] }
  genesis_date: string
  market_data: { current_price: { eur: number; usd: number } }
}

export interface TrendingCoin {
  id: string
  coin_id: number
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
  small: string
  large: string
  slug: string
  price_btc: number
  score: number
}

export interface ExchangeRate {
  name: string
  unit: string
  value: number
  type: string
}

export interface CoinsMarketCap {
  cached: boolean
  data: [CoinMarketCap]
  status: {
    timestamp: string
  }
}
export interface CoinMarketCap {
  id: number
  name: string
  symbol: string
  quote: {
    USD: {
      percent_change_7d: number
      percent_change_24h: number
      percent_change_30d: number
      price: number
    }
  }
}
