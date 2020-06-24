import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.css']
})
export class LandlordComponent implements OnInit {
  public landLoads: any;
  public step1 = {
    title: '',
    sub_title: '',
  };
  public step2 = {
    title: '',
    sub_title: '',
  };

  constructor(private commonService: CommonService, private toaster: ToastrService, private fb: FormBuilder, private _compiler: Compiler, private titleService: Title, private meta: Meta) {
    this.jsData();
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
    this.pageContent();
    this.getLandLoadData();
  }

  getLandLoadData() {
    this.commonService.getLandLoads().subscribe((res) => {
      try {
        if(res.status) {
          this.landLoads = res.landlords;
          this.step1 = res.landlordContent1;
          this.step2 = res.landlordContent2;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
  jsData() {
    $(document).ready(function() {});
  }

  public pageContent() {
    this.commonService.getPageContent(10).subscribe((res) => {
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