import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AboutYouComponent } from '../about-you/about-you.component';
import { UserInfoModel } from '../models/userInfo';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
		this.subscriber = this.route.params.subscribe(params => {
	       
	       this.http.get('/api/v1/customer/' + params.uid).subscribe((data:any) => {

				this.user = new UserInfoModel(data.customer);
				this.checker=true;
				if (this.checker){
					this.openDialog();	
				}
		    });
	    });
	}
	
	openDialog() {
		const dialogConfig = new MatDialogConfig();
		this.matDialog.open(AboutYouComponent, dialogConfig);
	  }
	

}
