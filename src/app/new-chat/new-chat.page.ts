import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.page.html',
  styleUrls: ['./new-chat.page.scss'],
})
export class NewChatPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  chatting() {
    this.route.navigate(['./chatting']);
  }
  create_group() {
    this.route.navigate(['./create-group']);
  }
}
