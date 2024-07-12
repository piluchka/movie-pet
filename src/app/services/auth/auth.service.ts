import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Get the request token
  private getRequestToken(): Observable<string> {
    const url = `${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.request_token),
      catchError(this.handleError)
    );
  }

  // Validate the request token with the user's credentials
  private validateRequestToken(requestToken: string): Observable<void> {
    const url = `${environment.apiBaseUrl}/authentication/token/validate_with_login?api_key=${environment.apiKey}`;
    const body = {
      username: environment.userName,
      password: environment.password,
      request_token: requestToken,
    };
    return this.http.post<any>(url, body).pipe(
      map(() => {}),
      catchError(this.handleError)
    );
  }

  // Create a session ID
  private createSession(requestToken: string): Observable<string> {
    const url = `${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.apiKey}`;
    const body = { request_token: requestToken };
    return this.http.post<any>(url, body).pipe(
      map((response) => response.session_id),
      catchError(this.handleError)
    );
  }

  // Get account details to retrieve accountId
  private getAccountId(sessionId: string): Observable<number> {
    const url = `${environment.apiBaseUrl}/account?api_key=${environment.apiKey}&session_id=${sessionId}`;
    return this.http.get<any>(url).pipe(
      map((response) => response.id),
      catchError(this.handleError)
    );
  }

  // Public method to get accountId
  public authenticateAndGetAccountId(): Observable<number> {
    return this.getRequestToken().pipe(
      switchMap((requestToken) =>
        this.validateRequestToken(requestToken).pipe(
          switchMap(() => this.createSession(requestToken)),
          switchMap((sessionId) => this.getAccountId(sessionId))
        )
      )
    );
  }

  // Error handler
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
