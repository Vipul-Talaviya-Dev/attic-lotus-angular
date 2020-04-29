import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();
  public questions: any;
  public total = 0;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.commonService.getQuestions().subscribe((res) => {
      try {
        if(res.status) {
          this.questions = res.questions;
          this.total = this.questions.length;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
