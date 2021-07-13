import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DadosDoGrafico } from 'src/app/model/dadosdografico';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  dadosDoGrafico = new DadosDoGrafico();

  ngOnInit() {
    this.usuarioService.obterDadosDoGrafico().subscribe(data => {
       this.dadosDoGrafico = data;

      console.info(data);

       this.barChartLabels = this.dadosDoGrafico.nomes.split(',');

       var arraySalario = JSON.parse('[' + this.dadosDoGrafico.salarios + ']');

       this.barChartData = [{ data: arraySalario, label: 'Salario dos funcionarios'}];
    });
   }

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[];
  
  barChartType: ChartType = 'bar';
  
  barChartLegend = true;
  
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [{data: [], label: ''}];
}
