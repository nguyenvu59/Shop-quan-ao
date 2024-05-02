import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StatusOrder } from 'src/app/common/enum';
import { deepCopy } from 'src/app/common/globalFC';
import { CartService } from 'src/app/services/cart.service';
import { CustomersService } from 'src/app/services/customers.service';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  paymentmethods: string = 'ThanhToanKhiNhanHang';
  creditCard: any = {};
  listVoucher: any[] = [];
  user: any = {};
  voucher: any = 0;
  total_amount: number = 0;
  total_amount_voucher: number = 0;
  detailCart: any[] = [];
  cartItemId: number = 0;

  constructor(
    private router: Router,
    private _orderService: OrderService,
    private _voucherService: VoucherService,
    private _storageService: StorageService,
    private _customersService: CustomersService,
    private _cartService: CartService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.user = this._storageService.getUser();
    this.cartItemId = +`${this._storageService.getCartItemId()}`;
    this.detailCart = this._storageService.getDetailCart();
    this.getVoucher();
    this.total_amount = this.detailCart.reduce(
      (accumulator: any, currentValue) => accumulator + (currentValue.price * currentValue.quantity),
      0,
    );
    this.total_amount_voucher = deepCopy(this.total_amount);
    this._customersService.customerController().getItem(this.user.id).subscribe(
      (res: any) => {
        this.user = res.Data;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

  getVoucher() {
    this._voucherService.voucherController().search().subscribe(
      (res: any) => {
        this.listVoucher = res.Data;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  callApiThanhToan() {
    let voucher_discount_value: number = 0;
    console.log('this.voucher :', this.voucher);
    if (!!this.voucher && this.voucher != '0') {
      voucher_discount_value = this.listVoucher.find(obj => obj.id == this.voucher)?.discount;
    }
    let dataPush: any = {
      code: "code123",
      address: this.user.address,
      customer_phone_number: this.user.phone_number,
      note: 'Không có thông tin gì',
      customer_name: this.user.name,
      customer_id: this.user.id,
      voucher_id: +`${this.voucher}` || 0,
      voucher_discount_value: voucher_discount_value || 0,
      total_product_value: this.total_amount,
      total_amount: this.total_amount_voucher,
      status: this.paymentmethods == 'ThanhToanKhiNhanHang' ? StatusOrder.UNPAID : StatusOrder.PAID,
      payment_method: this.paymentmethods,
      details: [],
    };
    this.detailCart.forEach(data => {
      dataPush.details.push({
        address: data.address,
        product_id: data.product_id,
        product_name: data.product_name,
        description: data.description,
        size: data.size,
        sex: data.sex,
        price: data.price,
        quantity: data.quantity,
        brand: data.brand,
        supplier: data.supplier,
        avata: data.avata,
      })
    });
    this._orderService.orderController().create(dataPush).subscribe(
      (res: any) => {
        if (this.detailCart.length == 0) {
          localStorage.removeItem('detailCart');
          localStorage.removeItem('cartItemId');
          this.router.navigate(["/"]);
          this.toastr.success("Thanh toán thành công", "Thông báo");
          return;
        }
        this.detailCart.forEach((data: any, index: number) => {
          this._cartService.cartController().delete(data.id).subscribe(
            (res: any) => {

            }
          ),
            (error: any) => {
              if (error?.Data) {
                this.toastr.error(error.error?.Data, "Thông báo");
              }
            }
          if (index == this.detailCart.length - 1) {
            this._cartService.cartController().getCartForCustomer(this.user.id).subscribe(
              (res: any) => {
                this._storageService.saveQuantityCart(res.Data.count_product);
                localStorage.removeItem('detailCart');
                localStorage.removeItem('cartItemId');
                this.router.navigate(["/"]);
                this.toastr.success("Thanh toán thành công", "Thông báo");
              }
            ),
              (error: any) => {
                if (error?.Data) {
                  this.toastr.error(error?.Data, "Thông báo");
                }
              }
          }
        })
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

  thanhtoan() {
    if (this.paymentmethods == 'creatcard') {
      if (this.creditCard.cardnumber == '3141592653589793' && this.creditCard.date == '06/15' && this.creditCard.password == '1234') {
        this.callApiThanhToan();
      }
      else {
        this.toastr.error("Thông tin thẻ không đúng", "Thông báo");
      }
    }
    else {
      this.callApiThanhToan();
    }
  }

  selectVoucher(e: any) {
    if (e == 0) {
      this.total_amount_voucher = deepCopy(this.total_amount);
      return;
    }
    else {
      let itemVoucher: any = this.listVoucher.find(obj => obj.id == e);
      if (itemVoucher?.type_of_discount == '%') {
        this.total_amount_voucher = this.total_amount - (this.total_amount * (itemVoucher.discount / 100)) || 0;
      }
      else {
        this.total_amount_voucher = this.total_amount - itemVoucher.discount || 0;
      }
    }
  }

}
