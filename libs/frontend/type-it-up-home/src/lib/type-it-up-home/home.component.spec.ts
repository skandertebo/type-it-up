import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItUpHomeComponent } from './home.component';

describe('TypeItUpHomeComponent', () => {
  let component: TypeItUpHomeComponent;
  let fixture: ComponentFixture<TypeItUpHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItUpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
