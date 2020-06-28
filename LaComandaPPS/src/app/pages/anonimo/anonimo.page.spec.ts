import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnonimoPage } from './anonimo.page';

describe('AnonimoPage', () => {
  let component: AnonimoPage;
  let fixture: ComponentFixture<AnonimoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonimoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnonimoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
