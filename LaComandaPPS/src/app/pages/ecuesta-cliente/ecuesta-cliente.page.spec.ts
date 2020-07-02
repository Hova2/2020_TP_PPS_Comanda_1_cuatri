import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EcuestaClientePage } from './ecuesta-cliente.page';

describe('EcuestaClientePage', () => {
  let component: EcuestaClientePage;
  let fixture: ComponentFixture<EcuestaClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcuestaClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EcuestaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
