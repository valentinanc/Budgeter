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


@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();

  //bootstarap
  editField: string;
  personList: Array<any> = [
    { id: 1, date: 'Aurelia Vega', name: 30, price: 'Deepends'},
    { id: 2, date: 'Guerra Cortez', name: 45, price: 'Insectus'},
    { id: 3, date: 'Guadalupe House', name: 26, price: 'Isotronic'},
    { id: 4, date: 'Aurelia Vega', name: 30, price: 'Deepends'},
    { id: 5, date: 'Elisa Gallagher', name: 31, price: 'Portica'},
  ];
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
}

  //doughnut

  public chartType: string = 'doughnut';

  public chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];


  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  //end bootstrap

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Download', 'Store', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor() { }

  ngOnInit(): void {
    const ELEMENT_DATA: any[] = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
      { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
      { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    ];
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  update(){

  }

  // bootstrap
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.personList.splice(id, 1);
  }

  add() {
      const person = { id: 6, date: 'Elisa Gallagher', name: 31, price: 'Portica'}
      this.personList.push(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
