import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messageAddSuccess, messageDeleteSuccess, messageUpdateSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { ConfigService } from 'src/app/services/config.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  listOfData: any[] = [];

  page: any = this._configService.page();

  isVisible_CreateUpdateSupplierModal: boolean = false;

  id: number = 0;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _supplierService: SupplierService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSupplier();
  }

  initForm() {
    this.form = this.fb.group({
      name: null,
      phone_number: null,
      email: null,
      address: null,
    })
  }

  getSupplier() {
    let dataFilter: any = { keywork: '' }
    this._supplierService.supplierController().search(dataFilter).subscribe(
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

  opentCreateUpdateSupplier_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateSupplierModal = true;
    this.id = 0;
    if (!!item) {
      this.id = item.id;
      this._supplierService.supplierController().getItem(this.id).subscribe(
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

  deleteSupplier(id: number) {
    this._modal.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa bản ghi này',
      nzCancelText: 'Thoát',
      nzOkText: 'Xác nhận',
      nzOnOk: (result) => {
        this._supplierService.supplierController().delete(id).subscribe(
          (res: any) => {
            this.getSupplier();
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
      this._supplierService.supplierController().update(this.id, this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getSupplier();
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
      this._supplierService.supplierController().create(this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getSupplier();
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
    this.isVisible_CreateUpdateSupplierModal = false;
    this.form?.reset();
  }

  onChangePageIndex(index: number) {
    this.page.page = index;
  }


}
