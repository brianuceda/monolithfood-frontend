import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';
import { MessageService } from 'primeng/api';
import { EChartsOption } from 'echarts';
import { ReportsService } from '../../services/reports.service';
import {
  FitnessDataDTO,
  FitnessProgressDTO,
} from '../../interfaces/FitnessDataDTO';
import { DatePipe } from '@angular/common';

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
  providers: [MessageService],
})
export class FitnessReportsComponent {
  fitnessData!: FitnessDataDTO;
  fitnessProgress!: FitnessProgressDTO;
  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getFitnessProgress();
    this.getFitnessData();
  }

  private getFitnessProgress(): void {
    this.reportsService.getProgressWeight().subscribe(
      (data: any) => {
        this.fitnessProgress = data;
        this.fitnessProgress.percentence = parseFloat(
          this.fitnessProgress.percentence.toFixed(0)
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getFitnessData(): void {
    this.reportsService.calcFitnessInfo().subscribe(
      (data: any) => {
        this.fitnessData = data;
        this.setFitnessData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setFitnessData(): void {
    if ((this.fitnessData.gender = 'M')) {
      this.fitnessData.gender = 'Masculino';
    } else {
      this.fitnessData.gender = 'Femenino';
    }
    this.fitnessData.targetDate = this.formatDate(this.fitnessData.targetDate);
  }

  private formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || '';
  }

  option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Calorias'],
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Calorias',
        type: 'bar',
        data: [2782.0, 1929.9, 2755.0, 2231.2, 2252.6, 1856.7, 2325.6],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' },
          ],
        },
        //promedio de los datos
        markLine: {
          data: [{ type: 'average', name: 'Promedio' }],
        },
      },
    ],
  };
}
