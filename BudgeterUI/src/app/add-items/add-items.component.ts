import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/service.component';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})

export class AddItemsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  categories: Category[] = [];
  uid: any;
  clickEventsubscription: Subscription;
  constructor(public dialogRef: MatDialogRef<AddItemsComponent>, private _formBuilder: FormBuilder, private sharedService:SharedService, private http: HttpClient, private router: Router) {
    this.uid = this.router.url.split("/")[2];
    this.categories = []
    this.http.get('/api/budget/getCategories/' + this.uid).subscribe((data:any) => {
      let map = new Map();
      let count = 0;
      for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (!map.has(obj.Name)){
            map.set(obj.Name, 1);
            this.categories.push({value: count.toString(), viewValue: obj.Name})
            count++;
        }
      }
    }, error => {
        console.log("There was an error displaying the financial goals", error);
    });
   }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ["", Validators.required]
    });
  }

  close() {
    this.dialogRef.close("Thanks for using me!");
  }

}
