import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'
import { CommonModule } from '@angular/common'
import { CoinsComponent } from './coins.component'
import { CoinsListComponent } from './coins-list/coins-list.component'
import { PaginationComponent } from './pagination/pagination.component'

@NgModule({
  declarations: [CoinsComponent, CoinsListComponent, PaginationComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoinsComponent],
})
export class CoinsModule {}
