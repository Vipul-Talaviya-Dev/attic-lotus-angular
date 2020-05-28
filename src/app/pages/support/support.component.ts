import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  public categories: any;
  public supports: any;
  public expandedIndex = 0;
  constructor(
    private commonService: CommonService,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private titleService: Title, private meta: Meta
  ) {
    this.pageContent();
    this.getData();
  }

  ngOnInit(): void {
    this._compiler.clearCache();
  }

  getData() {
    this.commonService.getSupports().subscribe((res) => {
      try {
        if(res.status) {
          this.categories = res.categories;
          this.supports = res.supports;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  public pageContent() {
    this.commonService.getPageContent(5).subscribe((res) => {
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

  Collaps(index: number) {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
}
