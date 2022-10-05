import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCheckedOutBooksComponent } from './member-checked-out-books.component';

describe('MemberCheckedOutBooksComponent', () => {
  let component: MemberCheckedOutBooksComponent;
  let fixture: ComponentFixture<MemberCheckedOutBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCheckedOutBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCheckedOutBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
