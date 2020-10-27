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
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
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
}
