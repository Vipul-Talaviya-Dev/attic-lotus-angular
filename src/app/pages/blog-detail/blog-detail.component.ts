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
  public submitted: boolean = false;
  public blog: any;
  public relevantBlogTotal = 0;
  public errors = {
    name: false,
    email: false,
    phone: false,
    companyName: false,
    companySize: false,
    message: false,
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
      'companyName': ['', [Validators.required]],
      'companySize': ['', [Validators.required]],
      'message': ['', [Validators.required]],
    });

    this.jsData();
  }

  ngOnInit(): void {
    this._compiler.clearCache();
  }

  public onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.commonService.contact(this.form.value).subscribe((res) => {
        if (res.status === true) {
          this.form.reset();
          this.toaster.success(res.message, 'Success !!!');
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  public jsData() {
    let total = this.relevantBlogTotal;
    $(document).ready(function() {
      if(total >= 4) {
        $('.article-container').slick({
          infinite: true,
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 3,
          slidesToScroll: 3
        });
      }
    });
  }
}
