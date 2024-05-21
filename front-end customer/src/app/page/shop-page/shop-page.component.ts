import { page } from './../../common/const';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGripVertical, faList } from '@fortawesome/free-solid-svg-icons';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { ToastrService } from 'ngx-toastr';
import { deepCopy, getObjectTruThy } from 'src/app/common/globalFC';
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
export class ShopPageComponent implements OnInit, DoCheck {
  faGripVertical = faGripVertical;
  faList = faList;
  environment = environment;
  listCategory: any[] = [];
  listTreeOfData: any[] = [];

  filter: any = {
    name: null,
  };

  listBrand: any[] = [
    { name: 'Cooking Color', isBrand: false },
    { name: 'Magniflex', isBrand: false },
    { name: 'Ashley', isBrand: false },
    { name: 'M&D', isBrand: false },
    { name: 'Olympic', isBrand: false },
  ];

  listProduct: any[] = [];
  user: any = {};

  page: any = this._configService.page();

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
    this.page.size = 12;
    this.user = this._storageService.getUser();
    this.getCategory();
    this.getProduct();
  }

  ngDoCheck(): void {
    this.user = this._storageService.getUser();
    if (!this.filter.name && !this._storageService.getFilterProduct()) {
      return
    }
    if (this.filter.name != this._storageService.getFilterProduct()) {
      this.filter.name = this._storageService.getFilterProduct();
      this.getProduct();
    }
  }

  getCategory() {
    this._categoryService.categoryController().search().subscribe(
      (res: any) => {
        this.listCategory = deepCopy(res.Data);
        let listTreeOfData: any = [];
        this.listCategory = this.listCategory.map((data: any) => {
          data.isChildren = this.listCategory.some((child: any) => child.parent_id === data.id);
          data.title = data.name;
          data.key = data.name;
          if (data.isChildren) {
            data.expand = false;
          } else {
            data.isLeaf = true;
          }
          return data;
        })
        this.listCategory.forEach((data: any, index: number) => {
          if (data.isChildren) {
            data.children = this.listCategory.filter((child: any) => child.parent_id == data.id);
            listTreeOfData.push(data);
          }
          if ((!data.parent_id) && (!data.isChildren)) {
            listTreeOfData.push(data);
          }
        })
        this.listTreeOfData = listTreeOfData;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  getProduct() {
    this.page.page = 1;
    this._productService.productController().search(getObjectTruThy(this.filter)).subscribe(
      async (res: any) => {        
        this.listProduct = res.Data;
        this.page.totalItem = this.listProduct.length;
        this.page.totalPages = Math.round(res?.Data / this.page.size);
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  onPageIndexChange(e: any) {
    this.page
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

  nzEvent(event: any): void {
    if (event.eventName == "check") {
      if (event.checkedKeys?.length > 1) {
        event.checkedKeys[0]._isChecked = false;
        event.keys.shift();
        event.checkedKeys.shift();
      }
      this.filter.category = event.keys[0];
      this.getProduct();
    }
  }

  test(e: any) {
    console.log(`Node ${e.key} checked: ${e.checked}`);
    console.log('e :', e);

  }

}
