import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionDeMesasPage } from './gestion-de-mesas.page';

describe('GestionDeMesasPage', () => {
  let component: GestionDeMesasPage;
  let fixture: ComponentFixture<GestionDeMesasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDeMesasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionDeMesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
