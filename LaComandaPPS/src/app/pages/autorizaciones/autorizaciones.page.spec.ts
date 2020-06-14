import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizacionesPage } from './autorizaciones.page';

describe('AutorizacionesPage', () => {
  let component: AutorizacionesPage;
  let fixture: ComponentFixture<AutorizacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
