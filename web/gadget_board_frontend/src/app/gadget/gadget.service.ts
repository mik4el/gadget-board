
import {throwError as observableThrowError, interval as observableInterval,  Observable } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gadget } from './gadget';
import { GadgetData } from './gadget-data';

@Injectable()
export class GadgetService {
    private gadgetsUrl = 'backend/api/v1/gadgets/';

    constructor (
        private http: HttpClient
    ) {}

    getGadgets (): Observable<Gadget[]> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<Gadget[]>(this.gadgetsUrl, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    getGadget (slug: string): Observable<Gadget> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<Gadget>(this.gadgetsUrl+slug+'/', { headers }).pipe(
            catchError(this.handleError)
        );
    }

    getGadgetDataForGadget (slug: string, limit: number): Observable<GadgetData[]> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.get<GadgetData[]>(this.gadgetsUrl+slug+'/data/?limit='+limit, { headers }).pipe(
            map(res => {
                return res['results'];
            }),
            catchError(this.handleError)
        );
    }

    pollGadgetDataForGadget (
            slug: string, 
            limit: number): Observable<GadgetData[]> {
        return observableInterval(1000).pipe(
            mergeMap(() => {
                return this.getGadgetDataForGadget(slug, limit);
            }))
    }
    
    private handleError(error: any) {
        try {
            // if error comes from backend it has a json representation and error is type response
            let errors = error.json();
            let errorMessagesByType = Object.keys(errors).map(function(key){
                return errors[key];
            });
            let errorMessages = [].concat.apply([], errorMessagesByType); //flatten multidimensional array
            return observableThrowError(errorMessages);
        } catch(e) {
            //if not serve it to the view as array
            return observableThrowError([error]);
        }
    }

}