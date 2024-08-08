import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Get the request token
  private getRequestToken(): Observable<string> {
    const url = `${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.apiKey}`;
    return this.http.get<any>(url).pipe(
      tap((token) => console.log('Request token:', token)),
      map((response) => response.request_token),
      catchError(this.handleError)
    );
  }

  // Validate the request token with the user's credentials
  private validateRequestToken(
    userName: string,
    password: string,
    requestToken: string
  ): Observable<void> {
    const url = `${environment.apiBaseUrl}/authentication/token/validate_with_login?api_key=${environment.apiKey}`;
    const body = {
      username: userName,
      password: password,
      request_token: requestToken,
    };
    return this.http.post<any>(url, body).pipe(
      tap((response) => console.log('Validation response:', response)),
      map(() => {}), // Return void after successful validation
      catchError((error) => {
        console.error('Validation error:', error);
        return throwError(error);
      })
    );
  }

  // Create a session ID
  private createSession(requestToken: string): Observable<string> {
    const url = `${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post<any>(url, body).pipe(
      tap((response) => console.log('Create session response:', response)),
      map((response) => response.session_id),
      catchError(this.handleError)
    );
  }

  public getAccountId(sessionId: string) {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${sessionId}`
    );
  }

  public authenticateUser(userName: string, password: string): Observable<any> {
    return this.getRequestToken().pipe(
      switchMap((requestToken) =>
        this.validateRequestToken(userName, password, requestToken).pipe(
          map(() => requestToken) // Pass the requestToken forward after validation
        )
      ),
      switchMap((validatedToken) =>
        this.createSession(validatedToken).pipe(
          switchMap((sessionId) =>
            forkJoin({
              sessionId: of(sessionId),
              accountId: this.getAccountId(sessionId).pipe(
                map((result) => result.id)
              ),
            })
          )
        )
      ),
      tap((sessionId) => console.log('Session ID:', sessionId)),
      catchError((error) => {
        console.error('Authentication error:', error);
        return of(null);
      })
    );
  }

  // Get account details to retrieve accountId
  // private getAccountAndSessionIds(
  //   sessionId: string
  // ): Observable<{ accountId: number; sessionId: string }> {
  //   const url = `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${sessionId}`;
  //   return this.http.get<any>(url).pipe(
  //     map((response) => ({ accountId: response.id, sessionId })),
  //     catchError(this.handleError)
  //   );
  // }

  // Public method to get accountId
  // public authenticateAndGetAccountId(): Observable<{
  //   accountId: number;
  //   sessionId: string;
  // }> {
  //   return this.getRequestToken().pipe(
  //     switchMap((requestToken) =>
  //       this.validateRequestToken(
  //         environment.userName,
  //         environment.password,
  //         requestToken
  //       ).pipe(
  //         switchMap(() => this.createSession(requestToken)),
  //         switchMap((sessionId) => this.getAccountAndSessionIds(sessionId))
  //       )
  //     )
  //   );
  // }

  // Error handler
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
