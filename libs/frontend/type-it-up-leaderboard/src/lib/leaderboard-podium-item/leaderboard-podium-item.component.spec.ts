import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPodiumItemComponent } from './leaderboard-podium-item.component';

describe('LeaderboardPodiumItemComponent', () => {
  let component: LeaderboardPodiumItemComponent;
  let fixture: ComponentFixture<LeaderboardPodiumItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardPodiumItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardPodiumItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
