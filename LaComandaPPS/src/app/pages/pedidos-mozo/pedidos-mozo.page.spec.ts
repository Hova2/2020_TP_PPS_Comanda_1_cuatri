import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosMozoPage } from './pedidos-mozo.page';

describe('PedidosMozoPage', () => {
  let component: PedidosMozoPage;
  let fixture: ComponentFixture<PedidosMozoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosMozoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosMozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
