// https://www.coingecko.com/api/documentations/v3
// https://api.coingecko.com/api/v3/exchanges
// https://api.coingecko.com/api/v3/finance_platforms
// SWAGGER:
// https://www.coingecko.com/api/documentations/v3#/

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { environment as env } from 'src/environments/environment'
import { Coin, TrendingCoin, ExchangeRate } from '../models'

// static data for development mode:
import coinsLocal, { coinDetails } from './coingecko-local'
const developmentMode = false

@Injectable({
  providedIn: 'root',
})
export class CoinGeckoService {
  private coinsCached!: Observable<Coin[]>
  private trendingCoinsCached!: Observable<TrendingCoin[]>
  private exchangeRatesCached!: Observable<ExchangeRate[]>

  constructor(private http: HttpClient) {}

  get coins() {
    if (!this.coinsCached) {
      this.coinsCached = this.getCoins().pipe(shareReplay(1))
    }
    return this.coinsCached
  }

  get trendingCoins() {
    if (!this.trendingCoinsCached) {
      this.trendingCoinsCached = this.getTrendingCoinsCached().pipe(
        shareReplay(1)
      )
    }
    return this.trendingCoinsCached
  }

  private getCoins(): Observable<Coin[]> {
    if (developmentMode) return this.getCoinsDevelopmentMode()
    return this.http.get<Coin[]>(`${env.COINGECKO_V3}/coins/list`)
  }
  getCoinsDevelopmentMode(): Observable<any> {
    return of(coinsLocal)
  }

  getCoinDetails(id: string): Observable<any> {
    if (developmentMode) return this.getCoinsDetailsDevelopmentMode()

    return this.http.get<any>(`${env.COINGECKO_V3}/coins/${id}`)
  }
  private getCoinsDetailsDevelopmentMode(): Observable<any> {
    return of(coinDetails)
  }

  private getTrendingCoinsCached(): Observable<TrendingCoin[]> {
    return this.http.get<TrendingCoin[]>(`${env.COINGECKO_V3}/search/trending`)
  }

  private getExchangeRatesCached(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(`${env.COINGECKO_V3}/exchange_rates`)
  }
}
