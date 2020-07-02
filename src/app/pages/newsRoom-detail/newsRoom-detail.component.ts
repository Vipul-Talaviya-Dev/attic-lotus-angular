import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-newsRoom-detail',
  templateUrl: './newsRoom-detail.component.html',
  styleUrls: ['./newsRoom-detail.component.css']
})
export class NewsRoomDetailComponent implements OnInit {
  public blog: any;
  constructor(
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute,
    private titleService: Title, private meta: Meta
  ) {
    this.route.data.subscribe((response) => {
      console.log('response', response);
      this.blog = response.newsroom.newsRoom;
      this.titleService.setTitle(this.blog.title);
      this.meta.addTag({name: 'keywords', content: this.blog.meta_keywords});
      this.meta.addTag({name: 'description', content: this.blog.meta_description});
    });
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
  }
}
