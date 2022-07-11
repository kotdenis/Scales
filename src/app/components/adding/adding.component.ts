import { Component, OnInit } from '@angular/core';
import { TransportDto } from 'src/app/models/transport';
import { Input } from '@angular/core';
import { TransportService } from 'src/app/services/transport.service';

import * as $ from 'jquery'

@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.sass']
})
export class AddingComponent implements OnInit { 

  name: string = ''
  public number: string = ''
  cargo: string = ''
  weight: number = 0
  axisNumber: number = 0
  isCreated: boolean = false
  transportDto: TransportDto = {id:0, axisNumber:0, name: '', number: '', cargo: '', weight: 0}

  constructor(private transportService: TransportService) { 
    
  }
  
  ngOnInit(): void {
    $('#labelhiddenone').hide();
    $('#labelhiddentwo').hide();
    $('#labelhiddenthree').hide();
    $('#labelhiddenfour').hide();
    $('#labelhiddenfive').hide();
  }

  saveNewTransportInfo() : void {
    if(!this.weight.valueOf()){
      $('#labelhiddenfive').show()
  }
  else{
    $('#labelhiddenfive').hide()
  }
  if(!$('#inputone').val()){
    $('#labelhiddenone').show();
  }
  else{
    $('#labelhiddenone').hide();
  }
  if(!$('#inputtwo').val()){
    $('#labelhiddentwo').show()
  }
  else{
    $('#labelhiddentwo').hide();
  }
  if(!$('#inputthree').val()){
    $('#labelhiddenthree').show()
  }
  else{
    $('#labelhiddenthree').hide()
  }
  if(!this.axisNumber.valueOf()){
    $('#labelhiddenfour').show()
  }
  else{
    $('#labelhiddenfour').hide()
  }
  let tempCargo = $('#inputthree').val()?.toString()
  let tempName = $('#inputone').val()?.toString()
  let tempNumber = $('#inputtwo').val()?.toString()
  this.transportDto = {name: tempName!, number: tempNumber!, cargo: tempCargo!, axisNumber: this.axisNumber, 
    weight:this.weight, id: 0}
  if(this.weight.valueOf() && $('#inputone').val() && $('#inputtwo').val() && 
  $('#inputthree').val() && this.axisNumber.valueOf()){
    this.transportService.createNewTransport(this.transportDto).subscribe(data => this.isCreated = data);
    $('#inputone').val(''); $('#inputtwo').val(''); $('#inputthree').val(''); $('#inputfour').val(''); 
    $('#inputfive').val('');
  }
  }
}
