import {Compiler, Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number = new Date().getFullYear();
  public questions: any;
  public normals: any;
  public total = 0;
  public officeContact =  {
    officeMobile: '',
    officeEmail: '',
    jobMobile: '',
    jobEmail: '',
    address: ''
  };
  public contactForm: FormGroup;
  public contactFormDivMessage = false;
  public contactFormDiv = true;
  public submitted: boolean = false;
  public contactErrors = {
    name: false,
    email: false,
    phone: false,
    companyName: false,
    companySize: false,
    message: false,
  };

  constructor(private commonService: CommonService, private fb: FormBuilder, private router: Router,
              private toaster: ToastrService,
              private _compiler: Compiler,
              private route: ActivatedRoute) {
    this.jsData();
    // search form
    this.contactForm = fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]
      ],
      'phone': ['', [Validators.required]],
      'companyName': ['', [Validators.required]],
      'companySize': ['', [Validators.required]],
      'message': ['Please Contact To User'],
    });
  }

  ngOnInit(): void {
    this.getQuestions();
    this.getOfficeContact();
    this._compiler.clearCache();
  }

  getQuestions() {
    this.commonService.getQuestions().subscribe((res) => {
      try {
        if(res.status) {
          this.questions = res.footers;
          this.normals = res.normals;
          this.total = this.questions.length;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
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
    if (this.contactForm.valid) {
      this.commonService.contact(this.contactForm.value).subscribe((res) => {
        if (res.status === true) {
          this.contactForm.reset();
          this.contactFormDivMessage = true;
          this.contactFormDiv = false;
        } else {
          this.toaster.error(res.message, 'Error !!!');
        }
      });
    }
  }

  onItemChange(value) {
    this.contactForm.patchValue({'companySize': value});
  }
  jsData() {
    $(document).ready(function() {
      $(".menu-icon").on("click", function() {
        $("nav ul").toggleClass("showing");
      });
    });
    $(document).ready(function() {
      $(".modal-trigger").on("click", function() {
        $(".modal-body").removeClass("active");
        $(".modal1").toggleClass("active");
      });

      $(".modal-trigger2").on("click", function() {
        $(".modal-body").removeClass("active");
        $(".modal2").toggleClass("active");
      });

      $(".modal-trigger3").on("click", function() {
        $(".modal-body").removeClass("active");
        $(".modal3").toggleClass("active");
        $("body").css("background", "#f8f8f8");
      });
    });
    $(document).ready(function() {
      $(".button-modal").on("click", function() {
        $(".modal-body").removeClass("active");
        $("body").css("background", "#fff");
      });
    });

    $(document).ready(function() {
      // Add minus icon for collapse element which is open by default
      $(".collapse.show").each(function() {
        $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
      });

      // Toggle plus minus icon on show hide of collapse element
      $(".collapse").on('show.bs.collapse', function() {
        $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
      }).on('hide.bs.collapse', function() {
        $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
      });
    });

    $(document).ready(function() {
      ($(".question__question")[0].value = ""), ($(".question__question")[1].value = ""), ($(".question__question")[2].value = ""), ($(".question__question")[3].value = ""), ($(".question__question")[4].value = ""), ($(".question__question")[5].value = "");
      let e = 1,
        t = !1,
        n = !1;
      function o(e) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e);
      }
      $(".question__question").keyup(function (o) {
        n || (13 == o.keyCode && $("#question__question-" + e)[0].value.length >= 0 && !1 === t && ($(".next__button").trigger("click"), $(".question__title").removeClass("question__title--inactive"), o.preventDefault()));
      }),
        $(".question__question").keyup(function () {
          n ||
          ($("#question__question-" + e)[0].value.length >= 0
            ? ($(".question__title").addClass("question__title--inactive "),
              o($("#question__question-5")[0].value)
                ? o($("#question__question-5")[0].value) && ((t = !1), $(".error__wrapper").css("opacity", "0"))
                : ($(".error__wrapper").css("opacity", "0.2"), ($(".error__message")[0].innerText = "Don’t be shy, the entered email is incorrect."), (t = !0)))
            : $(".question__title").removeClass("question__title--inactive "));
        }),
        $(".question__question").focusout(function () {
          n || (0 === $("#question__question-" + e)[0].value.length && $(".question__title").removeClass("question__title--inactive "));
        }),
        $(".question__question").focusout(function () {
          o($("#question__question-5")[0].value) && ((t = !1), $(".error__wrapper").css("opacity", "0"));
        }),
        $(".next__button").click(function (o) {
          var clientNameFinal = '';
          if (!1 === t)
            if (0 !== $("#question__question-" + e)[0].value.length)
              switch ((e < 7 && e++, $(".error__wrapper").css("opacity", "0"), e <= 6 && $(".question__number").text(e + "/6"), $(".question__title").removeClass("question__title--inactive "), e)) {
                case 2:
                  let t = $(".question__question")[0].value;
                  (t = t.charAt(0).toUpperCase() + t.slice(1)),
                    ($(".question__title")[1].innerText = "Nice too meet you " + t + "!"),
                    $("#question-1").addClass("question__wrapper--inactive"),
                    $("#question-2").removeClass("question__wrapper--inactive");
                  break;
                case 3:
                  $("#question-2").addClass("question__wrapper--inactive"), $("#question-3").removeClass("question__wrapper--inactive");
                  break;
                case 4:
                  $("#question-3").addClass("question__wrapper--inactive"), $("#question-4").removeClass("question__wrapper--inactive");
                  break;
                case 5:
                  $("#question-4").addClass("question__wrapper--inactive"), $("#question-5").removeClass("question__wrapper--inactive");
                  break;
                case 6:
                  $("#question-5").addClass("question__wrapper--inactive"), $("#question-6").removeClass("question__wrapper--inactive"), ($(".next__button")[0].innerText = "Let's send!");
                  break;
                case 7:
                  $("input")[6].setAttribute("type", "submit"), (n = !0), (clientNameFinal = $(".question__question")[0].value);
                  let o = $(".question__question")[4].value;
                  let m = $(".question__question")[5].value;
                  (clientNameFinal = clientNameFinal.charAt(0).toUpperCase() + clientNameFinal.slice(1)), ($(".question__title")[6].innerText = clientNameFinal + ", " + $(".question__title")[6].innerText);
                  let i = "We will contact you via email: " + o + " or mobile: "+ m +" in no time. But if you don’t want to wait for a good things to happen, feel free to call us - let’s have a conversation!";
                  ($(".confirm__p")[0].innerText = i),
                    $("#question-6").addClass("question__wrapper--inactive"),
                    $(".next__wrapper").addClass("next__wrapper--inactive"),
                    $(".question__number").addClass("question__number--inactive"),
                    $("#question-7").removeClass("question__wrapper--inactive");
              }
            else
              switch (($(".error__wrapper").css("opacity", "0.2"), e)) {
                case 1:
                  $(".error__message")[0].innerText = "Don’t be shy, tell us your name.";
                  break;
                case 2:
                  $(".error__message")[0].innerText = "Don’t be shy, tell us about your project.";
                  break;
                case 3:
                  $(".error__message")[0].innerText = "Don’t be shy, please fill the budget field.";
                  break;
                case 4:
                  $(".error__message")[0].innerText = "Don’t be shy, please fill the deadline field.";
                  break;
                case 5:
                  $(".error__message")[0].innerText = "Don’t be shy, we need to contact you somehow.";
                case 6:
                  $(".error__message")[0].innerText = "Don’t be shy, we need to contact you somehow.";
              }
        });
    });
  }
}
