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
        this.listOfData = res.data;
        this.page.totalItem = res.totalItem;
      }
    ),
      (error: any) => {
        this.notification.create(
          TypeNotification.error,
          'Thông báo',
          `${error?.description}`
        );
      }
  }

  opentCreateUpdateAdmin_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateAdminModal = true;
    if (!!item) {
      this.id = item.id;
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
            this.notification.create(
              TypeNotification.success,
              'Thông báo',
              messageDeleteSuccess
            );
          }
        ),
          (error: any) => {
            this.notification.create(
              TypeNotification.error,
              'Thông báo',
              `${error?.description}`
            );
          }
      },
    });
  }

  handleOk(): void {
    if (!!this.id) {
      this._adminService.adminController().update(this.id, this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.notification.create(
            TypeNotification.success,
            'Thông báo',
            messageUpdateSuccess
          );
        }
      ),
        (error: any) => {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.description}`
          );
        }
    }
    else {
      this._adminService.adminController().create(this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.notification.create(
            TypeNotification.success,
            'Thông báo',
            messageAddSuccess
          );
        }
      ),
        (error: any) => {
          this.notification.create(
            TypeNotification.error,
            'Thông báo',
            `${error?.description}`
          );
        }
    }
  }

  handleCancel(): void {
    this.isVisible_CreateUpdateAdminModal = false;
    this.form?.reset();
  }

}
