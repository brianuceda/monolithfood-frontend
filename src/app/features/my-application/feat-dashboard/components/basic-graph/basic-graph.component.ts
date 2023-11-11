import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartOptions } from '../../pages/dashboard/dashboard.component';

@Component({
  selector: 'app-basic-graph',
  templateUrl: './basic-graph.component.html',
  styleUrls: ['./basic-graph.component.scss'],
})
export class BasicGraphComponent implements OnInit, OnChanges {
  // Inputs obligatorios
  @Input() nutrientName?: string;
  @Input() consumed?: number;
  @Input() dailyIntake?: number;
  // Atributos calculados a partir de los inputs
  public percentage: number = 0;
  public color: string = '';
  public chartOptions?: ChartOptions;

  ngOnInit(): void {
    this.configureGraph();
  }

  ngOnChanges(): void {
    this.configureGraph();
  }

  configureGraph(): void {
    this.percentage = (this.consumed! / this.dailyIntake!) * 100 || 0;
    this.color = this.getColorBasedOnPercentage(this.percentage);
    this.chartOptions = this.getChartOptions();
  }

  // Obtiene el color en base al porcentaje
  getColorBasedOnPercentage(percentage: number): string {
    if (percentage <= 10) return '#EC6C6C'; // Rojo más oscuro
    else if (percentage <= 30) return '#EC956C'; // Rojo-naranja
    else if (percentage <= 50) return '#E6ECA5'; // Amarillo-verde
    else if (percentage <= 70) return '#96DD99'; // Verde claro
    else if (percentage <= 150) return '#6CECAF'; // Verde-azul
    else if (percentage <= 160) return '#96DD99'; // Verde claro
    else if (percentage <= 170) return '#E6ECA5'; // Amarillo-verde
    else if (percentage <= 180) return '#EC956C'; // Rojo-naranja
    else if (percentage <= 200) return '#EC6C6C'; // Rojo oscuro
    else return '#EC6C6C'; // Rojo oscuro
  }

  // Configuracion del grafico: https://apexcharts.com/docs/options/plotoptions/radialbar/
  getChartOptions(): ChartOptions {
    return {
      series: [this.percentage],
      chart: {
        height: 250,
        type: 'radialBar',
        animations: {
          enabled: true,
          easing: 'easeinout', // linear, easeout, easein, easeinout
          speed: 600, // Duración de la animación en ms
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            size: '65%',
            background: 'transparent',
          },
          track: {
            show: true,
            strokeWidth: '100%',
            background: 'rgba(253, 253, 253, 0.25)',
          },
          dataLabels: {
            value: {
              show: true,
              color: this.color,
              fontWeight: 400,
              fontSize: '15px',
              formatter: () => `${Math.round(this.percentage)}%`,
              offsetY: -20,
            },
            name: {
              show: true,
              color: '#f3f3f3',
              fontWeight: 400,
              fontSize: '15px',
              offsetY: 20,
            },
          },
        },
      },
      labels: [
        `${Math.round(this.consumed!)} / ${Math.round(this.dailyIntake!)} g.`,
      ],
    };
  }
}
