import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieResolver implements Resolve<any> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const id = route.paramMap.get('id');

    return { data: 'string' };
  }
}
