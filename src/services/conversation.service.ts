import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';

import { not } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})


export class ConversationService {
  isLoggedIn = false;
  id_user = -1;
  token: any;
  public conversations = []
  public messages = []


  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }


  //#region get all conversation from the user
  getUserContacts() {
    this.storage.getItem('user')
      .then(
        data => {
          //console.log( '/user/getConversation/' + data.token)
          this.http.request('GET', this.env.API_URL + '/user/getConversation/' + data.token)
            .subscribe((data2: any) => {
              //console.log("yorequest")
              this.conversations = []
              // Get data for each conversation
              data2.conversation.forEach(conversation => {
                this.conversations.push({ id_conversation: conversation.id_conversation, pp: ("https://eu.ui-avatars.com/api/?name=" + conversation.firstname + "+" + conversation.name), name: conversation.firstname + " " + conversation.name, lastMessage: "Dernier message envoyé", lastMessageDate: "Xm" })
                //{ pp: ("https://eu.ui-avatars.com/api/?name=" + conversation.firstname + "+" + conversation.name), name: conversation.name, firstname: conversation.firstname, lastMessage: "Dernier message envoyé", lastMessageDate: "Xm" }
              });

              // Get data for each group
              data2.group.forEach(group => {
                this.conversations.push({ id_conversation: group.id_conversation, pp: "", name: group.group_name, lastMessage: "Dernier message envoyé", lastMessageDate: "Xm" })
                //{ pp: ("https://eu.ui-avatars.com/api/?name=" + conversation.firstname + "+" + conversation.name), name: conversation.name, firstname: conversation.firstname, lastMessage: "Dernier message envoyé", lastMessageDate: "Xm" }
              });

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
        }, error => {
          //console.log("no user error !")
        }
      );
  }
  //#endregion


  //#region get all the messages from a conversation
  getConversationMessage(id_conversation) {
    this.storage.getItem('user')
      .then(
        data => {
          this.http.request('GET', this.env.API_URL + '/user/message/getMessage/' + data.token + "/" + id_conversation)
            .subscribe((data2: any) => {
              this.messages = []
              //console.log("messages : ")
              //console.log(data2)
              data2.messages.forEach(message => {
                console.log("salut c'est un message : ")
                console.log(message)
                if (message.urlDocument != null)
                  this.messages.push({ id_user: message.message_idUser, text: message.text, sendDate: message.sendDate, urlDocument: message.urlDocument })
                else
                  this.messages.push({ id_user: message.message_idUser, text: message.text, sendDate: message.sendDate })
              });


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
        }, error => {
          //console.log("no user error !")
        }
      );


      
  }
  //#endregion


  



}
