import {AfterViewInit, Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FooterSearchService} from '../../services/footer-search.service';
import {Meta, Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, AfterViewInit  {
  private fragment: string;
  public categories: any;
  public blogs: any;
  public form: FormGroup;
  public contactFormDivMessage = false;
  public contactFormDiv = true;
  public contactMessage = '';
  public searchBlogs: any;
  public searchTotal = 0;
  public termsText = '';
  public submitted: boolean = false;
  public step6 = {
    title: '',
    sub_title: '',
    image: ''
  };
  public errors = {
    name: false,
    email: false,
    phone: false,
    checkbox: false,
  };

  constructor(
    private commonService: CommonService,
    private footerSearch: FooterSearchService,
    private fb: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute,
    private titleService: Title, private meta: Meta
  ) {
    this.pageContent();
    this.getBlogs();

    // search form
    this.form = fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
        ]
      ],
      'phone': ['', [Validators.required]],
      'checkbox': ['', [Validators.required]],
    });

    this.jsData();
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    window.scroll(0,0);
    this._compiler.clearCache();
  }

  ngAfterViewInit(): void {
    try {
      this.scrollToElement(this.fragment);
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((res) => {
      try {
        if(res.status) {
          this.categories = res.blogCategories;
          this.blogs = res.blogs;
          this.step6 = res.step6;
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

  public searchBlog(name) {
    this.searchBlogs = [];
    if(name.length > 3) {
      this.footerSearch.getBlogSearch(name).subscribe((res) => {
        if (res.status === true) {
          this.searchBlogs = res.blogs;
          this.searchTotal = res.blogs.length;
        }
      });
    }
  }

  onItemChange(e) {
    if(e.target.checked) {
      this.form.patchValue({'checkbox': 1});
    } else {
      this.form.patchValue({'checkbox': ""});
      this.form.get('checkbox').setValidators(Validators.required);
    }
  }
  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.subscribe(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.contactMessage = res.message;
          this.contactFormDiv = false;
          this.contactFormDivMessage = true;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  public jsData() {
    $(document).ready(function() {
      $('.contact').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });
      $("body").on("click", ".topSide", function() {
        var body = $("html, body");
        body.stop().animate({scrollTop:0}, 500, 'swing', function() {});
      });
    });
  }

  public pageContent() {
    this.commonService.getPageContent(7).subscribe((res) => {
      try {
        if(res.status) {
          this.termsText = res.page.termsText;
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
