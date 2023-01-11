import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Volume, Image } from 'src/app/models/dashboard.models';

@Component({
    selector: 'app-bigwidget',
    templateUrl: './bigwidget.component.html',
    styleUrls: ['./bigwidget.component.css']
})
export class BigwidgetComponent implements OnInit {
    @Input() public type: String;
    @Input() imagesFetched: BehaviorSubject<Boolean>;
    @Input() volumesFetched: BehaviorSubject<Boolean>;
    @Input() volumes: Volume[];
    @Input() images: Image[];

        constructor() { }

    ngOnInit(): void {
    }

}
