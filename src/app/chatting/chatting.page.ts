import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VideocallPage } from '../videocall/videocall.page';
import { VoicecallPage } from '../voicecall/voicecall.page';
@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.page.html',
  styleUrls: ['./chatting.page.scss'],
})
export class ChattingPage implements OnInit {
  viewType: string;
  constructor(private route: Router, private modalController: ModalController) { }

  ngOnInit() {
  }
  setViewType(vt) {
    this.viewType = vt;
  }

  profileinfo() {
    this.route.navigate(['./profile-info']);
  }
  videocall() {
    this.modalController.create({ component: VideocallPage }).then((modalElement) => {
      modalElement.present();
    }
    )
  }
  voicecall() {
    this.modalController.create({ component: VoicecallPage }).then((modalElement) => {
      modalElement.present();
    }
    )
  }
}
