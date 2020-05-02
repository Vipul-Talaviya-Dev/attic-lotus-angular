import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'term-condition',
  templateUrl: './termCondition.component.html',
  styleUrls: ['./termCondition.component.css']
})
export class TermConditionComponent implements OnInit {
  public content: any;
  constructor(private commonService: CommonService, private router: Router) {
  }

  ngOnInit(): void {
    this.getTermCondition();
  }

  getTermCondition() {
    this.commonService.getTermCondition().subscribe((res) => {
      try {
        if(res.status) {
          this.content = res.content;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

}
