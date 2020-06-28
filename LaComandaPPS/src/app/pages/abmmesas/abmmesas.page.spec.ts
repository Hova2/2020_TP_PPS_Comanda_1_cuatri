import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ABMmesasPage } from './abmmesas.page';

describe('ABMmesasPage', () => {
  let component: ABMmesasPage;
  let fixture: ComponentFixture<ABMmesasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ABMmesasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ABMmesasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
