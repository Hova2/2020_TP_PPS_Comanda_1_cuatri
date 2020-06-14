import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionDeProductosPage } from './gestion-de-productos.page';

describe('GestionDeProductosPage', () => {
  let component: GestionDeProductosPage;
  let fixture: ComponentFixture<GestionDeProductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDeProductosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionDeProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
