import {Compiler, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private commonService: CommonService, private router: Router, private _compiler: Compiler, private titleService: Title, private meta: Meta) {

  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
    this.pageContent();
  }

  public pageContent() {
    this.commonService.getPageContent(6).subscribe((res) => {
      try {
        if(res.status) {
          this.titleService.setTitle(res.page.title);
          this.meta.addTag({name: 'keywords', content: res.page.keywords});
          this.meta.addTag({name: 'description', content: res.page.decription});
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
