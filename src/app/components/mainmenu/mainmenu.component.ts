import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; 
import { TransportDto } from 'src/app/models/transport';
import { TransportService } from 'src/app/services/transport.service';
import { JournalDto } from 'src/app/models/journal'; 
import { TransportForDay } from 'src/app/models/transportForDay';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import * as $ from 'jquery'

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.sass']
})
export class MainmenuComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined; 
  trans?: TransportDto 
  name: string = ''
  number: string = ''
  cargo: string = ''
  weight: number = 0
  axisNumber: number = 0
  id?: number 
  weightToShow: number = 0
  separateWeight: number [] = []
  axisArray: number [] = []
  labelsArray: number[] = [] 
  transportForDay: TransportForDay[] = []
  journalDto: JournalDto[] = []

  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6];
  page: number = 1;
  
  constructor(private transportService: TransportService) { }

  ngOnInit(): void {
    
  } 

  onTableDataChange(event: any){
    this.page = event;
    this.showForDay();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showForDay();
  }

  getTransport() : void {
    this.transportService.getTransport().subscribe(data => this.trans = {
      name: data.name,
      axisNumber: data.axisNumber,
      cargo: data.cargo,
      number: data.number,
      weight: data.weight,
      id: data.id
    })
  }

  getTransport2()  : void {
    this.transportService.getTransport().subscribe(data => {this.name = data.name, this.number = data.number, 
    this.cargo = data.cargo, this.axisNumber = data.axisNumber, this.weight = data.weight, this.id = data.id}) 
    this.weightToShow = 0
  }

  saveTransport() : void {
    let journalDtos: JournalDto = {weighinDate: new Date(), weight: this.weight, time: '00:00', number: this.number, 
    name: this.name, cargo: this.cargo, date: '' }
    this.transportService.saveweghing(journalDtos).subscribe(data => this.journalDto = data)
    $('#formGroupExampleInput').val('');
    $('#formGroupExampleInput2').val('');
    $('#formGroupExampleInput3').val('');
    $('#formGroupExampleInput4').val('');
    $('#formGroupExampleInput').css('background-color', '#008080'); 
    $(".buton1").removeAttr("disabled");
    $('#modalsave').show();
  }

  showForDay(): void {
    this.journalDto.map((item, index) => {
      this.transportForDay.push({weight: item.weight, number: item.number, time: item.time})
    })
  }

  generateWeight() : void{
    if($('#formGroupExampleInput2').val()){
      $(".buton1").attr("disabled", "true")
      $("#butonsave").attr("disabled", "true")
    }
    let temp: number = 0 
    this.weightToShow = 0
    if(this.weight > 0){
    temp = this.weight / 10 
    let timerId = setInterval(() => { 
        this.weightToShow += temp;
        if(this.weightToShow === this.weight){
          temp = 0;
          this.weightToShow = this.weight; 
          $('#formGroupExampleInput').css('background-color', '#008000');
          clearInterval(timerId);
          $("#butonsave").removeAttr("disabled");
        }
    }, 1000)
  }
  for(var i = 0; i <= this.axisNumber; i++){
    this.labelsArray.push(i);
  }
  this.generateAxisNumberAndLoads();
  //setTimeout(() => this.generateAxisNumberAndLoads(), 8000)
  }

  generateAxisNumberAndLoads() : void {
    let temp: number = 0 
    let sepWeight: number = 0
    this.separateWeight = [];
    this.axisArray = [];
   
    for(var i = 0; i <= this.axisNumber; i++){
      temp = i * 500000
      this.axisArray.push(temp)
    }
    sepWeight = Math.round(this.weight / this.axisNumber); 
    for(var i = 0; i <= this.axisNumber; i++){
      this.separateWeight.push(sepWeight);
    }
    this.barChartData = {
      //labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
      labels: this.labelsArray,
      datasets: [
        // { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
        // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
        {data: this.axisArray, label: 'Axis'},
        {data: this.separateWeight, label: 'Axis loads'}
      ]
    };
  }

  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 5000,
        max: 100000
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {labels: [], datasets: []}

  // public barChartData: ChartData<'bar'> = {
  //   //labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
  //   labels: this.labelsArray,
  //   datasets: [
  //     // { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
  //     // { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
  //     {data: this.axisArray, label: 'Axis'},
  //     {data: this.separateWeight, label: 'Axis loads'}
  //   ]
  // };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];

    this.chart?.update();
  }

  closeModal() : void{
    $('#modalsave').hide()
  }

}
