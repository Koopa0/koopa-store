/**
 * CurrencyFormatPipe 單元測試
 */

import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format currency with TWD', () => {
    expect(pipe.transform(1000, 'TWD')).toContain('1,000');
  });

  it('should format currency with USD', () => {
    expect(pipe.transform(1000, 'USD')).toContain('1,000');
  });

  it('should handle zero', () => {
    expect(pipe.transform(0, 'TWD')).toContain('0');
  });

  it('should handle negative numbers', () => {
    expect(pipe.transform(-1000, 'TWD')).toContain('1,000');
  });
});
