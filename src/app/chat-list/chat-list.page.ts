import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  chatting() {
    this.route.navigate(['./chatting']);
  }
  new_chat() {
    this.route.navigate(['./new-chat']);
  }

}
