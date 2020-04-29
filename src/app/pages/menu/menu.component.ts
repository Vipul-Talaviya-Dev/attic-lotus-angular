import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public cities: any;
  public mobileMenuDiv = false;
  public menuDiv = true;
  public searchDiv = false;
  public contactDiv = false;
  public notifyDiv = false;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.commonService.getCities().subscribe((res) => {
      try {
        if(res.status) {
          this.cities = res.cities;
        }
      } catch (e) {
        console.log('Do not get URL data');
      }
    });
  }

  menuChange() {
    this.contactDiv = this.notifyDiv = false;
    if(this.searchDiv) {
      this.menuDiv = true;
      this.searchDiv = false;
    } else {
      this.menuDiv = false;
      this.searchDiv = true;
    }
  }

  contactChange() {
    this.searchDiv = this.notifyDiv = false;
    if(this.contactDiv) {
      this.menuDiv = true;
      this.contactDiv = false;
    } else {
      this.menuDiv = false;
      this.contactDiv = true;
    }
  }

  notifyChange() {
    this.searchDiv = this.contactDiv = false;
    if(this.notifyDiv) {
      this.menuDiv = true;
      this.notifyDiv = false;
    } else {
      this.menuDiv = false;
      this.notifyDiv = true;
    }
  }
}
