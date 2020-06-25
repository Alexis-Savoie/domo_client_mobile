import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-setting',
  templateUrl: './notification-setting.page.html',
  styleUrls: ['./notification-setting.page.scss'],
})
export class NotificationSettingPage implements OnInit {
when_personal_message_alert: string = "yes";
when_group_message_receive: string = "no";
when_voice_call_receive: string = "yes";
when_video_call_receive: string = "no"; 
  constructor() { }

  ngOnInit() {
  }

}
