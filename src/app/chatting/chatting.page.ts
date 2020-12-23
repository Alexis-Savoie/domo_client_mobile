import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ActionSheetController, ToastController, Platform, LoadingController, NavController } from '@ionic/angular';
import { ConversationService } from 'src/services/conversation.service';


import { Socket } from 'ngx-socket-io';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { AlertService } from 'src/services/alert.service';
import { EnvService } from 'src/services/env.service';
import { AuthService } from 'src/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx'; //<=== Import this 
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.page.html',
  styleUrls: ['./chatting.page.scss'],
})
export class ChattingPage implements OnInit {
  message: string = "";
  document = ""
  viewType: string;
  sub: any;
  id_conversation: Number;
  convName: String;
  pp: String;
  id_user: Number;
  fileUrl: any = null;
  respData: any;



  constructor(private socket: Socket,
    private http: HttpClient,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private transfer: FileTransfer,
    private env: EnvService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private storage: NativeStorage,
    private alertService: AlertService,
    private authService: AuthService,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private httpSSL: HTTP, //<=== define this too
    private photoViewer: PhotoViewer,
    private conversationService: ConversationService) { }



  ngOnInit() {
    

    // get params from previous page
    this.sub = this.aRoute.params.subscribe(params => {
      this.id_conversation = params['id_conversation'];
      this.convName = params['name'];
      this.pp = params['pp'];
    });

    // get current user id
    this.storage.getItem('user')
      .then(
        data => {
          this.id_user = data.id_user
          //console.log("This is user : " + this.id_user)
          //console.log("This is conversation : " + this.id_conversation + " " + this.convName)


          // Get conversation messages
          this.conversationService.getConversationMessage(this.id_conversation)




        }, error => {
          //console.log("no data force logout")
          this.route.navigate(['./login']);
        }
      );


    // Update chat in real time using socket.io
    //this.socket.connect();
    //console.log("join the conv with " + this.id_conversation)
    this.socket.emit('join_conv', this.id_conversation);

    this.socket.fromEvent('message').subscribe((message: any) => {
      //console.log("received message data : ")
      //console.log(message)
      this.conversationService.messages.push({ id_user: message.id_user, text: message.text, sendDate: message.sendDate });
    });


  }

  ngOnDestroy() {
    this.socket.emit('leave_conv', this.id_conversation);
    //this.socket.disconnect();
  }


  setViewType(vt) {
    this.viewType = vt;
  }

  profileinfo() {
    //this.route.navigate(['./profile-info']);
  }



  logout() {
    //this.route.navigate(['./login']);

    this.storage.getItem('user')
      .then(
        data => {
          this.authService.logout(data.id_user, data.token)
        }, error => {
          //console.log("no data force logout")
          this.route.navigate(['./login']);
        }
      );
  }


  ionViewWillEnter() {
    //console.log("ionViewWillEnter")
  }

  ionViewDidEnter() {
    //console.log("ionViewDidEnter")

  }

  ionViewWillLeave() {
    //console.log("ionViewWillLeave")

  }

  ionViewDidLeave() {
    //console.log("ionViewDidLeave")

  }



  async selectOption() {
    const actionSheet = await this.actionSheetController.create({
      //header: "",
      buttons: [{
        text: 'Paramètres',
        handler: () => {

        }
      },
      {
        text: 'Déconnexion',
        handler: () => {
          this.logout()
        }
      },
      {
        text: 'Retour',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  showPicture(urlDocument){
    console.log("SHOWPICTURE!! : " + urlDocument)
    var options = {
      share: true, // default is false
      closeButton: true, // default is true
      copyToReference: false, // default is false
      headers: '',  // If this is not provided, an exception will be triggered
      piccasoOptions: { } // If this is not provided, an exception will be triggered
  };
  
    this.photoViewer.show(urlDocument.toString(), '', options);
  }

  //#region send a message
  sendMessage(id_conversation, message, document) {

    id_conversation = this.id_conversation
    message = this.message

    if (this.message != "") {
      // get current user id
      this.storage.getItem('user')
        .then(
          data => {

            var todayDate = new Date();// Convert to date to string in SQL date format
            var todayDateString =
              todayDate.getFullYear() + "-" + todayDate.getMonth() + "-" + todayDate.getDate() + " " +
              ("00" + todayDate.getHours()).slice(-2) + ":" +
              ("00" + todayDate.getMinutes()).slice(-2) + ":" +
              ("00" + todayDate.getSeconds()).slice(-2);


            const formData = new FormData();

            formData.append('token', data.token);
            formData.append('id_conversation', id_conversation);
            formData.append('text', message);

            this.http.post(this.env.API_URL + '/sendMessage', formData)
              .subscribe((data2: any) => {

                if ('error' in data) {
                }
                else {
                 // console.log("bonjour c'est le send-message : ")
                  //console.log({ id_conversation: id_conversation, id_user: data.id_user, text: message, sendDate: todayDateString })
                  this.socket.emit('send-message', { id_conversation: id_conversation, id_user: data.id_user, text: message, sendDate: todayDateString });
                  this.message = ""
                }
              }, ((error: any) => {
                //console.log("data error : ")
                //console.log(error.error)
                // Managed by the API error
                if ('error' in error.error) {
                  this.alertService.presentToast(error.error.message);
                }
                else {
                  this.alertService.presentToast("Server error");
                }
              })
              )
            //console.log("this is a message")
          }, error => {
            //console.log("no data force logout")
            this.route.navigate(['./login']);
          }
        );
    }


  }
  //#endregion












  selectDocument() {

    this.httpSSL.setServerTrustMode("pinned") //<=== Add this function 
    .then(() => {
    console.log("Congratulaions, you have set up SSL Pinning.")
    })
    .catch(() => {
    console.error("Opss, SSL pinning failed.")
    });


    
    this.storage.getItem('user')
      .then(
        user => {
          this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((results) => {
            for (let i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              this.crop.crop(results[i], { quality: 100 })
                .then(
                  newImage => {
                    console.log('new image path is: ' + newImage);
                    const fileTransfer: FileTransferObject = this.transfer.create();
                    var fileName = newImage.substr(newImage.lastIndexOf('/') + 1)
                    fileName = fileName.replace('?', '');
                    const uploadOpts: FileUploadOptions = {
                      fileKey: 'document',
                      fileName: fileName
                    };

                    var params = <any>{};
                    params.token = user.token;
                    params.id_conversation = this.id_conversation;
                    params.text = this.message;
                    params.documentType = "image";
                    params.documentSize = 25;

                    uploadOpts.params = params;
                    
/*

                    uploadOpts.headers = {
                      Connection: "close"
                    };
                    uploadOpts.chunkedMode = false
*/
                    
                    console.log("upload options : ")
                    console.log(uploadOpts)

                    fileTransfer.upload(newImage, this.env.API_URL + '/sendMessage', uploadOpts, true)
                      .then((data) => {
                        console.log("filetransfer data : ");
                        console.log(data);
                        this.respData = JSON.parse(data.response);
                        console.log("respData : " + this.respData);
                        if (this.respData.error == false)
                          this.alertService.presentToast(this.respData.message);
                      }, (err) => {
                        console.log("filetransfer err : ");
                        console.log(err);
                      });
                  },
                  error => console.error('Error cropping image : ' + error)
                );
            }
          }, (err) => { console.log("imagepicker error : " + err); });

        }, error => {
          console.log("no data force logout")
        }
      );

  }

}
