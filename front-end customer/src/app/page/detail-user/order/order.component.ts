import { Component, OnInit } from '@angular/core';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { listStatusOrder } from 'src/app/common/const';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  faEye = faEye;
  faTimes = faTimes;
  environment = environment;


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
          item.status_name = listStatusOrder.find((obj: any) => obj.id == item.status)?.name;
          item.payment_method_name = item.payment_method == 'ThanhToanKhiNhanHang' ? "Thanh toán khi nhận hàng" : "Creat Card";
        })
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error.error?.Data, "Thông báo");
        }
      }
  }
  showModal:boolean = false;
  dataDetail:any[]=[];
  itemOrder(item:any) {
    this.showModal = !this.showModal;
    this._orderService.orderController().getItem(item.id).subscribe(
      (res: any) => {
        this.dataDetail = res.Data.details;
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

}
