import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideocallPage } from '../videocall/videocall.page';
import { VoicecallPage } from '../voicecall/voicecall.page';
import { PicturePage } from '../picture/picture.page';
@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
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
  profilepicture() {
    this.modalController.create({ component: PicturePage }).then((modalElement) => {
      modalElement.present();
    }
    )
  }
}
