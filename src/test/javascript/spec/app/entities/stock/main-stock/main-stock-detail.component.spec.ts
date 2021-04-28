import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MainStockDetailComponent } from 'app/entities/stock/main-stock/main-stock-detail.component';
import { MainStock } from 'app/shared/model/stock/main-stock.model';

describe('Component Tests', () => {
  describe('MainStock Management Detail Component', () => {
    let comp: MainStockDetailComponent;
    let fixture: ComponentFixture<MainStockDetailComponent>;
    const route = ({ data: of({ mainStock: new MainStock(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MainStockDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MainStockDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MainStockDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load mainStock on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mainStock).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
