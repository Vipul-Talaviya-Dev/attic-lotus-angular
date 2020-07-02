import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FooterSearchService} from '../../services/footer-search.service';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-newsRoom',
  templateUrl: './newsRoom.component.html',
  styleUrls: ['./newsRoom.component.css']
})
export class NewsRoomComponent implements OnInit {
  public newsRooms: any;

  constructor(
    private commonService: CommonService,
    private footerSearch: FooterSearchService,
    private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute,
    private titleService: Title, private meta: Meta
  ) {
    this.pageContent();
    this.getNewsRooms();

    this.jsData();
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
  }

  getNewsRooms() {
    this.commonService.getNewsRooms().subscribe((res) => {
      try {
        if(res.status) {
          this.newsRooms = res.newsRooms;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  public  getOffset(el) {
    el = el.getBoundingClientRect();
    return {
      left: el.left + window.scrollX,
      top: el.top + window.scrollY,
      bottom: el.top + window.scrollY
    }
  }
  public scrollToElement(target) {
    var scroll_to = document.getElementById(target);
    var topHight = this.getOffset(scroll_to).top;
    window.scrollTo(0, topHight);
  }

  public jsData() {
    $(document).ready(function() {});
  }

  public pageContent() {
    this.commonService.getPageContent(11).subscribe((res) => {
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
