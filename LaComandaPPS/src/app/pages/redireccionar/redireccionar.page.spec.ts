import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedireccionarPage } from './redireccionar.page';

describe('RedireccionarPage', () => {
  let component: RedireccionarPage;
  let fixture: ComponentFixture<RedireccionarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedireccionarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedireccionarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
