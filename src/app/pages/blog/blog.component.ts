import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public categories: any;
  public blogs: any;
  public form: FormGroup;
  public contactFormDivMessage = false;
  public contactFormDiv = true;
  public contactMessage = '';
  public submitted: boolean = false;
  public errors = {
    name: false,
    email: false,
    phone: false,
  };

  constructor(
    private commonService: CommonService,
    private fb: FormBuilder, private router: Router,
    private toaster: ToastrService,
    private _compiler: Compiler,
    private route: ActivatedRoute
  ) {
    this.getOfficeContact();

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

    this.jsData();
  }

  ngOnInit(): void {
    this._compiler.clearCache();
  }

  getOfficeContact() {
    this.commonService.getBlogs().subscribe((res) => {
      try {
        if(res.status) {
          this.categories = res.blogCategories;
          this.blogs = res.blogs;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
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

      // Add scrollspy to <body>
      $('body').scrollspy({
        target: ".search-section",
        offset: 50
      });

      // Add smooth scrolling on all links inside the navbar
      $("body").on('click', '.blogSlug', function() {
        let slug = $(this).attr('data-name');
        if (slug !== "") {
          var hash = slug;
          var navOffset = $('.header_section nav').height();
          $('html, body').animate({
            scrollTop: $('#'+hash).offset().top - navOffset
          }, 500, function() {
            window.location.hash = hash;
          });
        } // End if
      });
    });
  }
}
