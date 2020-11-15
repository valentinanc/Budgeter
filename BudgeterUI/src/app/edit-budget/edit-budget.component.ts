import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.css']
})

export class EditBudgetComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  categories: Category[] = [
    {value: 'food-0', viewValue: 'Food'},
    {value: 'housing-1', viewValue: 'Housing'},
    {value: 'transportation-2', viewValue: 'Transportation'}
  ];
  constructor(public dialogRef: MatDialogRef<EditBudgetComponent>, private _formBuilder: FormBuilder) { }

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
