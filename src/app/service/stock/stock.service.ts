import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/internal/operators";
import {StockModel} from "../../model/stock.model";
import {error} from "util";
import Swal from "sweetalert2";
import {Observable} from "rxjs/index";
import {ProductModel} from "../../model/product.model";

@Injectable()
export class StockService {

  private baseUrl: string = "http://localhost:8095/api"

  constructor(private httpClient: HttpClient) {
  }

  getAllStock(page, size) {
    let url = this.baseUrl + '/stock';

    if ((page !== null && page !== undefined) && (size !== null && size !== undefined))
    {
      url = url.concat('?page=' + page.toString() + '&size=' + size.toString());
    }

    return this.httpClient.get(url)
      .pipe(
      map((response: StockModel[]) => {
        return response;
      })
      );
  }

  addStock(stockId, count) {
    let url = this.baseUrl + `/stock/${stockId}/add?count=${count}`;

    return this.httpClient.put(url, null)
      .pipe(
        map((response: StockModel) => {
          return response;
        })
      );
  }

  createStock(stock) {
    let url = this.baseUrl + `/stock`;

    return this.httpClient.post(url, stock)
      .pipe(
        map((response: StockModel) => {
          return response;
        })
      );
  }

  addProduct(product) {
    let url = this.baseUrl + `/products`;

    return this.httpClient.post(url, product)
      .pipe(
        map((response: ProductModel) => {
          return response;
        })
      );
  }

  removeStock(stockId, count) {
    let url = this.baseUrl + `/stock/${stockId}/remove?count=${count}`;

    return this.httpClient.put(url, null)
      .pipe(
        map((response: StockModel) => {
          return response;
        })
      );
  }

  getCount() {
    const url = this.baseUrl + '/stock/count';

    return this.httpClient.get(url);
  }


}
