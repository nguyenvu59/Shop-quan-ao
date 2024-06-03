import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { deepCopy, getObjectTruThy } from 'src/app/common/globalFC';
import { ReportService } from 'src/app/services/report.service';

const dayjs = require('dayjs')

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOptions: any = {};
  chartOptions2: any = {};
  chartOptions3: any = {};

  formFilter: any = {};

  constructor(
    private _reportService: ReportService,
  ) {

  }

  ngOnInit(): void {
    this.initFormFilter();
    this.getChartReport();
  }

  initFormFilter() {
    this.formFilter = {
      from_date: dayjs().format('YYYY-MM-DD'),
      to_date: dayjs().format('YYYY-MM-DD'),
    }
  }

  getChartReport() {
    let formFilter = deepCopy(this.formFilter);
    formFilter.from_date = dayjs(formFilter.from_date).format('YYYY-MM-DD');
    formFilter.to_date = dayjs(formFilter.to_date).format('YYYY-MM-DD');
    let chartOptions = this._reportService.reportController().orderbydate(getObjectTruThy(formFilter)).toPromise(),
      chartOptions2 = this._reportService.reportController().totalbydate(getObjectTruThy(formFilter)).toPromise(),
      chartOptions3 = this._reportService.reportController().productbydate(getObjectTruThy(formFilter)).toPromise();

    Promise.all([chartOptions, chartOptions2, chartOptions3]).then((res: any) => {
      this.chartOptions = {
        series: [
          {
            name: "Số lượng",
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Số lượng"
        },
        xaxis: {
          categories: []
        }
      };
      this.chartOptions2 = {
        series: [
          {
            name: "Doanh thu",
            data: []
          },
          {
            name: "Tiền nhập",
            data: []
          },
          {
            name: "Tiền bán",
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "VNĐ"
        },
        xaxis: {
          categories: []
        }
      };
      this.chartOptions3 = {
        series: [
          {
            name: "VNĐ",
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Số lượng"
        },
        xaxis: {
          categories: []
        }
      };
      // biểu đồ đơn hàng
      this.chartOptions.xaxis.categories = res[0].Data.map((obj: any) => dayjs(obj.date).format('DD/MM/YYYY'));
      this.chartOptions.series[0].data = res[0].Data.map((obj: any) => +obj.count);
      // biểu đồ doanh thu
      this.chartOptions2.xaxis.categories = res[1].Data.map((obj: any) => dayjs(obj.date).format('DD/MM/YYYY'));
      this.chartOptions2.series[0].data = res[1].Data.map((obj: any) => +obj.benefit);
      this.chartOptions2.series[1].data = res[1].Data.map((obj: any) => +obj.totalImportValue);
      this.chartOptions2.series[2].data = res[1].Data.map((obj: any) => +obj.totalSold);
      // biểu đồ sản phẩm
      this.chartOptions3.xaxis.categories = res[2].Data.map((obj: any) => obj.productName);
      this.chartOptions3.series[0].data = res[2].Data.map((obj: any) => +obj.quantitySold);
    })
      .catch((err) => {

      })
  }

  percentage(partialValue: number, totalValue: number) {
    return (100 * partialValue) / totalValue;
  }

}
