import { page } from './../../../common/const';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TypeNotification } from 'src/app/common/enum';
import { ConfigService } from 'src/app/services/config.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { messageAddSuccess, messageDeleteSuccess, messageUpdateSuccess } from 'src/app/common/const';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  passwordVisible = false;

  listOfData: any[] = [];

  page: any = this._configService.page();

  isVisible_CreateUpdateAdminModal: boolean = false;

  id: number = 0;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _adminService: AdminService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAdmin();
  }

  initForm() {
    this.form = this.fb.group({
      name: null,
      email: null,
      password: null,
      phone_number: null,
    })
  }

  getAdmin() {
    this._adminService.adminController().search().subscribe(
      (res: any) => {
        this.listOfData = res.Data;
        this.page.totalItem = res.Data.length;
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

  opentCreateUpdateAdmin_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateAdminModal = true;
    if (!!item) {
      this.id = item.id;
      this._adminService.adminController().getItem(this.id).subscribe(
        (res: any) => {
          this.form.patchValue(res);
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
      this.form.controls['password'].disable();
    }
  }

  deleteAdmin(id: number) {
    this._modal.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa bản ghi này',
      nzCancelText: 'Thoát',
      nzOkText: 'Xác nhận',
      nzOnOk: (result) => {
        this._adminService.adminController().delete(id).subscribe(
          (res: any) => {
            this.getAdmin();
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

  handleOk(): void {
    if (!!this.id) {
      this._adminService.adminController().update(this.id, this.form?.getRawValue()).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getAdmin();
          this.notification.create(
            TypeNotification.success,
            'Thông báo',
            messageUpdateSuccess
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
    }
    else {
      this._adminService.adminController().create(this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getAdmin();
          this.notification.create(
            TypeNotification.success,
            'Thông báo',
            messageAddSuccess
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
    }
  }

  handleCancel(): void {
    this.isVisible_CreateUpdateAdminModal = false;
    this.form?.reset();
  }

  onChangePageIndex(index: number) {
    this.page.page = index;
  }

}
