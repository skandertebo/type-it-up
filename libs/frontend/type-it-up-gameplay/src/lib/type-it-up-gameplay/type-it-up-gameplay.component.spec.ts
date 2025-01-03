import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItUpGameplayComponent } from './type-it-up-gameplay.component';

describe('TypeItUpGameplayComponent', () => {
  let component: TypeItUpGameplayComponent;
  let fixture: ComponentFixture<TypeItUpGameplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpGameplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItUpGameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
