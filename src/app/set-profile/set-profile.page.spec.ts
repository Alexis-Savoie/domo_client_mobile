import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetProfilePage } from './set-profile.page';

describe('SetProfilePage', () => {
  let component: SetProfilePage;
  let fixture: ComponentFixture<SetProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
