/**
 * 貨幣格式化管道
 * Currency Format Pipe
 *
 * 根據語言和貨幣類型格式化金額
 * Formats currency based on language and currency type
 *
 * 教學重點 / Teaching Points:
 * 1. Custom Pipe 與 CurrencyPipe 的擴展
 * 2. 多貨幣支援
 * 3. 數字格式化
 * 4. 國際化處理
 */

import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslationService } from '@core/services';

/**
 * 支援的貨幣類型
 * Supported currency types
 */
export type CurrencyType = 'TWD' | 'USD' | 'EUR' | 'JPY' | 'CNY';

/**
 * 貨幣顯示格式
 * Currency display format
 */
export type CurrencyDisplay = 'symbol' | 'code' | 'symbol-narrow' | 'name';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  /**
   * 注入服務
   * Inject services
   */
  private readonly currencyPipe = inject(CurrencyPipe);
  private readonly translationService = inject(TranslationService);

  /**
   * 轉換貨幣
   * Transform currency
   *
   * @param value 金額
   * @param currencyCode 貨幣代碼
   * @param display 顯示格式
   * @param digitsInfo 數字格式資訊
   * @returns 格式化後的貨幣字串
   *
   * 教學說明：
   * - value: 要格式化的金額
   * - currencyCode: 貨幣代碼（預設 TWD）
   * - display: 顯示格式（symbol: $、code: TWD、name: 新台幣）
   * - digitsInfo: 小數位數格式（例如：'1.0-0' 表示至少1位數，0-0位小數）
   */
  transform(
    value: number | string | null | undefined,
    currencyCode: CurrencyType = 'TWD',
    display: CurrencyDisplay = 'symbol',
    digitsInfo?: string
  ): string {
    // 如果值為空或非數字，返回 '-'
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    // 轉換為數字
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return '-';
    }

    // 取得當前語言
    const currentLanguage = this.translationService.currentLanguage();
    const locale = currentLanguage === 'zh-TW' ? 'zh-TW' : 'en-US';

    // 根據貨幣類型決定小數位數
    if (!digitsInfo) {
      digitsInfo = this.getDefaultDigitsInfo(currencyCode);
    }

    // 使用 Angular 內建的 CurrencyPipe
    const formatted = this.currencyPipe.transform(
      numericValue,
      currencyCode,
      display,
      digitsInfo,
      locale
    );

    return formatted || '-';
  }

  /**
   * 取得預設的數字格式
   * Get default digits info
   *
   * @param currencyCode 貨幣代碼
   * @returns 數字格式字串
   *
   * 教學說明：
   * - TWD、JPY: 通常不顯示小數
   * - USD、EUR、CNY: 顯示2位小數
   */
  private getDefaultDigitsInfo(currencyCode: CurrencyType): string {
    switch (currencyCode) {
      case 'TWD':
      case 'JPY':
        return '1.0-0'; // 不顯示小數
      case 'USD':
      case 'EUR':
      case 'CNY':
      default:
        return '1.2-2'; // 顯示2位小數
    }
  }
}

/**
 * 貨幣符號管道
 * Currency Symbol Pipe
 *
 * 只顯示貨幣符號
 * Display only currency symbol
 */
@Pipe({
  name: 'currencySymbol',
  standalone: true,
})
export class CurrencySymbolPipe implements PipeTransform {
  /**
   * 取得貨幣符號
   * Get currency symbol
   *
   * @param currencyCode 貨幣代碼
   * @returns 貨幣符號
   */
  transform(currencyCode: CurrencyType = 'TWD'): string {
    const symbols: Record<CurrencyType, string> = {
      TWD: 'NT$',
      USD: '$',
      EUR: '€',
      JPY: '¥',
      CNY: '¥',
    };

    return symbols[currencyCode] || currencyCode;
  }
}

/**
 * 數字縮寫管道
 * Number Abbreviation Pipe
 *
 * 將大數字縮寫為 K、M、B 格式
 * Abbreviates large numbers to K, M, B format
 *
 * 教學說明：
 * - 1,000 → 1K
 * - 1,000,000 → 1M
 * - 1,000,000,000 → 1B
 */
@Pipe({
  name: 'numberAbbr',
  standalone: true,
})
export class NumberAbbreviationPipe implements PipeTransform {
  /**
   * 注入服務
   * Inject services
   */
  private readonly translationService = inject(TranslationService);

  /**
   * 轉換數字
   * Transform number
   *
   * @param value 數字
   * @param decimals 小數位數
   * @returns 縮寫後的數字字串
   */
  transform(
    value: number | string | null | undefined,
    decimals: number = 1
  ): string {
    // 如果值為空或非數字，返回 '-'
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return '-';
    }

    const currentLanguage = this.translationService.currentLanguage();
    const absValue = Math.abs(numericValue);

    // 億（繁體中文特有）
    if (currentLanguage === 'zh-TW' && absValue >= 100000000) {
      return (numericValue / 100000000).toFixed(decimals) + '億';
    }

    // 萬（繁體中文特有）
    if (currentLanguage === 'zh-TW' && absValue >= 10000) {
      return (numericValue / 10000).toFixed(decimals) + '萬';
    }

    // Billion (英文)
    if (absValue >= 1000000000) {
      return (numericValue / 1000000000).toFixed(decimals) + 'B';
    }

    // Million (英文)
    if (absValue >= 1000000) {
      return (numericValue / 1000000).toFixed(decimals) + 'M';
    }

    // Thousand (英文)
    if (absValue >= 1000) {
      return (numericValue / 1000).toFixed(decimals) + 'K';
    }

    return numericValue.toString();
  }
}
