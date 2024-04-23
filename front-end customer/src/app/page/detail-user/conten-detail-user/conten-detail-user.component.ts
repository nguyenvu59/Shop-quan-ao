import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { messageUpdateSuccess } from 'src/app/common/const';
import { CustomersService } from 'src/app/services/customers.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-conten-detail-user',
  templateUrl: './conten-detail-user.component.html',
  styleUrls: ['./conten-detail-user.component.css'],
})
export class ContenDetailUserComponent implements OnInit {
  formCustomer!: FormGroup;
  user: any = {};

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _customersService: CustomersService,
    private _storageService: StorageService,
  ) { }

  ngOnInit() {
    this.initFormCustomer();
    this.user = this._storageService.getUser();
    this.getCustomers();
  }

  initFormCustomer() {
    this.formCustomer = this.fb.group({
      name: null,
      email: null,
      password: null,
      phone_number: null,
      address: null,
    })
  }

  getCustomers() {
    this._customersService.customerController().getItem(this.user.id).subscribe(
      (res: any) => {
        this.formCustomer.patchValue(res.Data);
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

  updateCustomers() {
    this._customersService.customerController().update(this.user.id, this.formCustomer.value).subscribe(
      (res: any) => {
        this.toastr.success(messageUpdateSuccess, "Thông báo");
        this.user.name = res?.Data.name;
        this._storageService.saveUser(this.user);
      }
    ),
      (error: any) => {
        if (error?.Data) {
          this.toastr.error(error?.Data, "Thông báo");
        }
      }
  }

}
