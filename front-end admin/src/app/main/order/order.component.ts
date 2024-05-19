import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { listStatusOrder, listStatusPay, messageUpdateSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { deepCopy } from 'src/app/common/globalFC';
import { ConfigService } from 'src/app/services/config.service';
import { OrderService } from 'src/app/services/order.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { environment } from 'src/environments/environment';

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

  listStatusOrder: any[] = listStatusOrder;
  listStatusPay: any[] = listStatusPay;
  listPaymentMethod: any[] = [
    {
      name: "Thanh toán khi nhận hàng",
      id: "ThanhToanKhiNhanHang",
    },
    {
      name: "Creat Card",
      id: "creatcard",
    },
  ];
  listVoucher: any[] = [];
  environment = environment;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _orderService: OrderService,
    private _voucherService: VoucherService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._voucherService.voucherController().search().subscribe(
      (res: any) => {
        this.listVoucher = res.Data;
        this.getOrder();
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
      status: null,
      payment_status: null,
      payment_method: null,
    })
  }

  getOrder() {
    this._orderService.orderController().search().subscribe(
      (res: any) => {
        this.listOfData = res.Data;
        this.listOfData.map((item: any) => {
          item.status_name = listStatusOrder.find((obj: any) => obj.id == item.status)?.name;
          item.payment_status_name = listStatusPay.find((obj: any) => obj.id == item.payment_status)?.name;
          item.payment_method_name = item.payment_method == 'ThanhToanKhiNhanHang' ? "Thanh toán khi nhận hàng" : "Creat Card";
        })
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

  cancelOrder() {
    this._orderService.orderController().search().subscribe(
      (res: any) => {

      },
      (error: any) => {
        if (error?.Data) {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.Data}`
          );
        }
      }
    )
  }

  copy_form = {};
  dataDetail: any = {};
  opentCreateUpdateOrder_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateOrderModal = true;
    this.id = 0;
    if (!!item) {
      this.id = item.id;
      this._orderService.orderController().getItem(this.id).subscribe(
        (res: any) => {
          this.copy_form = deepCopy(res.Data);
          this.dataDetail = deepCopy(res.Data);
          this.form.patchValue(res.Data);
          console.log('this.form :', this.form);
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
    console.log('this.copy_form :', this.copy_form);
    console.log('this.form.value :', this.form.value);
    let dataPush: any = deepCopy(this.copy_form);
    dataPush.code = this.form.value.code;
    dataPush.address = this.form.value.address;
    dataPush.customer_phone_number = this.form.value.customer_phone_number;
    dataPush.note = this.form.value.note;
    dataPush.customer_name = this.form.value.customer_name;
    dataPush.total_product_value = this.form.value.total_product_value;
    dataPush.voucher_id = this.form.value.voucher_id;
    dataPush.total_amount = this.form.value.total_amount;
    dataPush.payment_method = this.form.value.payment_method;
    dataPush.status = this.form.value.status;
    dataPush.payment_status = this.form.value.payment_status;
    dataPush.voucher_discount_value = this.listVoucher.find(obj => obj.id == dataPush.voucher_id)?.discount;
    if (!!this.id) {
      this._orderService.orderController().update(this.id, dataPush).subscribe(
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
