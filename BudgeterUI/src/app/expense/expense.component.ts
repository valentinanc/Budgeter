import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule, Label } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { SharedService } from '../services/service.component';

export class ExpenseList{
  id:number;
  Name:string = '';
  Price: number;
  Date:string;
}

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {

  // expense table
  editField = ""
  
  // end expense table

  // expense overview
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
  // end expense overview

  
  // expense breakdown
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
  // end expense breakdown
  notiMessage: string;
  Price: string;
  expenseList: ExpenseList[] = [];
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
  personList: Array<any> = [];
  budgetId:string;
  totalExpense:number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private sharedService:SharedService) {
    this.uid = this.route.url["value"][1]["path"];
    this.totalExpense = 0;
    console.log("this is the uid", this.uid)
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
        this.userProfileId = data.userProfileId;
        console.log(this.userProfileId)
        this.http.get('/api/budget/getBudgetId/' + this.userProfileId).subscribe((data:any) => {
          this.budgetId = data
          console.log("This is the budget id", this.budgetId)
          this.http.get('/api/expense/' + this.budgetId).subscribe((data:any) => {
            this.personList.length = 0
            this.expenseList  = []
            for(var i = 0; i < data.length; i++) {
              var obj = data[i];
              this.expenseList.push({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price, });
              console.log(this.expenseList)
              this.personList = this.expenseList
              console.log(this.personList)
          }
            console.log("this is the data" , data)
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
              if (pair[0].split(",")[1] == 'true'){
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

  getRandomColor2() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  ngOnInit(): void {
    this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
      console.log("datset value: "+this.data.datasets[-1])

      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Monthly Expenses',
                backgroundColor: '#F53B28',
                borderColor: '#D53B28',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, data.userProfile.MExpenses]
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
              max: data.userProfile.MBudget
            }
          }]
        }
      };
      this.notiMessage ="On average, you spend $"+data.userProfile.MExpenses+" per month.";
    });
    //Chage is here below
    this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
      this.userProfileId = data.userProfileId;
      this.http.get('/api/budget/getBudgetId/' + this.userProfileId).subscribe((data:any) => {
        this.budgetId = data
        console.log("This is the budget id", this.budgetId)
        this.http.get('/api/expense/'+this.budgetId).subscribe((data:any) => {
          for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            this.totalExpense = this.totalExpense + obj.Price;
        }
        console.log("This is the total exp", this.totalExpense)
        //Added below post
        let dataExpense: any = Object.assign({guid: this.guid}, {id: this.uid, expenses: this.totalExpense});

        this.http.post('/api/user-profile/total-expenses/', dataExpense).subscribe((dataExpense:any) => {
            
          if (dataExpense.userProfile == null){
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

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  deleteExpense(person:any, index): void {
   console.log(person);
   console.log(index);
  
  this.personList.splice(index,1)
  let data: any = Object.assign({id:person.id});
  console.log("Person id: " + data.id);
  this.http.delete('/api/expense/' + data.id).subscribe((data:any) => {
    }, error =>
  {
    this.serviceErrors = error.error.error;
  });
  // this._todoService.deleteTodo(todo, index);
  
}

  
  add() {
      //retrieve last id and plus 1
      //date will be current date (look at budget table)
      const person = { id: 6, date: '2020/11/09', name: '', price: ''}
      this.personList.unshift(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  dostuff(){
    
  }

}
