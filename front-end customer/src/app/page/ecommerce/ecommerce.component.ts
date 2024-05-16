import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getObjectTruThy, getRandomArray } from 'src/app/common/globalFC';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit, DoCheck {

  listCategory: any[] = [];

  filter: any = {};

  listProduct: any[] = [];
  listProductTop: any[] = [];
  listProductRamdom8: any[] = [];
  environment = environment;
  user: any = {};

  constructor(
    private router: Router,
    private _productService: ProductService,
    private _cartService: CartService,
    private _storageService: StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user = this._storageService.getUser();
    this.getProduct()
  }

  ngDoCheck(): void {
    this.user = this._storageService.getUser();
  }

  getProduct() {
    this._productService.productController().search(getObjectTruThy(this.filter)).subscribe(
      (res: any) => {
        this.listProduct = res.Data;
        this.listProductTop = this.listProduct.slice(0, 4);
        this.listProductRamdom8 = getRandomArray(this.listProduct, 8);
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  changePageProduct(id: number) {
    this.router.navigate(["product", id]);
  }

  addCart(idProduct: number) {
    if (!this.user?.id) {
      this.toastr.error("Hãy đăng nhập tài khoản của bạn", "Thông báo");
      return;
    }
    let dataPush = {
      "customerId": this.user.id,
      "productId": idProduct,
      "quantity": 1
    }
    this._cartService.cartController().create(dataPush).subscribe(
      (res: any) => {
        this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
          (res: any) => {
            this._storageService.saveQuantityCart(res.Data.count_product);
          }
        ),
          (error: any) => {
            if (error?.Data) {
              this.toastr.error(error?.Data, "Thông báo");
            }
          }
        this.toastr.success("Thêm giỏ hàng thành công", "Thông báo");
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  buyNow(item: any) {
    item.quantity = 1;
    item.product_id = item.id;
    item.product_name = item.name;    
    this._storageService.saveDetailCart([item]);
    this._storageService.saveCartItemId(0);
    this.router.navigate(["payment"]);
  }
}
