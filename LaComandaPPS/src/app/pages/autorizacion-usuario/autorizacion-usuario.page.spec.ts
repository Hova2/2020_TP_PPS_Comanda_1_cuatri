import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutorizacionUsuarioPage } from './autorizacion-usuario.page';

describe('AutorizacionUsuarioPage', () => {
  let component: AutorizacionUsuarioPage;
  let fixture: ComponentFixture<AutorizacionUsuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacionUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutorizacionUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
