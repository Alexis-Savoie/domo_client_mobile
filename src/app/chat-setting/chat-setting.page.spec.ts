import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatSettingPage } from './chat-setting.page';

describe('ChatSettingPage', () => {
  let component: ChatSettingPage;
  let fixture: ComponentFixture<ChatSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
