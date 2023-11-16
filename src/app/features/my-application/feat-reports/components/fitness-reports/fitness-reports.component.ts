import { Component,ViewChild, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
//IMPORTACION progress bar
import { MessageService } from 'primeng/api';
//import echart for graphig
import { EChartsOption } from 'echarts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-fitness-reports',
  templateUrl: './fitness-reports.component.html',
  styleUrls: ['./fitness-reports.component.scss'],
  //message for progress bar completed
  providers: [MessageService]
})

//SE AGREGÓ EL EXTEND
export class FitnessReportsComponent implements OnInit {

   //progress bar
    value: number = 0; 
    title='progress-bar';
    //echart 
    title1 = 'Angular charts';
  constructor(private messageService: MessageService) {}

  //echart options 
  option: EChartsOption={
    //title
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      //legend is used to show the name of the graph
      data: ['calories']
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        // prettier-ignore
        data: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'calories',
        type: 'bar',
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6
        ],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        //promedio de los datos
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      
    ]
  };
  //progress bar
  ngOnInit(): void {
  //progress bar
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
          this.value = 100;
          this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
          clearInterval(interval);
      }
  }, 2000);
  }  

}
