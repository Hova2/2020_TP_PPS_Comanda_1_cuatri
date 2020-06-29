import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosEmpleadoPage } from './pedidos-empleado.page';

describe('PedidosEmpleadoPage', () => {
  let component: PedidosEmpleadoPage;
  let fixture: ComponentFixture<PedidosEmpleadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosEmpleadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosEmpleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
