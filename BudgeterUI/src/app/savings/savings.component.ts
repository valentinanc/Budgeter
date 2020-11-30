import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { SharedService } from '../services/service.component';
export class SavingsList{
  id:number;
  Name:string = '';
  Price: number;
  Date:string;
}
@Component({
  selector: 'savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {

  // savings table
  editField = ""

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
  notiMessage: string;
  Price: string;
  savingList: SavingsList[] = [];
  items : [];
  workTodo: string;
  inEditMode: boolean = false;
  currentTodoId: number;
  currentTodoStateWorkTodo: string;
  currentTodoStateisCompleted : boolean = false;
  uid: string;
  guid: string;
  userProfileId: string;
  serviceErrors:any = {};
  iterableDiffer: any;
  differ: any;
  clickEventsubscription:Subscription;
  previouslySet = false;
  // { id: 1, date: '11/01/2020', name: "Rent", price: '1500'},
  savingListrow: Array<any> = [];
  budgetId:string;
  totalSaving:number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService) {
    
    this.uid = this.route.url["value"][1]["path"];
    this.totalSaving = 0;
    console.log("this is the uid", this.uid)
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
        this.userProfileId = data.userProfileId;
        console.log(this.userProfileId)
        this.http.get('/api/budget/getBudgetId/' + this.userProfileId).subscribe((data:any) => {
          this.budgetId = data
          console.log("This is the budget id", this.budgetId)
          this.http.get('/api/saving/' + this.budgetId).subscribe((data:any) => {
            this.savingListrow.length = 0
            this.savingList  = []
            for(var i = 0; i < data.length; i++) {
              var obj = data[i];
              this.savingList.push({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price });
              console.log(this.savingList)
              this.savingListrow = this.savingList
              console.log("this is the savingListrow list" , this.savingListrow)
          }
          }, error => {
              console.log("There was an error displaying the financial goals", error);
          });
        }, error => {
            console.log("There was an error displaying the financial goals", error);
        });
        
      }, error => {
          console.log("There was an error retrieving the user profile id", error);
      });
      this.previouslySet = true;
    })
  }

  ngOnInit(): void {
    this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
      console.log("datset value: "+this.data.datasets[-1])

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
      this.notiMessage ="On average, you saved $"+data.userProfile.MSavings+" per month.";
    });
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.savingListrow[id][property] = editField;
  }

  remove(id: any) {
    this.savingListrow.splice(id, 1);
  }

  add() {
      const person = { id: 6, date: '2020/11/09', name: '', price: ''}
      this.savingListrow.unshift(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  dostuff(){
    
  }

}
