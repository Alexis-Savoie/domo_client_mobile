import { Component, Inject } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from 'src/models/contants.models';
import { APP_CONFIG, AppConfig } from './app.config';
import { MyEvent } from 'src/services/myevent.services';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HTTP } from '@ionic-native/http/ngx'; //<=== Import this 


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rtlSide = "left";

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
    private platform: Platform, private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private alertService: AlertService,
    private httpSSL: HTTP, //<=== define this too
    private storage: NativeStorage,
    private translate: TranslateService, private myEvent: MyEvent) {
    this.initializeApp();
    this.myEvent.getLanguageObservable().subscribe(value => {
      this.navCtrl.navigateRoot(['./']);
      this.globalize(value);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.authService.getToken();
      this.splashScreen.hide();
      this.platform.ready() 
      .then(() => {
      this.httpSSL.setServerTrustMode("pinned") //<=== Add this function 
      .then(() => {
      console.log("Congratulaions, you have set up SSL Pinning.")
      })
      .catch(() => {
      console.error("Opss, SSL pinning failed.")
      });
      })

      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
    });
  }

  globalize(languagePriority) {
    this.translate.setDefaultLang("en");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }

    // When Logout Button is pressed 
    logout() {

      this.storage.getItem('user')
      .then(
        data => {
          this.authService.logout(data.id_user, data.token)
        }
      );
    }
}
