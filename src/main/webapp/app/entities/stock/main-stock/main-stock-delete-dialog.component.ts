import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMainStock } from 'app/shared/model/stock/main-stock.model';
import { MainStockService } from './main-stock.service';

@Component({
  templateUrl: './main-stock-delete-dialog.component.html',
})
export class MainStockDeleteDialogComponent {
  mainStock?: IMainStock;

  constructor(protected mainStockService: MainStockService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mainStockService.delete(id).subscribe(() => {
      this.eventManager.broadcast('mainStockListModification');
      this.activeModal.close();
    });
  }
}
