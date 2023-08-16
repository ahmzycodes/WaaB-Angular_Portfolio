import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideListComponent } from './right-side-list.component';

describe('RightSideListComponent', () => {
  let component: RightSideListComponent;
  let fixture: ComponentFixture<RightSideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightSideListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RightSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
