import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})


export class AboutUsComponent implements OnInit {
  uid: string;
  loggedIn: boolean;
  constructor(private route: ActivatedRoute) {
    if (this.route.url["value"][1] != undefined){
      this.uid = this.route.url["value"][1]["path"];
    }
    if(this.uid != null){
      this.loggedIn = true;
    } else{
      this.loggedIn = false;
    }
   }

  ngOnInit(): void {
  }

}
