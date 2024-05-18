import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent  implements OnInit {

  user: any = {};
  detailCart: any[] = [];

  constructor(
    private router: Router,
    private _orderService: OrderService,  
    private _storageService: StorageService,
    private _cartService: CartService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = this._storageService.getUser();
    this.detailCart = this._storageService.getDetailCart();
    let dataPush = this._storageService.getDataPushOrder();
    this._orderService.orderController().create(dataPush).subscribe(
      (res: any) => {
        if (this.detailCart.length == 0) {
          localStorage.removeItem('detailCart');
          localStorage.removeItem('cartItemId');       
          this.toastr.success("Thanh toán thành công", "Thông báo");
          return;
        }
        this.detailCart.forEach((data: any, index: number) => {
          this._cartService.cartController().delete(data.id).subscribe(
            (res: any) => {

            },
            (error: any) => {
              if (error?.Data) {
                this.toastr.error(error.error?.Data, "Thông báo");
              }
            }
          )
          if (index == this.detailCart.length - 1) {
            this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
              (res: any) => {
                this._storageService.saveQuantityCart(res.Data.count_product);
                localStorage.removeItem('detailCart');
                localStorage.removeItem('cartItemId');       
                this.toastr.success("Thanh toán thành công", "Thông báo");
              },
              (error: any) => {
                if (error?.Data) {
                  this.toastr.error(error?.Data, "Thông báo");
                }
              }
            )
          }
        })
      }, (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
    )
  }

}
