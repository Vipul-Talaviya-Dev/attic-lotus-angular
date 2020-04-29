import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ready-to-move',
  templateUrl: './readyToMove.component.html',
  styleUrls: ['./readyToMove.component.css']
})
export class ReadyToMoveComponent implements OnInit {

  public properties: any;
  public questions: any;
  public slug: any;

  constructor(private commonService: CommonService, private toaster: ToastrService) {
  }

  ngOnInit(): void {
    this.getProperties('');
    this.getQuestions();
  }

  getProperties(city) {
    this.commonService.searchLocation({city: city}).subscribe((res) => {
      if (res.status === true) {
        this.properties = res.properties;
      } else {
        this.toaster.error(res.message, 'Warning !!!');
      }
    });
  }

  getQuestions() {
    this.commonService.getQuestions().subscribe((res) => {
      try {
        if(res.status) {
          this.questions = res.questions;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }
}
