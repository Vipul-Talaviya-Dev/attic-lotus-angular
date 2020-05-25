import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
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
  public errors = {
    name: false,
    email: false,
    phone: false,
  };

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((response) => {
      this.blog = response.blog.blog;
      this.relevantBlogTotal = response.blog.blog.relevents.length;

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
    });

    // this.jsData();
  }

  ngOnInit(): void {
    this._compiler.clearCache();
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
