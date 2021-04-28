import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'car',
        loadChildren: () => import('./carapp/car/car.module').then(m => m.CarappCarModule),
      },
      {
        path: 'dealer',
        loadChildren: () => import('./dealerapp/dealer/dealer.module').then(m => m.DealerappDealerModule),
      },
      {
        path: 'main-stock',
        loadChildren: () => import('./stock/main-stock/main-stock.module').then(m => m.StockMainStockModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
