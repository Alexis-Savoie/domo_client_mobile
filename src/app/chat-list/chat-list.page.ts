import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  constructor(private route: Router,
    private storage: NativeStorage,
    private authService: AuthService) { }

  ngOnInit() {
    this.storage.getItem('user').then(
      data2 => {
        console.log("Welcome data2 : ")
        console.log(data2)
      },
      error => {
        console.log(error);
      }
    )

  }

  chatting() {
    this.route.navigate(['./chatting']);
  }
  new_chat() {
    this.route.navigate(['./new-chat']);
  }

  logout_test() {
    //this.route.navigate(['./login']);
    
    this.storage.getItem('user')
    .then(
      data => {
        this.authService.logout(data.user_id, data.token)
      }, error => {
        console.log("no data force logout")
        this.route.navigate(['./login']);
      }
    );
    
  }

}
