import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, mergeMap, Observable, of} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const  TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private wrongPasswordAttempts = 0;
  private maxWrongAttempts = 5;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    if (username === 'test' && password === 'test@') {
      this.wrongPasswordAttempts = 0; 
      return this.generateToken().pipe(mergeMap((token) => {
        localStorage.setItem('currentUser', JSON.stringify({username, token: token.access_token}));
        this.currentUserSubject.next({username, token: token.access_token});
        return this.currentUser;
      }))
    }
    else if (username==='' || password ==='')
    {
      if(username==='')
      document.querySelector("[type='text']")?.classList.add('border','border-danger');
      if(password==='')
      document.querySelector("[type='password']")?.classList.add('border','border-danger');
      return new Observable<any>(subscriber => {subscriber.error({error: {message: 'Both fields are required'}})});
  } 
     this.wrongPasswordAttempts++;
    return new Observable<any>(subscriber => {
      subscriber.error({error: {message: 'Username or Password is incorrect'}});
    });
  }

  logout(): void {
    if(window.confirm("Log Out?"))
    {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    const token = this.currentUserValue?.token;
    return !this.jwtHelper.isTokenExpired(token);
  }

  private generateToken(): Observable<{ access_token: string }> {
    return of ({access_token: TEST_TOKEN});}}

