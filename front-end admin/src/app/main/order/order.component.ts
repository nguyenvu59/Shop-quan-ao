import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { listStatusOrder, messageUpdateSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { ConfigService } from 'src/app/services/config.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listOfData: any[] = [];

  page: any = this._configService.page();

  isVisible_CreateUpdateOrderModal: boolean = false;

  id: number = 0;

  form!: FormGroup;

  listStatusOrder:any[] = listStatusOrder;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _orderService: OrderService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getOrder();
  }

  initForm() {
    this.form = this.fb.group({
      code: null,
      address: null,
      customer_phone_number: null,
      note: null,
      customer_name: null,
      customer_id: 0,
      total_product_value: 0,
      voucher_id: 0,
      total_amount: 0,
      status: 0,
      payment_method: 0,
    })
  }

  getOrder() {
    this._orderService.orderController().search().subscribe(
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

  opentCreateUpdateOrder_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateOrderModal = true;
    this.id = 0;
    if (!!item) {
      this.id = item.id;
      this._orderService.orderController().getItem(this.id).subscribe(
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

  handleOk(): void {
    if (!!this.id) {
      this._orderService.orderController().update(this.id, this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getOrder();
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
  }

  handleCancel(): void {
    this.isVisible_CreateUpdateOrderModal = false;
    this.form?.reset();
  }

  onChangePageIndex(index: number) {
    this.page.page = index;
  }

}
