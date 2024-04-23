import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Sex, Size, messageAddSuccess, messageDeleteSuccess, messageUpdateSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { getObjectTruThy } from 'src/app/common/globalFC';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listOfData: any[] = [];
  listCategory: any[] = [];
  listSupplier: any[] = [];
  listSize: any[] = Size;

  sex: any[] = Sex;

  page: any = this._configService.page();

  isVisible_CreateUpdateProductModal: boolean = false;

  id: number = 0;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategory();
    this.getSupplier();
    this.getProduct();
  }

  initForm() {
    this.form = this.fb.group({
      name: null,
      parent_id: 0,  
      description: null,
      size: null,
      sex: null,
      price: 0,
      quantity: 0,
      import_price: 0,
      sold: 0,
      brand: null,
      supplier: null,      

    })
  }

  getSupplier() {
    let dataFilter:any={keywork:''}
    this._supplierService.supplierController().search(dataFilter).subscribe(
      (res: any) => {
        this.listSupplier = res.Data;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.Data}`
          );
        }
      }
  }

  getProduct() {
    let dataFilter:any={keywork:''}
    this._productService.productController().search(dataFilter).subscribe(
      (res: any) => {
        this.listOfData = res.Data;
        this.page.totalItem = res.Data.length;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.Data}`
          );
        }
      }
  }

  getCategory() {
    this._categoryService.categoryController().search().subscribe(
      (res: any) => {
        this.listCategory = res.Data;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.Data}`
          );
        }
      }
  }

  opentCreateUpdateProduct_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateProductModal = true;
    if (!!item) {
      this.id = item.id;
      this._productService.productController().getItem(this.id).subscribe(
        (res: any) => {
          this.form.patchValue(res.Data);
        }
      ),
        (error: any) => {
          if (error?.Data) {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error?.Data}`
            );
          }
        }      
    }
  }

  deleteProduct(id: number) {
    this._modal.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa bản ghi này',
      nzCancelText: 'Thoát',
      nzOkText: 'Xác nhận',
      nzOnOk: (result) => {
        this._productService.productController().delete(id).subscribe(
          (res: any) => {
            this.getProduct();
            this.notification.create(
              TypeNotification.success,
              'Thông báo',
              messageDeleteSuccess
            );
          }
        ),
          (error: any) => {
            if (error?.Data) {
              this.notification.create(
                TypeNotification.error,
                'Thông báo',
                `${error?.Data}`
              );
            }
          }
      },
    });
  }

  handleOk(): void {
    if (!!this.id) {
      this._productService.productController().update(this.id, this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getProduct();
          this.notification.create(
            TypeNotification.success,
            'Thông báo',
            messageUpdateSuccess
          );
        }
      ),
        (error: any) => {
          if (error?.Data) {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error?.Data}`
            );
          }
        }
    }
    else {
      this._productService.productController().create(this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getProduct();
          this.notification.create(
            TypeNotification.success,
            'Thông báo',
            messageAddSuccess
          );
        }
      ),
        (error: any) => {
          if (error?.Data) {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error?.Data}`
            );
          }
        }
    }
  }

  handleCancel(): void {
    this.isVisible_CreateUpdateProductModal = false;
    this.form?.reset();
  }

  onChangePageIndex(index: number) {
    this.page.page = index;
  }

}
