import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PremiumPayPage } from './premium-pay.page';

describe('PremiumPayPage', () => {
  let component: PremiumPayPage;
  let fixture: ComponentFixture<PremiumPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PremiumPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
