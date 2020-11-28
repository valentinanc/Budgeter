import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddItemsComponent } from '../add-items/add-items.component';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checked = true;
  uid: string;
  userProfileId: string;
  fname:string;
  lname:string;
  imgURL:string;
  constructor(private http: HttpClient,private dialog: MatDialog, private route: ActivatedRoute) {
    this.uid = this.route.url["value"][1]["path"];
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemsComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.fname = '';
    this.lname = '';
    if (localStorage.getItem(this.uid) == null){
      this.imgURL = "https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg";
    } else{
      this.imgURL = localStorage.getItem(this.uid);
    }
    this.http.get('/api/customer/' + this.uid).subscribe((data:any) => {
        this.fname = data.customer.FName;
        this.lname = data.customer.LName
        console.log("fname",this.fname)
        console.log("lname",this.lname)
        
      }, error => {
          console.log("There was an error retrieving the user profile id", error);
      });
  } 

}
