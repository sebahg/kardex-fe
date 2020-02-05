import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {StockService} from "./stock/stock.service";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
   StockService
  ]
})
export class ServicesModule {}
