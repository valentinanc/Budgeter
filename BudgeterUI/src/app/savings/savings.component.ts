import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { SharedService } from '../services/service.component';
import { AddItemsComponent } from '../add-items/add-items.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  options = {}
  // end savings overview

  
  // savings breakdown
  public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [{data : []}]
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [
    {
      backgroundColor: [],
      hoverBackgroundColor: [],
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

  constructor(private http: HttpClient, private route: ActivatedRoute,private dialog: MatDialog, private sharedService:SharedService) {
    
    this.uid = this.route.url["value"][1]["path"];
    this.totalSaving = 0;
    console.log("this is the uid", this.uid)
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.http.get('/api/user-profile/' + this.uid + '/info').subscribe((data:any) => {
        this.userProfileId = data.userProfile.id;
        console.log(this.userProfileId)
        this.http.get('/api/budget/getBudgetId/' + this.userProfileId).subscribe((data:any) => {
          this.budgetId = data
          console.log("This is the budget id", this.budgetId)
          this.http.get('/api/saving/' + this.budgetId).subscribe((data:any) => {
            this.savingListrow.length = 0
            this.savingList  = []
            for(var i = 0; i < data.length; i++) {
              var obj = data[i];
              this.savingList.unshift({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price });
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
        let budgetBreakdownLabels = []
        let budgetBreakdownChartData = []
        let budgetBreakdownBc = []
        let budgetBreakdownHbc = []
        this.http.get('/api/budget/getBudgetBreakdownCategories/' + this.uid).subscribe((data:any) => {
          var hash  = new Map();
          for (var item of data){
            var isExpense = false;
            var value = 0;
            if (item.expenseId != null){
              isExpense = true;
              value = item.price
            } else{
              value = item.price
            }
            var lookupKey = item.Name + "," + isExpense
            if (!hash.has(lookupKey)){
              hash.set(lookupKey, value); 
            } else {
              hash.set(lookupKey, hash.get(lookupKey) + value);
            }
          }
          for (var pair of hash){
            if (pair[0].split(",")[1] == 'false'){
              let value = pair[1]
              budgetBreakdownChartData.push(value)
              budgetBreakdownLabels.push(pair[0].split(",")[0])
              var randomColor = this.getRandomColor2()
              budgetBreakdownBc.push(randomColor)
              budgetBreakdownHbc.push(randomColor)
            }
          }
          this.chartDatasets = [
            { data: budgetBreakdownChartData}
          ];
          this.chartLabels = budgetBreakdownLabels;
          this.chartColors = [
            {
              backgroundColor: budgetBreakdownBc,
              hoverBackgroundColor: budgetBreakdownHbc,
              borderWidth: 2,
            }
          ];
      }, error => {
          console.log("error getting categories for budget breakdown", error);
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
      this.options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              suggestedMax: data.userProfile.MSavings * 2
            }
          }]
        }
      };
      this.notiMessage ="On average, you saved $"+data.userProfile.MSavings+" per month.";
    });

    this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
      this.userProfileId = data.userProfileId;
      this.http.get('/api/budget/getBudgetId/' + this.userProfileId).subscribe((data:any) => {
        this.budgetId = data
        console.log("This is the budget id", this.budgetId)
        this.http.get('/api/saving/'+this.budgetId).subscribe((data:any) => {
          for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            this.totalSaving = this.totalSaving + obj.Price;
        }
        console.log("This is the total exp", this.totalSaving)
        //Added below post
        let dataSaving: any = Object.assign({guid: this.guid}, {id: this.uid, savings: this.totalSaving});

        this.http.post('/api/user-profile/total-savings/', dataSaving).subscribe((dataSaving:any) => {
            
          if (dataSaving.userProfile == null){
            alert("Something went wrong.")
          }
        });
        }, error => {
            console.log("There was an error displaying the financial goals", error);
        });
      }, error => {
          console.log("There was an error displaying the financial goals", error);
      });
      
    }, error => {
        console.log("There was an error retrieving the user profile id", error);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemsComponent, {data:{green:true}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getRandomColor2() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.savingListrow[id][property] = editField;
  }

  deleteSaving(person:any, index): void {
    console.log(person);
    console.log(index);
   
   this.savingList.splice(index,1)
   let data: any = Object.assign({id:person.id});
   console.log("Person id: " + data.id);
   this.http.delete('/api/saving/' + data.id).subscribe((data:any) => {
     }, error =>
   {
     this.serviceErrors = error.error.error;
   });
   // this._todoService.deleteTodo(todo, index);
   
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
