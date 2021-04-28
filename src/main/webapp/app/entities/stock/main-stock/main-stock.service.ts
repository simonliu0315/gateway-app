import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMainStock } from 'app/shared/model/stock/main-stock.model';

type EntityResponseType = HttpResponse<IMainStock>;
type EntityArrayResponseType = HttpResponse<IMainStock[]>;

@Injectable({ providedIn: 'root' })
export class MainStockService {
  public resourceUrl = SERVER_API_URL + 'services/stock/api/main-stocks';

  constructor(protected http: HttpClient) {}

  create(mainStock: IMainStock): Observable<EntityResponseType> {
    return this.http.post<IMainStock>(this.resourceUrl, mainStock, { observe: 'response' });
  }

  update(mainStock: IMainStock): Observable<EntityResponseType> {
    return this.http.put<IMainStock>(this.resourceUrl, mainStock, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMainStock>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMainStock[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
