import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css']
})
export class NotFoundComponent implements OnInit {
  public policy: any;
  constructor() {
  }

  ngOnInit(): void {
    window.scroll(0,0);
  }
}
