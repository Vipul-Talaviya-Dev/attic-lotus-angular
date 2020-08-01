import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
  public policy: any;
  constructor(private commonService: CommonService, private router: Router) {
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getPolicy();
  }

  getPolicy() {
    this.commonService.getSitemap().subscribe((res) => {
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
