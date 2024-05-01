import { page } from './../../common/const';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGripVertical, faList } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { getObjectTruThy } from 'src/app/common/globalFC';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit,DoCheck {
  faGripVertical = faGripVertical;
  faList = faList;
  environment = environment;
  listCategory: any[] = [];

  filter: any = {};

  listBrand: any[] = [
    { name: 'Cooking Color', isBrand: false },
    { name: 'Magniflex', isBrand: false },
    { name: 'Ashley', isBrand: false },
    { name: 'M&D', isBrand: false },
    { name: 'Olympic', isBrand: false },
  ];

  listProduct: any[] = [];
  user: any = {};

  page: any = this._configService.page;

  constructor(
    private router: Router,
    private _configService: ConfigService,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _cartService: CartService,
    private _storageService: StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user = this._storageService.getUser();
    this.getCategory();
    this.getProduct();
  }

  ngDoCheck(): void {
    this.user = this._storageService.getUser();
  }

  getCategory() {
    this._categoryService.categoryController().search().subscribe(
      (res: any) => {
        this.listCategory = res.Data;
        this.listCategory.map((item: any) => {
          item.isCategory = false;
        })
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  getProduct() {
    this._productService.productController().search(getObjectTruThy(this.filter)).subscribe(
      (res: any) => {
        this.listProduct = res.Data;
        this.page.totalItem = res.Data.length;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  searchCategory(e: any, index: number) {
    this.filter.category = (e?.isCategory) ? e.name : null;
    this.getProduct();
    this.listCategory.map((item: any) => {
      item.isCategory = false;
    })
    this.listCategory[index].isCategory = true
  }

  searchBrand(e: any, index: number) {
    this.filter.brand = (!e?.isBrand) ? e.name : null;
    this.getProduct();
    this.listBrand.map((item: any) => {
      item.isBrand = false;
    })
    this.listBrand[index].isBrand = true
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
            this._storageService.saveQuantityCart(res.Data.total_product_value);
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

}
