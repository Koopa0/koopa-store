/**
 * DateFormatPipe 單元測試
 */

import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format date', () => {
    const date = new Date('2025-01-19');
    const result = pipe.transform(date);
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should handle null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should handle undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });
});
