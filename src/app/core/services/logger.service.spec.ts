/**
 * LoggerService 單元測試
 */

import { TestBed } from '@angular/core/testing';
import { LoggerService, LogLevel } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let consoleDebugSpy: jasmine.Spy;
  let consoleInfoSpy: jasmine.Spy;
  let consoleWarnSpy: jasmine.Spy;
  let consoleErrorSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);

    consoleDebugSpy = spyOn(console, 'debug');
    consoleInfoSpy = spyOn(console, 'info');
    consoleWarnSpy = spyOn(console, 'warn');
    consoleErrorSpy = spyOn(console, 'error');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log debug messages', () => {
    service.debug('test debug');
    // 在非生產環境會輸出
    expect(consoleDebugSpy).toHaveBeenCalled();
  });

  it('should log info messages', () => {
    service.info('test info');
    expect(consoleInfoSpy).toHaveBeenCalled();
  });

  it('should log warn messages', () => {
    service.warn('test warn');
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    service.error('test error', new Error('test'));
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
