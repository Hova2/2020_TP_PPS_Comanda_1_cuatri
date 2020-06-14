import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscanearQRPage } from './escanear-qr.page';

describe('EscanearQRPage', () => {
  let component: EscanearQRPage;
  let fixture: ComponentFixture<EscanearQRPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscanearQRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscanearQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
