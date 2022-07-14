import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export abstract class BaseResourceService<T> {
  protected http: HttpClient;

  constructor(
    @Inject(String) protected apiPath: string,
    protected injector: Injector
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiPath).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        throw (error);
      })
    );
  }

  getById(id: number | string): Observable<T> {
    const url = `${this.apiPath}${id}`;
    return this.http.get<T>(url).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        throw(error);
      })
    );
  }

  create(resource: T): Observable<any> {
    return this.http
      .post(this.apiPath, resource);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}${id}`;
    return this.http.delete(url);
  }
}
