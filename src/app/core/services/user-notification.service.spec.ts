/**
 * UserNotificationService 單元測試
 */

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserNotificationService } from './user-notification.service';
import { NotificationType } from '@core/models/notification.model';

describe('UserNotificationService', () => {
  let service: UserNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with notifications', fakeAsync(() => {
    tick(300);
    expect(service.notifications()).toBeDefined();
  }));

  it('should track unread count', fakeAsync(() => {
    tick(300);
    expect(service.unreadCount()).toBeGreaterThanOrEqual(0);
  }));

  it('hasUnread computed should work', fakeAsync(() => {
    tick(300);
    expect(typeof service.hasUnread()).toBe('boolean');
  }));
});
