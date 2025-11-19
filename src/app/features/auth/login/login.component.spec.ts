/**
 * LoginComponent 單元測試
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '@core/services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate email field', () => {
    const email = component.loginForm.get('emailOrUsername');
    email?.setValue('');
    expect(email?.valid).toBeFalse();
    
    email?.setValue('test@test.com');
    expect(email?.valid).toBeTrue();
  });

  it('should call authService.login on submit', () => {
    authService.login.and.returnValue(of({ user: {} } as any));
    
    component.loginForm.patchValue({
      emailOrUsername: 'test@test.com',
      password: 'password123',
    });
    
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
  });
});
