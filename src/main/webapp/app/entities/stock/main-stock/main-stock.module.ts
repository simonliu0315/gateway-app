import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { MainStockComponent } from './main-stock.component';
import { MainStockDetailComponent } from './main-stock-detail.component';
import { MainStockUpdateComponent } from './main-stock-update.component';
import { MainStockDeleteDialogComponent } from './main-stock-delete-dialog.component';
import { mainStockRoute } from './main-stock.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(mainStockRoute)],
  declarations: [MainStockComponent, MainStockDetailComponent, MainStockUpdateComponent, MainStockDeleteDialogComponent],
  entryComponents: [MainStockDeleteDialogComponent],
})
export class StockMainStockModule {}
