import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsComponentMain } from './subjectsmain.component';

describe('SubjectsComponentMain', () => {
  let component: SubjectsComponentMain;
  let fixture: ComponentFixture<SubjectsComponentMain>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectsComponentMain ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsComponentMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
