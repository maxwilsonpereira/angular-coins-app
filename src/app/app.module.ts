import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { SharedModule } from 'src/app/shared/shared.module'
import { HomeModule } from 'src/app/home/home.module'
import { CoinsModule } from 'src/app/components/coins/coins.module'
import { CoinDetailsComponent } from 'src/app/components/coin-details/coin-details.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { NavbarComponent } from 'src/app/components/navbar/navbar.component'
import { FooterComponent } from 'src/app/components/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    CoinDetailsComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    CoinsModule,
    SharedModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
