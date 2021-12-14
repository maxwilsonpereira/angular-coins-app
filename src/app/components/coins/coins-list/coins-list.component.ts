import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { CoinMarketCap } from 'src/app/models'
import { formatNumberCommas } from 'src/app/shared/utils'

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss'],
})
export class CoinsListComponent implements OnInit {
  @Input() coinsToDisplay!: Observable<CoinMarketCap[]>
  @Input() orderedBy!: string
  @Input() pageNumber!: number
  @Input() filterByNameString!: string
  @Input() filterBySymbolString!: string
  formatNumberCommas = formatNumberCommas
  fixTitlesRow = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.coinsToDisplay.subscribe((res: CoinMarketCap[]) =>
      console.log('%c coinsToDisplay: ', 'color: darkred', res)
    )

    window.addEventListener('scroll', () => {
      const scrollPositionY = window.scrollY
      if (scrollPositionY > 731) this.fixTitlesRow = true
      else this.fixTitlesRow = false
    })
  }

  openCoinDetails(id: string): void {
    this.router.navigate(['coin-details', id], {
      queryParams: {
        page: this.pageNumber + 1,
        order: this.orderedBy,
        name: this.filterByNameString,
        symbol: this.filterBySymbolString,
      },
    })
  }
}
