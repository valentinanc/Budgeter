import { Component, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditBudgetComponent } from '../edit-budget/edit-budget.component';
import { DatePipe } from '@angular/common'
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/service.component';
import { Subscription } from 'rxjs';
import { AddItemsComponent } from '../add-items/add-items.component';

export class BudgetList{
  id:number;
  Name:string = '';
  Price: number;
  Date:Date;
  Category:string;

}
export class SavingsList{
  id:number;
  Name:string = '';
  Price: number;
  Date:string;
  Category:string;
}

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  providers: [DatePipe]
})
export class BudgetComponent implements OnInit {

  // budget table
  editField = ""

  // end budget table

  // budget overview
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
  // end budget overview

  
  // budget breakdown
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
  // end budget breakdown
  date = new Date();
  uid: string;
  notiMessage: string;
  stringDate: string;
  personList: Array<any> = [ ];
  budgetId:string;
  savingListrow: Array<any> = [];
  savingList: SavingsList[] = [];
  clickEventsubscription: Subscription;
  
  constructor(private dialog: MatDialog, private datePipe: DatePipe, private http: HttpClient, private router: Router, private route: ActivatedRoute,  private sharedService: SharedService) {
    this.stringDate = this.datePipe.transform(this.date, 'MM-dd-yyyy');
    this.uid = this.route.url["value"][1]["path"];
    console.log(this.uid);
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
        var monthlyRemaining = data.userProfile.MBudget-data.userProfile.MSavings-data.userProfile.MExpenses;
        let budgetBreakdownLabels = []
        let budgetBreakdownChartData = []
        let budgetBreakdownBc = []
        let budgetBreakdownHbc = []
        if (monthlyRemaining> 0){
          budgetBreakdownChartData.push(monthlyRemaining)
          budgetBreakdownLabels.push('Remaining')
          budgetBreakdownBc.push('#ffc107')
          budgetBreakdownHbc.push('#ffc107')
        }
        //savings 
        this.http.get('/api/budget/getBudgetId/' + this.uid).subscribe((data:any) => {
          this.budgetId = data
          console.log("This is the budget id", this.budgetId)
          this.http.get('/api/saving/' + this.budgetId).subscribe((data:any) => {
            this.savingListrow.length = 0
            this.savingList  = []
            for(var i = 0; i < data.length; i++) {
              var obj = data[i];
              this.savingList.unshift({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price,Category:"Savings" });
              console.log(this.savingList)
              this.savingListrow = this.savingList
              console.log("this is the savingListrow list" , this.savingListrow)
            }
            this.http.get('/api/expense/' + this.budgetId).subscribe((data:any) => {
              for(var i = 0; i < data.length; i++) {
                var obj = data[i];
                this.savingList.unshift({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price,Category:"Expense" });
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
            console.log("There was an error displaying the financial goals", error);
        });

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
              let value = pair[1]
              budgetBreakdownChartData.push(value)
              budgetBreakdownLabels.push(pair[0].split(",")[0])
              var randomColor = this.getRandomColor2()
              budgetBreakdownBc.push(randomColor)
              budgetBreakdownHbc.push(randomColor)
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
      })
      this.ngOnInit();
    })
  }
  breakpoint: number;
  
  ngOnInit() {
    this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
      console.log("datset value: "+this.data.datasets[-1])
      // Not best solution, but works.
      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Monthly Budget',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, data.userProfile.MBudget]
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
              suggestedMax: data.userProfile.MBudget 
            }
          }]
        }
      };
      var monthlyRemaining = data.userProfile.MBudget-data.userProfile.MSavings-data.userProfile.MExpenses;
      let budgetBreakdownLabels = []
      let budgetBreakdownChartData = []
      let budgetBreakdownBc = []
      let budgetBreakdownHbc = []
      if (monthlyRemaining> 0){
        budgetBreakdownChartData.push(monthlyRemaining)
        budgetBreakdownLabels.push('Remaining')
        budgetBreakdownBc.push('#ffc107')
        budgetBreakdownHbc.push('#ffc107')
      }
      this.http.get('/api/budget/getBudgetId/' + data.userProfile.id).subscribe((data:any) => {
        this.budgetId = data
        console.log("This is the budget id", this.budgetId)
        this.http.get('/api/saving/' + this.budgetId).subscribe((data:any) => {
          this.savingListrow.length = 0
          this.savingList  = []
          for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            this.savingList.unshift({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price,Category:"Savings" });
            console.log(this.savingList)
            this.savingListrow = this.savingList
            console.log("this is the savingListrow list" , this.savingListrow)
          }
          this.http.get('/api/expense/' + this.budgetId).subscribe((data:any) => {
            for(var i = 0; i < data.length; i++) {
              var obj = data[i];
              this.savingList.unshift({id: obj.id,Date:obj.createdAt.slice(0,10),Name: obj.Name, Price: obj.Price,Category:"Expense"});
              console.log(this.savingList)
              this.savingListrow = this.savingList
              console.log("this is the savingListrow list" , this.savingListrow)
            }
            // const sortedActivities =  this.savingList.sort((a, b) => b.Date - a.Date)
            // console.log("sorted array", sortedActivities)
            this.savingList.sort(function(a, b) {
              var dateA = new Date(a.Date)
              var dateB = new Date(b.Date);
              return dateB.valueOf() - dateA.valueOf();
             });
             this.savingListrow = this.savingList
          }, error => {
              console.log("There was an error displaying the financial goals", error);
          });

        }, error => {
            console.log("There was an error displaying the financial goals", error);
        });
      }, error => {
          console.log("There was an error displaying the financial goals", error);
      });

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
            let value = pair[1]
            budgetBreakdownChartData.push(value)
            budgetBreakdownLabels.push(pair[0].split(",")[0])
            var randomColor = this.getRandomColor2()
            budgetBreakdownBc.push(randomColor)
            budgetBreakdownHbc.push(randomColor)
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
      this.notiMessage ="On average, your total monthly budget is $"+data.userProfile.MBudget+".";
      

    });
    console.log("datset value 2: "+this.data.datasets[-1])
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;

  }

  getRandomColor2() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while(length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  // remove(id: any) {
  //   this.savingListrow.splice(id, 1);
    
  // }
  remove(budget:any,index): void {
    console.log(budget);
    console.log(index);
    console.log("THis is the category", budget.Category)
    if(budget.Category == "Expense"){
      this.savingListrow.splice(index,1)
     let data: any = Object.assign({id:budget.id});
     console.log("Person id: " + data.id);
    this.http.delete('/api/expense/' + data.id).subscribe((data:any) => {
      }, error =>
    {
    });
    }
    else if(budget.Category == "Savings"){
      this.savingListrow.splice(index,1)
     let data: any = Object.assign({id:budget.id});
     console.log("Person id: " + data.id);
    this.http.delete('/api/saving/' + data.id).subscribe((data:any) => {
      }, error =>
    {
    });
    
    }
  }
   
  
   
 

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditBudgetComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openAddItem(): void {
    const dialogRef = this.dialog.open(AddItemsComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
