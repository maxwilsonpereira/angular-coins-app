import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() pageNumber: any
  @Input() totalPages!: number
  @Input() coinsDisplayedCount!: number
  @Output() setPageNumber: EventEmitter<number> = new EventEmitter()
  public pageInput!: number
  inputPageNumberNgModel: string = ''
  navNumbers: number[] = []

  constructor() {}

  ngOnInit(): void {
    // for (let i = 0; i < this.totalPages; i++) this.totalPagesToArray[i] = i
    for (let i = 1; i < 9; i++) this.navNumbers[i] = i
  }

  setPageNumberHandler(page: number) {
    this.setPageNumber.next(page)
    this.inputPageNumberNgModel = ''
  }
  setPageInput(event: any): void {
    var code = event.keyCode || event.which
    if (event.target.value < 1) {
      this.inputPageNumberNgModel = ''
      return
    }
    if (code === 13) this.goToPage()
    this.pageInput = event.target.value
  }
  goToPage(): void {
    this.inputPageNumberNgModel = ''
    if (this.pageInput < 1) return
    if (this.pageInput > this.totalPages) {
      alert('Last page: ' + this.totalPages)
      return
    }
    this.setPageNumber.next(this.pageInput - 1)
  }
}
