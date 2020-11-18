import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddItemsComponent } from '../add-items/add-items.component';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checked = true;
  uid = -1;
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {
    console.log(this.route.url)
    this.uid = this.route.url["value"][1]["path"];
    console.log("uid: ", this.uid)
   }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemsComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
  } 

}
