import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Type_of_Discount, messageAddSuccess, messageDeleteSuccess, messageUpdateSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { ConfigService } from 'src/app/services/config.service';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {

  listOfData: any[] = [];

  page: any = this._configService.page();

  isVisible_CreateUpdatevVoucherModal: boolean = false;

  id: number = 0;

  form!: FormGroup;

  Type_of_Discount:any = Type_of_Discount;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _voucherService: VoucherService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getvVoucher();
  }

  initForm() {
    this.form = this.fb.group({
      code: null,
      description: null,
      discount: 0,
      type_of_discount: null,
    })
  }

  getvVoucher() {
    this._voucherService.voucherController().search().subscribe(
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

  opentCreateUpdatevVoucher_Modal(item: any = undefined) {
    this.isVisible_CreateUpdatevVoucherModal = true;
    this.id = 0;
    if (!!item) {
      this.id = item.id;
      this._voucherService.voucherController().getItem(this.id).subscribe(
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

  deletevVoucher(id: number) {
    this._modal.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa bản ghi này',
      nzCancelText: 'Thoát',
      nzOkText: 'Xác nhận',
      nzOnOk: (result) => {
        this._voucherService.voucherController().delete(id).subscribe(
          (res: any) => {
            this.getvVoucher();
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
      this._voucherService.voucherController().update(this.id, this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getvVoucher();
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
      this._voucherService.voucherController().create(this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getvVoucher();
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
    this.isVisible_CreateUpdatevVoucherModal = false;
    this.form?.reset();
  }

  onChangePageIndex(index: number) {
    this.page.page = index;
  }

}
