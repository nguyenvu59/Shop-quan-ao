import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messageDeleteSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { ConfigService } from 'src/app/services/config.service';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  listOfData: any[] = [];

  page: any = this._configService.page();

  constructor(
    private _configService: ConfigService,
    private _customersService: CustomersService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this._customersService.customerController().search().subscribe(
      (res: any) => {
        this.listOfData = res;
        this.page.totalItem = res.length;
      }
    ),
      (error: any) => {
        if (error?.message) {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.message}`
          );
        }
      }
  }

  deleteCustomer(id: number) {
    this._modal.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa bản ghi này',
      nzCancelText: 'Thoát',
      nzOkText: 'Xác nhận',
      nzOnOk: (result) => {
        this._customersService.customerController().delete(id).subscribe(
          (res: any) => {
            this.getCustomer();
            this.notification.create(
              TypeNotification.success,
              'Thông báo',
              messageDeleteSuccess
            );
          }
        ),
          (error: any) => {
            if (error?.message) {
              this.notification.create(
                TypeNotification.error,
                'Thông báo',
                `${error?.message}`
              );
            }
          }
      },
    });
  }


}
