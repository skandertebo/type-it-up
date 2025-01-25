import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeItUpUserComponent } from './type-it-up-user.component';

describe('TypeItUpUserComponent', () => {
  let component: TypeItUpUserComponent;
  let fixture: ComponentFixture<TypeItUpUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItUpUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeItUpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
