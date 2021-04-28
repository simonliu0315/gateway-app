import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MainStockUpdateComponent } from 'app/entities/stock/main-stock/main-stock-update.component';
import { MainStockService } from 'app/entities/stock/main-stock/main-stock.service';
import { MainStock } from 'app/shared/model/stock/main-stock.model';

describe('Component Tests', () => {
  describe('MainStock Management Update Component', () => {
    let comp: MainStockUpdateComponent;
    let fixture: ComponentFixture<MainStockUpdateComponent>;
    let service: MainStockService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MainStockUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MainStockUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MainStockUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MainStockService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MainStock(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MainStock();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
