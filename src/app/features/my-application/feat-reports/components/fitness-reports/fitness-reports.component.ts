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
  CaloriesPerDayDTO,
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
  option!: EChartsOption;
  avgCalories!: number;
  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getFitnessProgress();
    this.getFitnessData();
    this.getCaloriesPerDayData();
  }

  private getFitnessProgress(): void {
    this.reportsService.getProgressWeight().subscribe((data: any) => {
      this.fitnessProgress = data;
      this.fitnessProgress.percentence = parseFloat(
        this.fitnessProgress.percentence.toFixed(0)
      );
    });
  }

  private getFitnessData(): void {
    this.reportsService.calcFitnessInfo().subscribe((data: any) => {
      this.fitnessData = data;
      this.setFitnessData();
    });
  }

  setFitnessData(): void {
    if ((this.fitnessData.gender = 'M')) {
      this.fitnessData.gender = 'Masculino';
    } else {
      this.fitnessData.gender = 'Femenino';
    }
    this.fitnessData.targetDate = this.formatDate(this.fitnessData.targetDate);
  }

  private getCaloriesPerDayData(): void {
    this.reportsService.getCaloriesPerDay().subscribe({
      next: (data: any) => {
        this.calcAvgCalories(data);
        this.roundValues(data);
        let markPoints = this.createMarkPoints(data);

        this.option = {
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
              data: [
                data.domingo,
                data.lunes,
                data.martes,
                data.miercoles,
                data.jueves,
                data.viernes,
                data.sabado,
              ],
              markPoint: {
                data: markPoints,
              },
              markLine: {
                lineStyle: {
                  color: 'yellow',
                  cap: 'round',
                },
                data: [{ type: 'average', name: 'Promedio' }],
              },
            },
          ],
        };
      },
      error: (error) => {
        console.error('Error al obtener los datos de calorias por día', error);
      },
    });
  }

  private createMarkPoints(data: CaloriesPerDayDTO): any[] {
    return [
      { type: 'max', name: 'Max' },
      { type: 'min', name: 'Min' },
      { value: data.domingo, name: 'Dom', xAxis: 0, yAxis: data.domingo },
      { value: data.lunes, name: 'Lun', xAxis: 1, yAxis: data.lunes },
      { value: data.martes, name: 'Mar', xAxis: 2, yAxis: data.martes },
      { value: data.miercoles, name: 'Mier', xAxis: 3, yAxis: data.miercoles },
      { value: data.jueves, name: 'Jue', xAxis: 4, yAxis: data.jueves },
      { value: data.viernes, name: 'Vie', xAxis: 5, yAxis: data.viernes },
      { value: data.sabado, name: 'Sab', xAxis: 6, yAxis: data.sabado },
    ];
  }

  private calcAvgCalories(cpd: CaloriesPerDayDTO): void {
    this.avgCalories = parseFloat(
      (
        (cpd.domingo +
          cpd.lunes +
          cpd.martes +
          cpd.miercoles +
          cpd.jueves +
          cpd.viernes +
          cpd.sabado) /
        7
      ).toFixed(2)
    );
  }

  private roundValues(cpd: CaloriesPerDayDTO): void {
    cpd.domingo = parseFloat(cpd.domingo.toFixed(2));
    cpd.lunes = parseFloat(cpd.lunes.toFixed(2));
    cpd.martes = parseFloat(cpd.martes.toFixed(2));
    cpd.miercoles = parseFloat(cpd.miercoles.toFixed(2));
    cpd.jueves = parseFloat(cpd.jueves.toFixed(2));
    cpd.viernes = parseFloat(cpd.viernes.toFixed(2));
    cpd.sabado = parseFloat(cpd.sabado.toFixed(2));
  }

  private formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || '';
  }
}
