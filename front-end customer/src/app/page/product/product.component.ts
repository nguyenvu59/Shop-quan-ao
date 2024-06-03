import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { listSize } from 'src/app/common/const';
import { getObjectTruThy, getRandomArray } from 'src/app/common/globalFC';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,DoCheck {

  id: number = 0;

  item: any = {};
  listProductRamdom4: any[] = [];
  listProduct: any[] = [];
  environment = environment;
  numberOfQuantity: number = 1;
  imageShow: string = "";
  user: any = {};
  listSize=listSize

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _productService: ProductService,
    private _cartService: CartService,
    private _storageService: StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.id = + `${this.route.snapshot.paramMap.get('id')}`;
    this.user = this._storageService.getUser();
    this.getProduct();
    this.getItemProduct();
  }

  ngDoCheck(): void {
    this.user = this._storageService.getUser();
  }

  getProduct() {
    this._productService.productController().search(getObjectTruThy({})).subscribe(
      (res: any) => {
        this.listProduct = res.Data;
        this.listProductRamdom4 = getRandomArray(this.listProduct, 4);
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  getItemProduct() {
    this._productService.productController().getItem(this.id).subscribe(
      (res: any) => {
        this.item = res.Data;
        if (this.item.images.length > 0) {
          this.imageShow = this.item.images[0].imageUrl;
        }
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
    document.getElementsByClassName('overflow-y-auto')[0].scrollTo(0, 0);
  }

  changeNumberOfQuantity(type: string) {
    if (type === "-") {
      this.numberOfQuantity -= 1;
    } else {
      this.numberOfQuantity += 1;
    }
  }

  selectImage(name: string) {
    this.imageShow = name
  }

  addCart() {
    if (!this.user?.id) {
      this.toastr.error("Hãy đăng nhập tài khoản của bạn", "Thông báo");
      return;
    }
    let dataPush = {
      "customerId": this.user.id,
      "productId": this.id,
      "quantity": this.numberOfQuantity
    }
    console.log('dataPush :', dataPush);
    // this._cartService.cartController().create(dataPush).subscribe(
    //   (res: any) => {
    //     this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
    //       (res: any) => {
    //         this._storageService.saveQuantityCart(res.Data.count_product);
    //       }
    //     ),
    //       (error: any) => {
    //         if (error?.Data) {
    //           this.toastr.error(error?.Data, "Thông báo");
    //         }
    //       }
    //     this.numberOfQuantity = 1;
    //     this.toastr.success("Thêm giỏ hàng thành công", "Thông báo");
    //   }
    // ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  addCart2() {
    if (!this.user?.id) {
      this.toastr.error("Hãy đăng nhập tài khoản của bạn", "Thông báo");
      return;
    }
    let dataPush = {
      "customerId": this.user.id,
      "productId": this.id,
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
        this.numberOfQuantity = 1;
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
    item.quantity = this.numberOfQuantity;
    item.product_id = item.id;
    item.product_name = item.name;    
    console.log('item :', item);
    // this._storageService.saveDetailCart([item]);
    // this._storageService.saveCartItemId(0);
    // this.router.navigate(["payment"]);
  }

  buyNow_Products_Purchased_Together(item: any) {
    item.quantity = 1;
    item.product_id = item.id;
    item.product_name = item.name;    
    this._storageService.saveDetailCart([item]);
    this._storageService.saveCartItemId(0);
    this.router.navigate(["payment"]);
  }
}
