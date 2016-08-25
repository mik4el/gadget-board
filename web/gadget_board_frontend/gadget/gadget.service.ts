import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Gadget } from './gadget';
import { GadgetData } from './gadget-data';

@Injectable()
export class GadgetService {
    private gadgetsUrl = 'api/v1/gadgets/';

    constructor (
        private http: Http
    ) {}

    getGadgets (): Observable<Gadget[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, body: ""});
        return this.http.get(this.gadgetsUrl, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getGadget (slug: string): Observable<Gadget> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, body: ""});
        return this.http.get(this.gadgetsUrl+slug+'/', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getGadgetDataForGadget (slug: string, limit: number): Observable<GadgetData[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers, body: ""});
        return this.http.get(this.gadgetsUrl+slug+'/data/?limit='+limit, options)
            .map(res => {
                let body = res.json();
                return body.results;
            })
            .catch(this.handleError);
    }

    pollGadgetDataForGadget (
            slug: string, 
            limit: number): Observable<GadgetData[]> {
        return Observable
            .interval(10000)
            .mergeMap(() => {
                return this.getGadgetDataForGadget(slug, limit);
            })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    
    private handleError(error: any) {
        try {
            //if error comes from backend it has a json representation and error is type response
            let errors = error.json();
            let errorMessagesByType = Object.keys(errors).map(function(key){
                return errors[key];
            });
            let errorMessages = [].concat.apply([], errorMessagesByType); //flatten multidimensional array
            return Observable.throw(errorMessages);
        } catch(e) {
            //if not serve it to the view as array
            return Observable.throw([error]);
        }
    }

}