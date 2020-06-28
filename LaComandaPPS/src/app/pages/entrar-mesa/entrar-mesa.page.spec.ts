import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrarMesaPage } from './entrar-mesa.page';

describe('EntrarMesaPage', () => {
  let component: EntrarMesaPage;
  let fixture: ComponentFixture<EntrarMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrarMesaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrarMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
