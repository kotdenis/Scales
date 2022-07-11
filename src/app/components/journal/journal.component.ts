import { Component, OnInit } from '@angular/core';
import { JournalService } from 'src/app/services/journal.service';
import { JournalDto } from 'src/app/models/journal';
import { JournalReady } from 'src/app/models/journalReady';
import { SearchModel } from 'src/app/models/searchModel';
import * as $ from 'jquery'

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.sass']
})
export class JournalComponent implements OnInit {

  name: string = ''
  number: string = ''
  cargo: string = ''
  weight: number = 0
  weighinDate: Date = new Date()
  time: string = ''
  date: string = '' 
  journalDto: JournalDto[] = [] 
  numeration: number = 0
  journalReady: JournalReady[] = []
  searchModel: SearchModel = {carPlate: '', dateOfWeighing: ''}
  plate: string = ''
  searchDto: JournalDto[] = []

  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6];
  page: number = 1;

  constructor(private journalService: JournalService) { }

  ngOnInit(): void { 
    this.getJournal();

    setTimeout(() => this.buildJournal(), 2000)
    //this.buildJournal();
  }

  getJournal() : void {
    this.journalService.getJournal().subscribe(data => this.journalDto = data)
  }

  searchInJournal() : void {
    let temp = $('#inputtext').val()?.toString()
    let temp2 = $('#inputdate').val()?.toString()
    
    this.journalReady = [];
    //$('#bodyid').empty();
    this.searchModel = {carPlate: temp!, dateOfWeighing: temp2!}
    this.journalService.searchInJournal(this.searchModel).subscribe(data => this.searchDto = data);
    
    setTimeout(() => {
      this.searchDto.map((item, index) => {
        this.journalReady.push({name: item.name, number: item.number, cargo: item.cargo, weight: item.weight,
        date: item.date, time: item.time, numeration: index + 1})
      })
    }, 2000)
  }

  buildJournal() : void {
    this.journalDto.map((item, index) => {
      this.journalReady.push({name: item.name, number: item.number, cargo: item.cargo, weight: item.weight,
      date: item.date, time: item.time, numeration: index + 1})
    })
  }

  onTableDataChange(event: any){
    this.page = event;
    this.buildJournal();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.buildJournal();
  }

}
