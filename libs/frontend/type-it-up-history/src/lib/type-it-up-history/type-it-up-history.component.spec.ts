import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItUpHistoryComponent } from './type-it-up-history.component';

describe('TypeItUpHistoryComponent', () => {
  let component: TypeItUpHistoryComponent;
  let fixture: ComponentFixture<TypeItUpHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItUpHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
