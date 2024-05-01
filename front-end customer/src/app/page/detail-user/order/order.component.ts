import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { listStatusOrder } from 'src/app/common/const';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {

  listOrder: any[] = [];

  constructor(
    private _productService: ProductService,
    private _orderService: OrderService,
    private _storageService: StorageService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getOrder();
  }  

  getOrder() {
    this._orderService.orderController().search().subscribe(
      (res: any) => {
        this.listOrder = res.Data;
        this.listOrder.map((item: any) => {
          item.status_name = listStatusOrder.find((obj:any)=>obj.id == item.status)?.name;
          item.payment_method_name=item.payment_method == 'ThanhToanKhiNhanHang'?"Thanh toán khi nhận hàng":"Creat Card";
        })
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }

}
