import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AboutYouComponent } from '../about-you/about-you.component';
import { FooterComponent } from '../footer/footer.component';
import { UserInfoModel } from '../models/userInfo';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/service.component';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
	@Output() myEvent = new EventEmitter();
	user: UserInfoModel = new UserInfoModel({guid: "D21ds12x", 
		uid: "cust2dsa12dsa", 
		first_name: "John", 
		last_name: "Doe", 
		email: "email@email.com", 
		password: "Idasn2x2#"});
	clickEventsubscription:Subscription;  
	constructor(private http: HttpClient, private route: ActivatedRoute, private matDialog: MatDialog, private sharedService:SharedService) {
		let id = this.route.url["value"][1]["path"];
		this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
			this.http.get('/api/user-profile/getProfile/' + id).subscribe((data:any) => {
				this.tBudget = data.MBudget;
				this.mExpenses = data.MExpenses;
				this.mSavings = data.MSavings;
				this.rBudget = this.tBudget-this.mExpenses-this.mSavings;
			});
		})
	}

	private subscriber: any;
	tBudget = 0;
	rBudget = 0;
	mExpenses = 0;
	mSavings = 0;
	
	ngOnInit()
	{
		let id = this.route.url["value"][1]["path"];
		this.http.get('/api/user-profile/getProfile/' + id).subscribe((data:any) => {
			this.tBudget = data.MBudget;
			this.mExpenses = data.MExpenses;
			this.mSavings = data.MSavings;
			this.rBudget = this.tBudget-this.mExpenses-this.mSavings;
			if (this.tBudget == 0 && this.mExpenses == 0 && this.mSavings == 0 && this.rBudget == 0) {
				this.openDialog();	
			}
		});
	}
	
	openDialog() {
		const dialogConfig = new MatDialogConfig();
		this.matDialog.open(AboutYouComponent, dialogConfig);
	}

	onClickTab() {
		this.sharedService.sendClickEvent();
	}
	

}
