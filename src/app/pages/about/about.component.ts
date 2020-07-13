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
  public abouts: any;
  public step1 = {
    title: '',
    sub_title: '',
    description: ''
  };
  public step2 = {
    title: '',
    sub_title: '',
    description: ''
  };
  public step3 = {
    title: '',
    sub_title: '',
    firstNo: '',
    firstDescription: '',
    secondNo: '',
    secondDescription: '',
    threeNo: '',
    threeDescription: '',
    fourNo: '',
    fourDescription: '',
    image: 'assets/images/chart_img.jpg',
  };
  constructor(private commonService: CommonService, private router: Router, private _compiler: Compiler, private titleService: Title, private meta: Meta) {

  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
    this.getData();
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

  public getData() {
    this.commonService.getaboutPage().subscribe((res) => {
      try {
        if(res.status) {
          this.abouts = res.abouts;
          this.step1 = res.step1;
          this.step2 = res.step2;
          this.step3 = res.step3;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
