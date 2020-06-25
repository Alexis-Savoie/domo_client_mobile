import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-setting',
  templateUrl: './chat-setting.page.html',
  styleUrls: ['./chat-setting.page.scss'],
})
export class ChatSettingPage implements OnInit {
when_using_mobile_data: string = "no_media";
when_using_wifi_network: string = "picture";
  constructor() { }

  ngOnInit() {
  }

}
