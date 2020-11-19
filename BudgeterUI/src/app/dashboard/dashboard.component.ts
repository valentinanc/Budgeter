import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

	user: UserInfoModel = new UserInfoModel({guid: "D21ds12x", 
		uid: "cust2dsa12dsa", 
		first_name: "John", 
		last_name: "Doe", 
		email: "email@email.com", 
		password: "Idasn2x2#"});
	checker: boolean;
	constructor(private http: HttpClient, private route: ActivatedRoute, private matDialog: MatDialog) {

	}

	private subscriber: any;

	ngOnInit()
	{
		this.checker=true;
		if (this.checker) {
			this.openDialog();	
		}
		// this.subscriber = this.route.params.subscribe(params => {
	       
	    //    this.http.get('/api/customer/' + params.uid).subscribe((data:any) => {

		// 		this.user = new UserInfoModel(data.customer);
		// 		this.checker=true;
		// 		if (this.checker){
		// 			this.openDialog();	
		// 		}
		//     });
	    // });
	}
	
	openDialog() {
		const dialogConfig = new MatDialogConfig();
		this.matDialog.open(AboutYouComponent, dialogConfig);
	  }
	

}
