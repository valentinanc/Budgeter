import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

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
    labels: [],
    datasets: [
        {
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
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
  uid: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { 
    this.uid = this.route.url["value"][1]["path"];
  }

  ngOnInit(): void {
    this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
      console.log("datset value: "+this.data.datasets[-1])
      // Not best solution, but works.
      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Monthly Savings',
                backgroundColor: '#51C767',
                borderColor: '#51A767',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, data.userProfile.MSavings]
            }
        ]
      }
    });
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
      this.personList.unshift(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  dostuff(){
    
  }

}
