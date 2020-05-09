import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
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
  constructor(private commonService: CommonService) {
    this.jsData();
  }

  ngOnInit(): void {
    this.getQuestions();
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

  jsData() {
    $(document).ready(function() {
      $(".menu-icon").on("click", function() {
        $("nav ul").toggleClass("showing");
      });
    });
    $(document).ready(function() {
      $(".modal-trigger").on("click", function() {
        $(".modal-body").toggleClass("active");
      });

      $(".modal-trigger2").on("click", function() {
        $(".modal2").toggleClass("active");
      });
    });
    $(document).ready(function() {
      $(".button-modal").on("click", function() {
        $(".modal-body").removeClass("active");
      });
    });
  }
}
