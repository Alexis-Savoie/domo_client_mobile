import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
  }, 
  {
    path: 'login',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./set-profile/set-profile.module').then( m => m.SetProfilePageModule)
  },
  {
    path: 'chat-list',
    loadChildren: () => import('./chat-list/chat-list.module').then( m => m.ChatListPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'new-chat',
    loadChildren: () => import('./new-chat/new-chat.module').then( m => m.NewChatPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'chatting/:id_conversation/:name/:pp',
    loadChildren: () => import('./chatting/chatting.module').then( m => m.ChattingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'profile-info',
    loadChildren: () => import('./profile-info/profile-info.module').then( m => m.ProfileInfoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'picture',
    loadChildren: () => import('./picture/picture.module').then( m => m.PicturePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'group-list',
    loadChildren: () => import('./group-list/group-list.module').then( m => m.GroupListPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'create-group',
    loadChildren: () => import('./create-group/create-group.module').then( m => m.CreateGroupPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'create-group-info',
    loadChildren: () => import('./create-group-info/create-group-info.module').then( m => m.CreateGroupInfoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'group-chatting',
    loadChildren: () => import('./group-chatting/group-chatting.module').then( m => m.GroupChattingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'group-info',
    loadChildren: () => import('./group-info/group-info.module').then( m => m.GroupInfoPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'call-logs',
    loadChildren: () => import('./call-logs/call-logs.module').then( m => m.CallLogsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'voicecall',
    loadChildren: () => import('./voicecall/voicecall.module').then( m => m.VoicecallPageModule), canActivate: [AuthGuard]
  }, 
  {
    path: 'videocall',
    loadChildren: () => import('./videocall/videocall.module').then( m => m.VideocallPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'more',
    loadChildren: () => import('./more/more.module').then( m => m.MorePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'privacy-setting',
    loadChildren: () => import('./privacy-setting/privacy-setting.module').then( m => m.PrivacySettingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'chat-setting',
    loadChildren: () => import('./chat-setting/chat-setting.module').then( m => m.ChatSettingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'notification-setting',
    loadChildren: () => import('./notification-setting/notification-setting.module').then( m => m.NotificationSettingPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'change-language',
    loadChildren: () => import('./change-language/change-language.module').then( m => m.ChangeLanguagePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'premium-pay',
    loadChildren: () => import('./premium-pay/premium-pay.module').then( m => m.PremiumPayPageModule), canActivate: [AuthGuard]
  },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
