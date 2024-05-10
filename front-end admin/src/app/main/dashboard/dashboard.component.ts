import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
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

  constructor(
    private _reportService: ReportService,
  ) {
  
  }

  ngOnInit(): void {

    let chartOptions = this._reportService.reportController().orderbydate().toPromise(),
     chartOptions2 = this._reportService.reportController().totalbydate().toPromise(),
     chartOptions3 = this._reportService.reportController().productbydate().toPromise();

    Promise.all([chartOptions,chartOptions2,chartOptions3]).then((res:any) => {
    console.log('res :', res);
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
          text: "Đơn hàng"
        },
        xaxis: {
          categories: []
        }
      };
      this.chartOptions2 = {
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
          text: "Doanh thu"
        },
        xaxis: {
          categories: []
        }
      };
      this.chartOptions3 = {
        series: [44, 55, 13, 43, 22],
        chart: {
          width: 380,
          type: "pie"
        },
        title: {
          text: "Sản phẩm"
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      this.chartOptions.xaxis.categories = res[0].Data.map((obj:any)=>dayjs(obj.date).format('DD/MM/YYYY'));
      this.chartOptions.series[0].data = res[0].Data.map((obj:any)=> +obj.count);   
      this.chartOptions2.xaxis.categories = res[1].Data.map((obj:any)=>dayjs(obj.date).format('DD/MM/YYYY'));
      this.chartOptions2.series[0].data = res[1].Data.map((obj:any)=> +obj.total);     
    }) 
    .catch((err) => {

    })
      
  }

}
