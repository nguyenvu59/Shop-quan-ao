import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { messageAddSuccess, messageDeleteSuccess, messageUpdateSuccess } from 'src/app/common/const';
import { TypeNotification } from 'src/app/common/enum';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listOfData: any[] = [];

  page: any = this._configService.page();

  isVisible_CreateUpdateCategoryModal: boolean = false;

  id: number = 0;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _configService: ConfigService,
    private _categoryService: CategoryService,
    private notification: NzNotificationService,
    private _modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategory();
  }

  initForm() {
    this.form = this.fb.group({
      name: null,
      parent_id: 0,
    })
  }

  getCategory() {
    this._categoryService.categoryController().search().subscribe(
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

  opentCreateUpdateCategory_Modal(item: any = undefined) {
    this.isVisible_CreateUpdateCategoryModal = true;
    this.id = 0;
    if (!!item) {
      this.id = item.id;
      this._categoryService.categoryController().getItem(this.id).subscribe(
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

  deleteCategory(id: number) {
    this._modal.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa bản ghi này',
      nzCancelText: 'Thoát',
      nzOkText: 'Xác nhận',
      nzOnOk: (result) => {
        this._categoryService.categoryController().delete(id).subscribe(
          (res: any) => {
            this.getCategory();
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
    if (!this.form.value?.parent_id) {
      this.form.patchValue({
        parent_id: 0,
      });
    }
    if (!!this.id) {
      this._categoryService.categoryController().update(this.id, this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getCategory();
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
      this._categoryService.categoryController().create(this.form?.value).subscribe(
        (res: any) => {
          this.handleCancel();
          this.getCategory();
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
    this.isVisible_CreateUpdateCategoryModal = false;
    this.form?.reset();
  }

  onChangePageIndex(index: number) {
    this.page.page = index;
  }

}
