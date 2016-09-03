import { Component } from '@angular/core';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053 

@Component({
    selector: 'page-not-found',
    moduleId: __moduleName,
    templateUrl: './page-not-found.component.html',
})

export class PageNotFoundComponent {
}