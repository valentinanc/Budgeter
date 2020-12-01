import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.uid = this.route.url["value"][1]["path"];
   }
  uid: string;
  ngOnInit(): void {
  }

}
