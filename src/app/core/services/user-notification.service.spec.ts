/**
 * UserNotificationService 單元測試
 * UserNotificationService Unit Tests
 *
 * 測試覆蓋：
 * - 通知列表載入
 * - 創建通知
 * - 標記已讀/全部已讀
 * - 刪除通知
 * - 篩選與分頁
 * - Signal 狀態管理
 */

import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { UserNotificationService } from './user-notification.service';
import { NotificationType, CreateNotificationRequest } from '@core/models/notification.model';

describe('UserNotificationService', () => {
  let service: UserNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotificationService);
  });

  describe('初始化 (Initialization)', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with notifications', fakeAsync(() => {
      tick(300);
      expect(service.notifications()).toBeDefined();
      expect(Array.isArray(service.notifications())).toBeTrue();
    }));

    it('should track unread count', fakeAsync(() => {
      tick(300);
      expect(service.unreadCount()).toBeGreaterThanOrEqual(0);
    }));

    it('hasUnread computed should reflect unread state', fakeAsync(() => {
      tick(300);
      const hasUnread = service.hasUnread();
      const unreadCount = service.unreadCount();

      expect(typeof hasUnread).toBe('boolean');
      expect(hasUnread).toBe(unreadCount > 0);
    }));

    it('should set loading state during initialization', fakeAsync(() => {
      // Loading should be true initially
      expect(service.loading()).toBeTrue();

      tick(300);

      // Loading should be false after data loaded
      expect(service.loading()).toBeFalse();
    }));
  });

  describe('創建通知 (Create Notification)', () => {
    beforeEach(fakeAsync(() => {
      tick(300); // Wait for initial load
      flush();
    }));

    it('should create new notification', fakeAsync(() => {
      const initialCount = service.notifications().length;
      const initialUnread = service.unreadCount();

      const request: CreateNotificationRequest = {
        userIds: 'mock-user-id',
        type: 'order_created',
        priority: 'high',
        title: '訂單已創建',
        message: '您的訂單 #12345 已成功創建',
        data: { orderId: '12345' },
        actionUrl: '/orders/12345',
        actionText: '查看訂單',
      };

      let createdNotification: any;
      service.createNotification(request).subscribe((notification) => {
        createdNotification = notification;
      });

      tick(200);

      expect(createdNotification).toBeDefined();
      expect(createdNotification.title).toBe('訂單已創建');
      expect(createdNotification.type).toBe('order_created');
      expect(createdNotification.isRead).toBeFalse();

      expect(service.notifications().length).toBe(initialCount + 1);
      expect(service.unreadCount()).toBe(initialUnread + 1);

      flush();
    }));
  });

  describe('標記已讀 (Mark as Read)', () => {
    let notificationId: string;

    beforeEach(fakeAsync(() => {
      tick(300); // Initial load

      // Create a notification
      service.createNotification({
        userIds: 'mock-user-id',
        type: 'system',
        title: 'Test Notification',
        message: 'Test message',
      }).subscribe((notification) => {
        notificationId = notification.id;
      });
      tick(200);
      flush();
    }));

    it('should mark notification as read', fakeAsync(() => {
      const initialUnread = service.unreadCount();

      service.markAsRead(notificationId).subscribe();
      tick(200);

      const notification = service.notifications().find(n => n.id === notificationId);
      expect(notification?.isRead).toBeTrue();
      expect(notification?.readAt).toBeDefined();
      expect(service.unreadCount()).toBe(initialUnread - 1);

      flush();
    }));
  });

  describe('刪除通知 (Delete Notification)', () => {
    let notificationId: string;

    beforeEach(fakeAsync(() => {
      tick(300); // Initial load

      service.createNotification({
        userIds: 'mock-user-id',
        type: 'system',
        title: 'To be deleted',
        message: 'This will be deleted',
      }).subscribe((notification) => {
        notificationId = notification.id;
      });
      tick(200);
      flush();
    }));

    it('should delete notification', fakeAsync(() => {
      const initialCount = service.notifications().length;

      service.deleteNotification(notificationId).subscribe();
      tick(200);

      expect(service.notifications().length).toBe(initialCount - 1);

      const deletedNotif = service.notifications().find(n => n.id === notificationId);
      expect(deletedNotif).toBeUndefined();

      flush();
    }));
  });

  describe('篩選與分頁 (Filtering and Pagination)', () => {
    beforeEach(fakeAsync(() => {
      tick(300); // Initial load
      flush();
    }));

    it('should provide pagination metadata', fakeAsync(() => {
      let result: any;

      service.getNotifications({
        userId: 'mock-user-id',
        page: 1,
        pageSize: 10,
      }).subscribe((response) => {
        result = response;
      });

      tick(300);

      expect(result.total).toBeGreaterThanOrEqual(0);
      expect(result.unreadCount).toBeGreaterThanOrEqual(0);
      expect(typeof result.hasNext).toBe('boolean');

      flush();
    }));
  });

  describe('統計資料 (Statistics)', () => {
    beforeEach(fakeAsync(() => {
      tick(300); // Initial load
      flush();
    }));

    it('should get notification statistics', fakeAsync(() => {
      let stats: any;

      service.getStatistics('mock-user-id').subscribe((result) => {
        stats = result;
      });

      tick(200);

      expect(stats).toBeDefined();
      expect(stats.totalCount).toBeGreaterThanOrEqual(0);
      expect(stats.unreadCount).toBeGreaterThanOrEqual(0);
      expect(stats.todayCount).toBeGreaterThanOrEqual(0);
      expect(stats.countByType).toBeDefined();
      expect(stats.countByPriority).toBeDefined();

      flush();
    }));
  });
});
