import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-voicecall',
  templateUrl: './voicecall.page.html',
  styleUrls: ['./voicecall.page.scss'],
})
export class VoicecallPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }


  dismiss() {
    this.modalController.dismiss();
  }
}
