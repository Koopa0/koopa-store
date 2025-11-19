/**
 * StorageService 單元測試
 */

import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Basic Operations', () => {
    it('should set and get string value', () => {
      service.set('test-key', 'test-value');
      expect(service.get<string>('test-key')).toBe('test-value');
    });

    it('should set and get object value', () => {
      const testObj = { name: 'test', value: 123 };
      service.set('test-obj', testObj);
      expect(service.get<typeof testObj>('test-obj')).toEqual(testObj);
    });

    it('should remove value', () => {
      service.set('test-key', 'test-value');
      service.remove('test-key');
      expect(service.get('test-key')).toBeNull();
    });

    it('should clear all storage', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');
      service.clear();
      expect(service.get('key1')).toBeNull();
      expect(service.get('key2')).toBeNull();
    });

    it('should return null for non-existent key', () => {
      expect(service.get('non-existent')).toBeNull();
    });

    it('should check if key exists', () => {
      service.set('test-key', 'value');
      expect(service.has('test-key')).toBeTrue();
      expect(service.has('non-existent')).toBeFalse();
    });
  });

  describe('Session Storage', () => {
    it('should use sessionStorage when specified', () => {
      service.set('session-key', 'session-value', { useSessionStorage: true });
      expect(service.get('session-key', { useSessionStorage: true })).toBe('session-value');
      expect(service.get('session-key')).toBeNull();
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should expire items after TTL', (done) => {
      service.set('temp-key', 'temp-value', { ttl: 100 });

      setTimeout(() => {
        expect(service.get('temp-key')).toBeNull();
        done();
      }, 150);
    });

    it('should not expire items before TTL', () => {
      service.set('temp-key', 'temp-value', { ttl: 10000 });
      expect(service.get('temp-key')).toBe('temp-value');
    });
  });

  describe('Storage Info', () => {
    it('should check storage availability', () => {
      expect(service.isAvailable()).toBeTrue();
      expect(service.isAvailable('session')).toBeTrue();
    });

    it('should get storage size', () => {
      service.set('key1', 'value1');
      const size = service.getSize();
      expect(size).toBeGreaterThan(0);
    });

    it('should get remaining space', () => {
      const remaining = service.getRemainingSpace();
      expect(remaining).toBeGreaterThan(0);
    });
  });

  describe('Export/Import', () => {
    it('should export storage data', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');

      const exported = service.export();
      expect(exported).toContain('key1');
      expect(exported).toContain('key2');
    });

    it('should import storage data', () => {
      service.set('key1', 'value1');
      const exported = service.export();

      service.clear();
      expect(service.get('key1')).toBeNull();

      service.import(exported);
      expect(service.get('key1')).toBe('value1');
    });
  });

  describe('Cleanup', () => {
    it('should cleanup expired items', (done) => {
      service.set('temp1', 'value1', { ttl: 50 });
      service.set('perm1', 'value2');

      setTimeout(() => {
        const cleaned = service.cleanupExpired();
        expect(cleaned).toBe(1);
        expect(service.get('perm1')).toBe('value2');
        done();
      }, 100);
    });
  });
});
