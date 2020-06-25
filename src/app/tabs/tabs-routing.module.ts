import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'chat_list',
        children: [
          {
            path: '',
            loadChildren: () =>
             import('../chat-list/chat-list.module').then(m => m.ChatListPageModule) 
          }
        ]
      }, 
      {
        path: 'call_logs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../call-logs/call-logs.module').then(m => m.CallLogsPageModule)
          }
        ]
      }, 
		
	  {
        path: 'grup_list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../group-list/group-list.module').then(m => m.GroupListPageModule)
          }
        ]
      },  
		
	  {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../more/more.module').then(m => m.MorePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/chat_list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/chat_list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
