import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DealerComponent } from './dealer.component';
import { DealerDetailComponent } from './dealer-detail.component';
import { DealerUpdateComponent } from './dealer-update.component';
import { DealerDeleteDialogComponent } from './dealer-delete-dialog.component';
import { dealerRoute } from './dealer.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(dealerRoute)],
  declarations: [DealerComponent, DealerDetailComponent, DealerUpdateComponent, DealerDeleteDialogComponent],
  entryComponents: [DealerDeleteDialogComponent],
})
export class DealerappDealerModule {}
