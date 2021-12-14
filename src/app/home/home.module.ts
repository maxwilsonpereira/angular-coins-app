import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { CoinsModule } from 'src/app/components/coins/coins.module'
import { VideosSliderComponent } from 'src/app/components/videos-slider/videos-slider.component'
import { TrendCoinsComponent } from 'src/app/components/trend-coins/trend-coins.component'

@NgModule({
  declarations: [HomeComponent, VideosSliderComponent, TrendCoinsComponent],
  imports: [CommonModule, SharedModule, CoinsModule],
  exports: [],
})
export class HomeModule {}
