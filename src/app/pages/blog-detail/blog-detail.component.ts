import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FooterSearchService} from '../../services/footer-search.service';
import {Meta, Title} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  public form: FormGroup;
  public contactFormDivMessage = false;
  public contactFormDiv = true;
  public contactMessage = '';
  public submitted: boolean = false;
  public blog: any;
  public relevantBlogTotal = 0;
  public searchBlogs: any;
  public searchTotal = 0;
  public termsText = '';
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
    private fb: FormBuilder,
    private router: Router,
    private footerSearch: FooterSearchService,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute,
    private titleService: Title, private meta: Meta
  ) {
    this.route.data.subscribe((response) => {
      this.blog = response.blog.blog;
      this.termsText = this.blog.termsText;
      this.relevantBlogTotal = response.blog.blog.relevents.length;
      this.step6 = response.blog.blog.step6;

      this.titleService.setTitle(this.blog.title);
      this.meta.addTag({name: 'keywords', content: this.blog.meta_keywords});
      this.meta.addTag({name: 'description', content: this.blog.meta_description});

      this.jsData();
    });
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

    // this.jsData();
  }

  ngOnInit(): void {
    window.scroll(0,0);
    this._compiler.clearCache();
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

  public facebook() {
    window.location.href = 'http://www.facebook.com/sharer.php?u=https://atticspace.in' + this.router.url;
  }

  public instagram() {
    window.location.href = 'https://www.instagram.com/sharer.php?u=https://atticspace.in' + this.router.url;
  }

  public twitter() {
    window.location.href = 'http://twitter.com/share?url=https://atticspace.in' + this.router.url;
  }
  public linkdin() {
    window.location.href = 'http://www.linkedin.com/shareArticle?mini=true&url=https://atticspace.in' + this.router.url;
  }
  public jsData() {
    let total = this.relevantBlogTotal;
    $(document).ready(function() {
      $('.contact').keypress(function (event) {
        var keycode = event.which;
        if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
          event.preventDefault();
        }
      });

      if(total >= 4) {
        if ($('.article-container').hasClass('slick-initialized')) {
          $('.article-container').slick('destroy');
        }
        $('.article-container').not('.slick-initialized').slick({
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 3,
          slidesToScroll: 3,
          setPosition: true
        });
      }
    });
  }
}
