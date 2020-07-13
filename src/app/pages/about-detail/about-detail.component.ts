import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FooterSearchService} from '../../services/footer-search.service';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.component.html',
  styleUrls: ['./about-detail.component.css']
})
export class AboutDetailComponent implements OnInit {
  public blog: any;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((response) => {
      this.blog = response.about.about;
    });
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
  }

  link(url) {
    if(url) {
      window.location.href = url;
    }
  }
}
