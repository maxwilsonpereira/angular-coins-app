import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CoinGeckoService } from 'src/app/services/coingecko.service'
import { TrendingCoin } from 'src/app/models'

@Component({
  selector: 'app-trend-coins',
  templateUrl: './trend-coins.component.html',
  styleUrls: ['./trend-coins.component.scss'],
})
export class TrendCoinsComponent implements OnInit {
  trendCoinsResponse!: Observable<TrendingCoin[]>
  trendCoins: TrendingCoin[] = []

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.trendCoinsResponse = this.coinGeckoService.trendingCoins
    this.trendCoinsResponse.subscribe((res: any) => {
      console.log(
        '%c trendCoins: ',
        'color: darkred',
        res.coins.map((cur: any) => {
          return cur.item
        })
      )

      this.trendCoins = res.coins.map((cur: any) => {
        return cur.item
      })
    })
  }
}
