import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoicecallPage } from './voicecall.page';

describe('VoicecallPage', () => {
  let component: VoicecallPage;
  let fixture: ComponentFixture<VoicecallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicecallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoicecallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
