import {Component, OnInit, AfterViewInit, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';

import {StockService} from "../../service/stock/stock.service";
import {StockModel} from "../../model/stock.model";

import swal from'sweetalert2';
import {ProductModel} from "../../model/product.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stocks: StockModel[] = [];

  constructor(private stockService: StockService) {

  }

  ngOnInit() {
    this.getAllStock();
  }

  ngAfterViewInit() {

  }

  getAllStock() {
    this.stockService.getAllStock(0, 10)
      .subscribe((response:StockModel[]) => {
        this.stocks = response;
      })
  }

  addStock(stock: StockModel) {
    swal.fire({
        title: "Agregar Stock",
        text: "Por favor ingrese la cantidad a agregar",
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        input: "number",
        showCancelButton: true,
        confirmButtonText: 'Agregar'
      }
    ).then((result) => {
      if (result.value) {
        this.stockService.addStock(stock.id, result.value)
          .subscribe((response:StockModel) => {
              this.getAllStock();
              swal.fire({
                icon: 'success',
                text:'Stock agregado correctamente'
              });
            },
            error => {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.error.errorMessage
              });
            });
      }
    });
  }

  removeStock(stock: StockModel) {
    swal.fire({
        title: "Quitar Stock",
        text: "Por favor ingrese la cantidad a quitar",
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        input: "number",
        showCancelButton: true,
        confirmButtonText: 'Quitar'
      }
    ).then((result) => {
      if (result.value) {
        this.stockService.removeStock(stock.id, result.value)
          .subscribe((response:StockModel) => {
              this.getAllStock();
              swal.fire({
                icon: 'success',
                text:'Stock quitado correctamente'
              });
            },
            error => {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.error.errorMessage
              });
            });
      }
    });
  }

  addProduct() {
    swal.fire({
        title: "Agregar Producto",
        text: "Por favor ingrese el nombre del producto",
        showClass: {
          popup: 'animated fadeInDown faster'
        },
        hideClass: {
          popup: 'animated fadeOutUp faster'
        },
        input: "text",
        showCancelButton: true,
        confirmButtonText: 'Agregar'
      }
    ).then((result) => {

      if (result.value) {
        let product: ProductModel = new ProductModel();
        product.name = result.value;

        this.stockService.addProduct(product)
          .subscribe((response: ProductModel) => {

              swal.fire({
                  title: "Agregar Producto",
                  text: "Por favor ingrese la cantidad",
                  showClass: {
                    popup: 'animated fadeInDown faster'
                  },
                  hideClass: {
                    popup: 'animated fadeOutUp faster'
                  },
                  input: "number",
                  showCancelButton: true,
                  confirmButtonText: 'Agregar'
                }
              ).then((result) => {
                if (result.value) {
                  let stock:StockModel = new StockModel();
                  stock.count = result.value;
                  stock.product = response;
                  this.stockService.createStock(stock)
                    .subscribe((response) => {
                        this.getAllStock();
                        swal.fire({
                          icon: 'success',
                          text: 'Producto agregado correctamente'
                        });
                      },
                      error => {
                        swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: error.error.errorMessage
                        });
                      })
                }
              });

            },
            error => {
              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.error.errorMessage
              });
            });
      }
    });
  }
}
