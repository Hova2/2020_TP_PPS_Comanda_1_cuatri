import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiPedidoPage } from './mi-pedido.page';

describe('MiPedidoPage', () => {
  let component: MiPedidoPage;
  let fixture: ComponentFixture<MiPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
