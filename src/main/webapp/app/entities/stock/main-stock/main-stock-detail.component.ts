import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMainStock } from 'app/shared/model/stock/main-stock.model';

@Component({
  selector: 'jhi-main-stock-detail',
  templateUrl: './main-stock-detail.component.html',
})
export class MainStockDetailComponent implements OnInit {
  mainStock: IMainStock | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mainStock }) => (this.mainStock = mainStock));
  }

  previousState(): void {
    window.history.back();
  }
}
