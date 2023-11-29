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
  MacrosPerDaysDTO,
  FitnessDataDTO,
  FitnessProgressDTO,
  MacrosPerWeekDTO,
  avgMacrosPerWeekDTO,
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
  fitnessData: FitnessDataDTO = new FitnessDataDTO();
  fitnessProgress: FitnessProgressDTO = new FitnessProgressDTO();
  option!: EChartsOption;
  avgMacros: avgMacrosPerWeekDTO = new avgMacrosPerWeekDTO();
  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getFitnessProgress();
    this.getFitnessData();
    this.getCaloriesPerWeekData();
  }

  private getFitnessProgress(): void {
    this.reportsService.getProgressWeight().subscribe(
      (data: FitnessProgressDTO) => {
        if (data && data.percentence != null) {
          this.fitnessProgress = {
            ...data,
            percentence: parseFloat(data.percentence.toFixed(0)),
          };
        }
      },
      (error) => {
        console.error('Error al obtener el progreso de fitness', error);
      }
    );
  }

  private getFitnessData(): void {
    this.reportsService.calcFitnessInfo().subscribe(
      (data: FitnessDataDTO) => {
        if (data) {
          this.fitnessData = {
            ...data,
            gender: data.gender === 'M' ? 'Masculino' : 'Femenino',
            targetDate: this.formatDate(data.targetDate),
          };
        }
      },
      (error) => {
        console.error('Error al obtener los datos de fitness', error);
      }
    );
  }

  private getCaloriesPerWeekData(): void {
    this.reportsService.getMacrosPerWeek().subscribe({
      next: (data: any) => {
        this.calcAvgMacros(data);
        this.option = {
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['Calorias', 'Proteinas', 'Carbohidratos', 'Grasas'],
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
              data: this.mapDayValuesToSeries(data.calories),
              markPoint: {
                data: this.createMarkPoints(data.calories),
              },
              markLine: {
                lineStyle: {
                  color: 'blue',
                  cap: 'round',
                },
                data: [{ type: 'average', name: 'Promedio' }],
              },
            },
            {
              name: 'Proteinas',
              type: 'bar',
              data: this.mapDayValuesToSeries(data.proteins),
              markPoint: {
                data: this.createMarkPoints(data.proteins),
              },
              markLine: {
                lineStyle: {
                  color: 'green',
                  cap: 'round',
                },
                data: [{ type: 'average', name: 'Promedio' }],
              },
            },
            {
              name: 'Carbohidratos',
              type: 'bar',
              data: this.mapDayValuesToSeries(data.carbohydrates),
              markPoint: {
                data: this.createMarkPoints(data.carbohydrates),
              },
              markLine: {
                lineStyle: {
                  color: 'yellow',
                  cap: 'round',
                },
                data: [{ type: 'average', name: 'Promedio' }],
              },
            },
            {
              name: 'Grasas',
              type: 'bar',
              data: this.mapDayValuesToSeries(data.fats),
              markPoint: {
                data: this.createMarkPoints(data.fats),
              },
              markLine: {
                lineStyle: {
                  color: 'red',
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

  private mapDayValuesToSeries(macrosPerDay: MacrosPerDaysDTO): number[] {
    return [
      macrosPerDay.domingo,
      macrosPerDay.lunes,
      macrosPerDay.martes,
      macrosPerDay.miercoles,
      macrosPerDay.jueves,
      macrosPerDay.viernes,
      macrosPerDay.sabado,
    ];
  }

  private createMarkPoints(data: MacrosPerDaysDTO): any[] {
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

  private calcAvgMacros(data: MacrosPerWeekDTO): void {
    this.avgMacros.avgCalories = this.calcAvgMacrosSpecificDay(data.calories);
    this.avgMacros.avgProteins = this.calcAvgMacrosSpecificDay(data.proteins);
    this.avgMacros.avgCarbohydrates = this.calcAvgMacrosSpecificDay(
      data.carbohydrates
    );
    this.avgMacros.avgFats = this.calcAvgMacrosSpecificDay(data.fats);
  }

  private calcAvgMacrosSpecificDay(data: MacrosPerDaysDTO): number {
    return parseFloat(
      (
        (data.domingo +
          data.lunes +
          data.martes +
          data.miercoles +
          data.jueves +
          data.viernes +
          data.sabado) /
        7
      ).toFixed(2)
    );
  }

  private formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'dd/MM/yyyy') || '';
  }
}
