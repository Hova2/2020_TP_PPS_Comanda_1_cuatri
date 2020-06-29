import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstadoTrabajoPedidoComponent } from './estado-trabajo-pedido.component';

describe('EstadoTrabajoPedidoComponent', () => {
  let component: EstadoTrabajoPedidoComponent;
  let fixture: ComponentFixture<EstadoTrabajoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoTrabajoPedidoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoTrabajoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
