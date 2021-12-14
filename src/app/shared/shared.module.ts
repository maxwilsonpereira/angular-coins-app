import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
// FormsModule needed to use [(ngModel)]:
import { FormsModule } from '@angular/forms' // ng add @angular/material
// import MatProgressBarModule AFTER AppComponent
import { MatProgressBarModule } from '@angular/material/progress-bar'
// install Swiper modules
import { SwiperModule } from 'swiper/angular'

// all exported here and inported as "SharedModule" on the app.module.ts
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, MatProgressBarModule, SwiperModule],
  declarations: [],
})
export class SharedModule {}
