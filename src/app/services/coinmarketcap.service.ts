// https://coinmarketcap.com/api/
// https://coinmarketcap.com/api/documentation/v1/

// ***** Coinmarketcap: Making HTTP requests on the client side with
// Javascript is currently prohibited through CORS configuration.
// FONT: https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { shareReplay } from 'rxjs/operators'
import { environment as env } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CoinMarketCapService {
  private cachedCoins!: Observable<any>
  constructor(private http: HttpClient) {}

  get coinsMarketCap() {
    if (!this.cachedCoins) {
      this.cachedCoins = this.getCoinsMarketCap().pipe(shareReplay(1))
    }
    return this.cachedCoins
  }

  private getCoinsMarketCap(): Observable<any> {
    return this.http.get<any>(`${env.MAXMIX_API}/coinmarketcap/listing-latest`)
  }
}
