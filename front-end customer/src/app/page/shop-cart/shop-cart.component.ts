import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { getObjectTruThy } from 'src/app/common/globalFC';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  listCart: any[] = [];
  user: any = {};

  subtotal: number = 0;
  environment = environment;
  id: number = 0;

  constructor(
    private router: Router,
    private _cartService: CartService,
    private _storageService: StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('detailCart');
    localStorage.removeItem('cartItemId');
    this.user = this._storageService.getUser();
    if (!this.user?.id) {
      this.router.navigate(["/"]);
    }
    this.getCart();
  }

  getCart() {
    this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
      (res: any) => {
        this.id = res.Data.id;
        this.listCart = res.Data.details;
        this.subtotal = this.listCart.reduce(
          (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
          0,
        );
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  onChangePagePayment() {
    this._storageService.saveDetailCart(this.listCart);
    this._storageService.saveCartItemId(this.id);
    this.router.navigate(["payment"]);
  }

}
