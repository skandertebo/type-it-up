import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItUpLeaderboardComponent } from './type-it-up-leaderboard.component';

describe('TypeItUpLeaderboardComponent', () => {
  let component: TypeItUpLeaderboardComponent;
  let fixture: ComponentFixture<TypeItUpLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpLeaderboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItUpLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
