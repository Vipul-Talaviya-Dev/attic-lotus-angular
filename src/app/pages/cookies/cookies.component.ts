import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {
  public policy: any;
  constructor(private commonService: CommonService, private router: Router) {
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getPolicy();
  }

  getPolicy() {
    this.commonService.getCookies().subscribe((res) => {
      try {
        if(res.status) {
          this.policy = res.content;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

}
