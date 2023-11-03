import { Component,ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

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
})
export class FitnessReportsComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private globalService: GlobalService) 
  {
    this.chartOptions = {
      series: [
        {
          name: "Inflation",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 8.7]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      //posicion de los numeros de porcentaje
      plotOptions: {
        bar: {
          borderRadius: 5,
          dataLabels: {
            position: "top", // top, center, bottom
          }
        }
      },
       //distancia de los numeros de porcentaje de la barra
       //colore los numeros de porcentaje
       //tamaño de fuente de los numeros de porcentaje
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + "%";
        },
        //distancia
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      //letras de arriba del grafico 
      xaxis: {
        categories: [
          "Lun",
          "Mar",
          "Mie",
          "Jue",
          "Vie",
          "Sab",
          "Dom",
        ],
        position: "top",
        labels: {
          offsetY: 160,
          
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#BED1E6",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.6
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: 40
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val + "%";
          }
        }
      },
    };
  }
  ngOnInit(): void {
    Promise.resolve().then(() => {
      this.globalService.setTitle('Reportes Fitness');
    });
  }
}
