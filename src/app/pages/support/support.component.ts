import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  public officeContact =  {
    officeMobile: '',
    officeEmail: '',
    jobMobile: '',
    jobEmail: '',
    address: ''
  };
  public form: FormGroup;
  public submitted: boolean = false;
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
      'companyName': ['', [Validators.required]],
      'companySize': ['', [Validators.required]],
      'message': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._compiler.clearCache();
  }

  getOfficeContact() {
    this.commonService.getOfficeContact().subscribe((res) => {
      try {
        if(res.status) {
          this.officeContact = res.officeContact;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
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
}
