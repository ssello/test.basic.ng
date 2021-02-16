import { TestBed, async } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
describe('HomeComponent', () => {
  beforeEach(async(() => {
    const testCDService = () => ({ detectChanges: () => ({}) });
    const testLocationService = () => ({ replaceState: () => ({}) });
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        HomeComponent
      ],
      providers: [
        { provide: ChangeDetectorRef, useFactory: testCDService },
        { provide: Location, useFactory: testLocationService }
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const homeComponent = fixture.debugElement.componentInstance;
    homeComponent.ngOnInit();
    fixture.detectChanges();
    expect(homeComponent).toBeTruthy();
  }));

  it('nation list should have 250 nations', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const homeComponent = fixture.debugElement.componentInstance;
    fixture.whenStable().then(() => {
      expect(homeComponent.nations.length).toEqual(250);
    })
  }));

});