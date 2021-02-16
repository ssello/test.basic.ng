
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Nation } from '../model/nation';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,OnDestroy
{
    nations: Nation[] = [];
    hilitedName = '...';
    selectedNation: any;
    @ViewChild('flag') flagImg: ElementRef;
    constructor(
        private http:HttpClient,
        private changeDetectorRef:ChangeDetectorRef,
        private location: Location ) {}

    ngOnInit(): void {
        this.http.get<Nation[]>( 'assets/data.json' )
            .pipe()
            .subscribe( (nations:Nation[]) => {
                this.nations = nations ? nations : [];
                this.changeDetectorRef.detectChanges();
            } );
    }

    hilite( nation:Nation ) {
        this.hilitedName = nation.name;
        this.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
    }

    onNationClicked(nation: Nation) {
        this.selectedNation = nation;
        this.flagImg.nativeElement.src = this.selectedNation.flag;
        this.location.replaceState(`/home/${this.selectedNation.alpha3Code}`);
    }
}
