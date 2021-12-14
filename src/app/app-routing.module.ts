import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
// import { CoinsComponent } from './coins/coins.component'
import { CoinDetailsComponent } from './components/coin-details/coin-details.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: '', // ASSIM TAVA FUNCIONANDO, "APAGANDO" O HOME FOLDER
  //   component: CoinsComponent,
  // },
  {
    path: 'coin-details/:id',
    component: CoinDetailsComponent,
  },
  {
    // LAZY LOAD:
    path: 'about',
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
