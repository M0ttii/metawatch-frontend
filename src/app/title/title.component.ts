import { Component, OnInit } from '@angular/core';
import { NavtitleService } from '../services/navtitle.service';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
    public title: String = "Dashboard";
    public sub: String;

    constructor(private titleService: NavtitleService) {
    }

    ngOnInit(): void {
        this.titleService.title.subscribe(title => {
            this.title = title[0];
            this.sub = title[1]
            console.log(this.sub)

        })
    }

}
