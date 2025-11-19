/**
 * HeaderComponent 單元測試
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@features/cart/services/cart.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      currentUser: () => null,
      isAuthenticated: () => false,
    });
    const cartSpy = jasmine.createSpyObj('CartService', [], {
      itemsCount: () => 0,
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: CartService, useValue: cartSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
