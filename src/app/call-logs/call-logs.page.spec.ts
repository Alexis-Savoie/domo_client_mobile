import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CallLogsPage } from './call-logs.page';

describe('CallLogsPage', () => {
  let component: CallLogsPage;
  let fixture: ComponentFixture<CallLogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallLogsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CallLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
