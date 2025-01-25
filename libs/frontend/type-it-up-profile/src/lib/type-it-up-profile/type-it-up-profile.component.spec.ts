import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItUpProfileComponent } from './type-it-up-profile.component';

describe('TypeItUpProfileComponent', () => {
  let component: TypeItUpProfileComponent;
  let fixture: ComponentFixture<TypeItUpProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItUpProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
