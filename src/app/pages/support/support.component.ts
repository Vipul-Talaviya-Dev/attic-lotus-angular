import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
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
  public options: any;
  public expandedIndex = 0;
  constructor(
    private commonService: CommonService,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private titleService: Title, private meta: Meta
  ) {
    this.pageContent();
    this.getData('');
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
  }

  getData(search) {
    this.commonService.getSupports(search).subscribe((res) => {
      try {
        if(res.status) {
          this.categories = res.categories;
          this.supports = res.supports;
          this.options = res.options;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
  public redirectUrl(i) {
    if(i === 0) {
      window.location.href = 'https://api.whatsapp.com/send?phone=8892778866&text=&source=&data=&app_absent=';
    }
  }
  public search(name) {
    if(name.length > 3) {
      this.getData(name);
    }
    if(name.length === 0) {
      this.getData('');
    }
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
