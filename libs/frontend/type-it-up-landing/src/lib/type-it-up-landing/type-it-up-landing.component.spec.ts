import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItUpLandingComponent } from './type-it-up-landing.component';

describe('TypeItUpLandingComponent', () => {
  let component: TypeItUpLandingComponent;
  let fixture: ComponentFixture<TypeItUpLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpLandingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItUpLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
