import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMainStock, MainStock } from 'app/shared/model/stock/main-stock.model';
import { MainStockService } from './main-stock.service';
import { MainStockComponent } from './main-stock.component';
import { MainStockDetailComponent } from './main-stock-detail.component';
import { MainStockUpdateComponent } from './main-stock-update.component';

@Injectable({ providedIn: 'root' })
export class MainStockResolve implements Resolve<IMainStock> {
  constructor(private service: MainStockService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMainStock> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((mainStock: HttpResponse<MainStock>) => {
          if (mainStock.body) {
            return of(mainStock.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MainStock());
  }
}

export const mainStockRoute: Routes = [
  {
    path: '',
    component: MainStockComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.stockMainStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MainStockDetailComponent,
    resolve: {
      mainStock: MainStockResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.stockMainStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MainStockUpdateComponent,
    resolve: {
      mainStock: MainStockResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.stockMainStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MainStockUpdateComponent,
    resolve: {
      mainStock: MainStockResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.stockMainStock.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
