import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-setting',
  templateUrl: './privacy-setting.page.html',
  styleUrls: ['./privacy-setting.page.scss'],
})
export class PrivacySettingPage implements OnInit {
last_seen: string = "everyone";
profile_picture: string = "friends";
status: string = "everyone";
email_address: string = "my_contacts";
  constructor() { }

  ngOnInit() {
  }

}
