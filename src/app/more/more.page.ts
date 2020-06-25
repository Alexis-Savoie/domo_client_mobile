import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(@Inject(APP_CONFIG) public config: AppConfig, private route: Router) { }

  ngOnInit() {
  }

  myprofile() {
    this.route.navigate(['./my-profile']);
  }
  privacy() {
    this.route.navigate(['./privacy-setting']);
  }
  chatsetting() {
    this.route.navigate(['./chat-setting']);
  }
  change_language() {
    this.route.navigate(['./change-language']);
  }
  notificationsetting() {
    this.route.navigate(['./notification-setting']);
  }
  buyAppAction() {
    window.open("http://bit.ly/cc_WooChat", '_system', 'location=no');
  }

}
