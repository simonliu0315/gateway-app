import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMainStock, MainStock } from 'app/shared/model/stock/main-stock.model';
import { MainStockService } from './main-stock.service';

@Component({
  selector: 'jhi-main-stock-update',
  templateUrl: './main-stock-update.component.html',
})
export class MainStockUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    type: [],
  });

  constructor(protected mainStockService: MainStockService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mainStock }) => {
      this.updateForm(mainStock);
    });
  }

  updateForm(mainStock: IMainStock): void {
    this.editForm.patchValue({
      id: mainStock.id,
      name: mainStock.name,
      description: mainStock.description,
      type: mainStock.type,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mainStock = this.createFromForm();
    if (mainStock.id !== undefined) {
      this.subscribeToSaveResponse(this.mainStockService.update(mainStock));
    } else {
      this.subscribeToSaveResponse(this.mainStockService.create(mainStock));
    }
  }

  private createFromForm(): IMainStock {
    return {
      ...new MainStock(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      type: this.editForm.get(['type'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMainStock>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
