import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacyPolicy.component.html',
  styleUrls: ['./privacyPolicy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  public policy: any;
  constructor(private commonService: CommonService, private router: Router) {
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getPolicy();
  }

  getPolicy() {
    this.commonService.getPolicy().subscribe((res) => {
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
