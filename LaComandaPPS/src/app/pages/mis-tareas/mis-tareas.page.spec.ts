import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisTareasPage } from './mis-tareas.page';

describe('MisTareasPage', () => {
  let component: MisTareasPage;
  let fixture: ComponentFixture<MisTareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTareasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisTareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
