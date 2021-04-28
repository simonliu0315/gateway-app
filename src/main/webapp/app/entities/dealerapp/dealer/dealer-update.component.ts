import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDealer, Dealer } from 'app/shared/model/dealerapp/dealer.model';
import { DealerService } from './dealer.service';

@Component({
  selector: 'jhi-dealer-update',
  templateUrl: './dealer-update.component.html',
})
export class DealerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    make2: [],
    brand2: [],
  });

  constructor(protected dealerService: DealerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dealer }) => {
      this.updateForm(dealer);
    });
  }

  updateForm(dealer: IDealer): void {
    this.editForm.patchValue({
      id: dealer.id,
      make2: dealer.make2,
      brand2: dealer.brand2,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dealer = this.createFromForm();
    if (dealer.id !== undefined) {
      this.subscribeToSaveResponse(this.dealerService.update(dealer));
    } else {
      this.subscribeToSaveResponse(this.dealerService.create(dealer));
    }
  }

  private createFromForm(): IDealer {
    return {
      ...new Dealer(),
      id: this.editForm.get(['id'])!.value,
      make2: this.editForm.get(['make2'])!.value,
      brand2: this.editForm.get(['brand2'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDealer>>): void {
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
