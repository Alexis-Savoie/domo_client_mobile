import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, 
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'set-profile',
    loadChildren: () => import('./set-profile/set-profile.module').then( m => m.SetProfilePageModule)
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./chat-list/chat-list.module').then( m => m.ChatListPageModule)
  },
  {
    path: 'new-chat',
    loadChildren: () => import('./new-chat/new-chat.module').then( m => m.NewChatPageModule)
  },
  {
    path: 'chatting',
    loadChildren: () => import('./chatting/chatting.module').then( m => m.ChattingPageModule)
  },
  {
    path: 'profile-info',
    loadChildren: () => import('./profile-info/profile-info.module').then( m => m.ProfileInfoPageModule)
  },
  {
    path: 'picture',
    loadChildren: () => import('./picture/picture.module').then( m => m.PicturePageModule)
  },
  {
    path: 'group-list',
    loadChildren: () => import('./group-list/group-list.module').then( m => m.GroupListPageModule)
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule)
  },
  {
    path: 'create-group-info',
    loadChildren: () => import('./create-group-info/create-group-info.module').then( m => m.CreateGroupInfoPageModule)
  },
  {
    path: 'group-chatting',
    loadChildren: () => import('./group-chatting/group-chatting.module').then( m => m.GroupChattingPageModule)
  },
  {
    path: 'group-info',
    loadChildren: () => import('./group-info/group-info.module').then( m => m.GroupInfoPageModule)
  },
  {
    path: 'call-logs',
    loadChildren: () => import('./call-logs/call-logs.module').then( m => m.CallLogsPageModule)
  },
  {
    path: 'voicecall',
    loadChildren: () => import('./voicecall/voicecall.module').then( m => m.VoicecallPageModule)
  }, 
  {
    path: 'videocall',
    loadChildren: () => import('./videocall/videocall.module').then( m => m.VideocallPageModule)
  },
  {
    path: 'more',
    loadChildren: () => import('./more/more.module').then( m => m.MorePageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'privacy-setting',
    loadChildren: () => import('./privacy-setting/privacy-setting.module').then( m => m.PrivacySettingPageModule)
  },
  {
    path: 'chat-setting',
    loadChildren: () => import('./chat-setting/chat-setting.module').then( m => m.ChatSettingPageModule)
  },
  {
    path: 'notification-setting',
    loadChildren: () => import('./notification-setting/notification-setting.module').then( m => m.NotificationSettingPageModule)
  },  {
    path: 'change-language',
    loadChildren: () => import('./change-language/change-language.module').then( m => m.ChangeLanguagePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
