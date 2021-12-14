import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { map, shareReplay } from 'rxjs/operators'
import { CoinsMarketCap, CoinMarketCap } from 'src/app/models'
// import { CoinGeckoService } from 'src/app/services/coingecko.service'
import { CoinMarketCapService } from 'src/app/services/coinmarketcap.service'
import { Router } from '@angular/router'
import { monthName } from 'src/app/shared/utils'

interface CachedCoinsInterface {
  cached: boolean
  cacheDate: string
  monthName: string
}
@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent implements OnInit, OnDestroy {
  private itemsPerPage = 20
  private coins!: Observable<CoinsMarketCap>
  coinsToDisplay!: Observable<CoinMarketCap[]>
  coinsAreCheched!: CachedCoinsInterface
  coinsDisplayedCount!: number
  routeSub!: Subscription
  totalPages: number = 0
  pageNumber: number = 0
  private start = this.pageNumber * this.itemsPerPage
  private end = this.start + this.itemsPerPage
  filterByNameString: string = ''
  filterBySymbolString: string = ''
  orderedBy: string = 'name'
  messageToUser: string = 'Fetching data from CoinGecko API'

  constructor(
    // private coinGeckoService: CoinGeckoService,
    private CoinMarketCapService: CoinMarketCapService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // SCROLL TO TOP ON PAGE LOAD
    window.scrollTo(0, 0)

    // fetching coins from CoinGecko
    this.coins = this.CoinMarketCapService.coinsMarketCap
    this.coins.subscribe(
      (res) => {
        console.log('%c this.coins : ', 'color: darkred', res)
        this.coinsAreCheched = {
          cached: res.cached,
          cacheDate: res.status.timestamp,
          monthName: monthName(parseInt(res.status.timestamp.substring(5, 7))),
        }
        this.loadCoinsToDisplay()
      },
      (err) => {
        console.log('%c ERROR: ', 'color: darkred', err)
        this.messageToUser =
          'CoinMarketCap API unavailable. Please wait one minute and try again.'
      }
    )
  }

  loadCoinsToDisplay(): void {
    this.coinsToDisplay = this.coins.pipe(
      map((result: CoinsMarketCap) => {
        this.totalPages = Math.ceil(result.data.length / this.itemsPerPage)
        this.coinsDisplayedCount = result.data.length

        // GET PARAMS AND "PRESERVE" PAGE AND SORT:
        this.routeSub = this.activatedRoute.queryParams.subscribe(
          (params: Params) => {
            if (params['page']) {
              this.filterByNameString = params['name'] || ''
              this.filterBySymbolString = params['symbol'] || ''
              // BACK to the same sort:
              const orderByAux = ['name', 'id', 'symbol']
              if (orderByAux.includes(params['order']))
                this.orderedBy = params['order']
              // BACK to the same page:
              if (
                params['page'] - 1 > 0 &&
                params['page'] <
                  Math.ceil(result.data.length / this.itemsPerPage) + 2
              )
                this.setPageNumber(parseInt(params['page']) - 1)
            }
            // BACK to the same filter:
            if (params['name'] && params['name'].length > 0)
              this.filterByParams('name')
            else if (params['symbol'] && params['symbol'].length > 0)
              this.filterByParams('symbol')
          }
        )

        return result.data
          .sort((a: CoinMarketCap, b: CoinMarketCap) => {
            if (this.orderedBy === 'name') return a.name < b.name ? -1 : 1
            else if (this.orderedBy === 'price')
              return a.quote.USD.price > b.quote.USD.price ? -1 : 1
            else
              return a.quote.USD.percent_change_7d >
                b.quote.USD.percent_change_7d
                ? -1
                : 1
          })
          .slice(this.start, this.end)
      }),
      shareReplay()
    )

    this.clearQueryParams()
  }

  sortBy(type: string): void {
    this.clearQueryParams()

    if (type === 'price') this.orderedBy = 'price'
    else if (type === 'name') this.orderedBy = 'name'
    else this.orderedBy = 'symbol'

    if (this.filterByNameString.length > 0) {
      this.filterByParams('name')
    } else if (this.filterBySymbolString.length > 0) {
      this.filterByParams('symbol')
    } else this.loadCoinsToDisplay()
  }

  setPageNumber(pageNumber: number): void {
    this.clearQueryParams()

    this.pageNumber = pageNumber
    this.start = this.pageNumber * this.itemsPerPage
    this.end = this.start + this.itemsPerPage

    this.coinsToDisplay = this.coins.pipe(
      map((data: any) => {
        if (
          this.filterByNameString.length === 0 &&
          this.filterBySymbolString.length === 0
        ) {
          this.totalPages = Math.ceil(data.data.length / this.itemsPerPage)
          this.coinsDisplayedCount = data.data.length
          return data.data.slice(this.start, this.end)
        } else {
          return data.data
            .reduce((acum: any, current: any) => {
              if (
                current[this.filterByNameString.length > 0 ? 'name' : 'symbol']
                  .toLowerCase()
                  .includes(
                    this.filterByNameString.length > 0
                      ? this.filterByNameString.toLowerCase()
                      : this.filterBySymbolString.toLowerCase()
                  )
              ) {
                acum.push(current)
              }
              this.totalPages = Math.ceil(acum.length / this.itemsPerPage)
              this.coinsDisplayedCount = acum.length
              return acum
            }, [])
            .slice(this.start, this.end)
        }
      }),
      shareReplay()
    )
  }

  filterBy(event: any, type: string): void {
    this.clearQueryParams()
    let totalFilteredCoins = 0
    this.coinsToDisplay = this.coins.pipe(
      map((data: any) => {
        const filteredData = data.data.reduce((acum: any, current: any) => {
          if (
            current[type]
              .toLowerCase()
              .includes(event.target.value.toLowerCase())
          ) {
            totalFilteredCoins++
            acum.push(current)
          }
          return acum
        }, [])

        const totalPagesAux = Math.ceil(totalFilteredCoins / this.itemsPerPage)
        this.coinsDisplayedCount = totalFilteredCoins
        this.totalPages = totalPagesAux

        if (type === 'symbol') this.filterByNameString = ''
        else if (type === 'name') this.filterBySymbolString = ''

        if (this.pageNumber + 1 > totalPagesAux) {
          // if curent page > last filtered page, go to last filtered page:
          this.setPageNumber(
            Math.ceil(totalFilteredCoins / this.itemsPerPage) - 1
          )
          return []
        } else if (this.pageNumber < 0) {
          // if there was no coins to show with current params, this.pageNumber will be = -1
          this.setPageNumber(0)
          return []
        } else {
          return filteredData.slice(this.start, this.end)
        }
      }),
      shareReplay()
    )
  }

  filterByParams(type: string): void {
    this.clearQueryParams()

    if (type === 'symbol' && this.filterByNameString.length > 0)
      this.filterByNameString = ''
    if (type === 'name' && this.filterBySymbolString.length > 0)
      this.filterBySymbolString = ''

    this.coinsToDisplay = this.coins.pipe(
      map((data: any) => {
        return data.data
          .reduce((acum: any, current: any) => {
            if (
              current[type]
                .toLowerCase()
                .includes(
                  this.filterByNameString.length > 0
                    ? this.filterByNameString.toLowerCase()
                    : this.filterBySymbolString.toLowerCase()
                )
            ) {
              acum.push(current)
            }
            this.totalPages = Math.ceil(acum.length / this.itemsPerPage)
            this.start = this.pageNumber * this.itemsPerPage
            this.end = this.start + this.itemsPerPage
            this.coinsDisplayedCount = acum.length
            return acum
          }, [])
          .slice(this.start, this.end)
      }),
      shareReplay()
    )
  }

  clearQueryParams(): void {
    this.router.navigate([], {
      queryParams: {
        page: null,
        orderedBy: null,
        name: null,
        symbol: null,
      },
    })
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe()
    }
  }
}
