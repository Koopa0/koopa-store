/**
 * 日期格式化管道
 * Date Format Pipe
 *
 * 根據語言設定格式化日期
 * Formats dates based on language settings
 *
 * 教學重點 / Teaching Points:
 * 1. Custom Pipe 的建立
 * 2. PipeTransform 介面
 * 3. 使用 Angular 內建的 DatePipe
 * 4. 依賴注入 (Dependency Injection)
 * 5. i18n 整合
 */

import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslationService } from '@core/services';

/**
 * 日期格式類型
 * Date format type
 */
export type DateFormatType =
  | 'short' // 短格式：2024/11/18 下午5:30
  | 'medium' // 中格式：2024年11月18日 下午5:30:45
  | 'long' // 長格式：2024年11月18日 GMT+8 下午5:30:45
  | 'full' // 完整格式：2024年11月18日 星期一 GMT+08:00 下午5:30:45
  | 'shortDate' // 短日期：2024/11/18
  | 'mediumDate' // 中日期：2024年11月18日
  | 'longDate' // 長日期：2024年11月18日
  | 'fullDate' // 完整日期：2024年11月18日 星期一
  | 'shortTime' // 短時間：下午5:30
  | 'mediumTime' // 中時間：下午5:30:45
  | 'relative'; // 相對時間：5分鐘前、2小時前、3天前

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  /**
   * 注入服務
   * Inject services
   */
  private readonly datePipe = inject(DatePipe);
  private readonly translationService = inject(TranslationService);

  /**
   * 轉換日期
   * Transform date
   *
   * @param value 日期值
   * @param format 格式類型
   * @param timezone 時區
   * @returns 格式化後的日期字串
   *
   * 教學說明：
   * - value 可以是 Date 物件、時間戳記或 ISO 字串
   * - 根據當前語言設定選擇適當的格式
   * - 支援相對時間格式（例如：5分鐘前）
   */
  transform(
    value: Date | string | number | null | undefined,
    format: DateFormatType = 'medium',
    timezone?: string
  ): string {
    // 如果值為空，返回空字串
    if (!value) {
      return '';
    }

    // 取得當前語言
    const currentLanguage = this.translationService.currentLanguage();
    const locale = currentLanguage === 'zh-TW' ? 'zh-TW' : 'en-US';

    // 相對時間格式
    if (format === 'relative') {
      return this.getRelativeTime(value, currentLanguage);
    }

    // 使用 Angular 內建的 DatePipe
    return this.datePipe.transform(value, format, timezone, locale) || '';
  }

  /**
   * 取得相對時間
   * Get relative time
   *
   * @param value 日期值
   * @param language 語言
   * @returns 相對時間字串
   *
   * 教學說明：
   * 將日期轉換為相對時間格式
   * 例如：「剛剛」、「5分鐘前」、「2小時前」、「3天前」
   */
  private getRelativeTime(
    value: Date | string | number,
    language: string
  ): string {
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    // 未來的時間
    if (diffMs < 0) {
      return language === 'zh-TW' ? '未來' : 'In the future';
    }

    // 剛剛（1分鐘內）
    if (diffMin < 1) {
      return language === 'zh-TW' ? '剛剛' : 'Just now';
    }

    // 分鐘前
    if (diffMin < 60) {
      return language === 'zh-TW'
        ? `${diffMin} 分鐘前`
        : `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    }

    // 小時前
    if (diffHour < 24) {
      return language === 'zh-TW'
        ? `${diffHour} 小時前`
        : `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    }

    // 天前
    if (diffDay < 7) {
      return language === 'zh-TW'
        ? `${diffDay} 天前`
        : `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    }

    // 週前
    if (diffWeek < 4) {
      return language === 'zh-TW'
        ? `${diffWeek} 週前`
        : `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
    }

    // 月前
    if (diffMonth < 12) {
      return language === 'zh-TW'
        ? `${diffMonth} 個月前`
        : `${diffMonth} month${diffMonth > 1 ? 's' : ''} ago`;
    }

    // 年前
    return language === 'zh-TW'
      ? `${diffYear} 年前`
      : `${diffYear} year${diffYear > 1 ? 's' : ''} ago`;
  }
}
