import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {
  public brokers: any;
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
    this.getBrokerData();
  }

  jsData() {
    $(document).ready(function() {});
  }

  getBrokerData() {
    this.commonService.getBrokers().subscribe((res) => {
      try {
        if(res.status) {
          this.brokers = res.brokers;
          this.step1 = res.brokerContent1;
          this.step2 = res.brokerContent2;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  public pageContent() {
    this.commonService.getPageContent(9).subscribe((res) => {
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
