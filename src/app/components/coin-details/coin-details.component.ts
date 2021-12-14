import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { CoinGeckoService } from 'src/app/services/coingecko.service'
import { Coin } from 'src/app/models'

@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss'],
})
export class CoinDetailsComponent implements OnInit {
  coinId: string = ''
  coinDetails!: Observable<Coin>
  routeSub!: Subscription
  pageNumber!: number
  orderedBy!: string
  filterByNameString!: string
  filterBySymbolString!: string
  messageToUser: string = 'Fetching data from CoinGecko API'

  constructor(
    private activatedRoute: ActivatedRoute,
    private coinGeckoService: CoinGeckoService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0)

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.coinId = params['id']
      this.getCoinDetails(this.coinId)
    })

    this.routeSub = this.activatedRoute.queryParams.subscribe(
      (params: Params) => {
        this.pageNumber = parseInt(params['page']) - 1
        this.orderedBy = params['order']
        this.filterByNameString = params['name']
        this.filterBySymbolString = params['symbol']
      }
    )

    this.coinDetails.subscribe((res: any) =>
      console.log('%c coinDetails: ', 'color: darkred', res)
    )
  }

  getCoinDetails(id: string): void {
    this.coinDetails = this.coinGeckoService.getCoinDetails(id).pipe(
      map((data: any) => {
        return data
      })
    )

    this.coinDetails.subscribe(
      () => {},
      () => {
        this.messageToUser =
          'CoinGecko API unavailable. Please try again in a minute.'
      }
    )
  }
}
