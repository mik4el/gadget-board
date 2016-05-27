import {Component} from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Hero } from '../hero/hero';
import { HeroDetailComponent } from '../hero/hero-detail.component';
import { HeroService } from '../hero/hero.service';
import { OnInit } from '@angular/core';

declare var __moduleName: string;  // weird way to make relative template urls work, see https://github.com/angular/angular/issues/6053

@Component({
    selector: 'my-heroes',
    moduleId: __moduleName,
    templateUrl: './heroes.component.html',
    styleUrls:  ['./heroes.component.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}

