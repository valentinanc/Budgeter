import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {

  // savings table
  editField = ""
  personList: Array<any> = [
    { id: 4, date: '11/04/2020', name: "Tesla Stonks", price: '500'},
  ];
  // end savings table

  // savings overview
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
    datasets: [
        {
            label: 'Total Monthly Savings',
            backgroundColor: '#51C767',
            borderColor: '#51A767',
            data: [2603, 3180, 3001, 2750, 3499, 3700, 3400, 3800, 2800, 3400, 500]
        }
    ]
  }
  options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 7000
        }
      }]
    }
  };
  // end savings overview

  
  // savings breakdown
  public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [
    { data: [500], label: 'My First dataset' }
  ];
  public chartLabels: Array<any> = ['Tesla Stonks'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#51C767'],
      hoverBackgroundColor: ['#50B367'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true,
    cutoutPercentage: 75
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  // end savings breakdown

  constructor() { }

  ngOnInit(): void {

  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.personList.splice(id, 1);
  }

  add() {
      const person = { id: 6, date: '2020/11/09', name: '', price: ''}
      this.personList.push(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  dostuff(){
    
  }

}
