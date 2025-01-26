import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardTableRowComponent } from './leaderboard-table-row.component';

describe('LeaderboardTableRowComponent', () => {
  let component: LeaderboardTableRowComponent;
  let fixture: ComponentFixture<LeaderboardTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardTableRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
