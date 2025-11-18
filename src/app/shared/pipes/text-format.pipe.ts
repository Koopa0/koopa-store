/**
 * 文字格式化管道集合
 * Text Format Pipes Collection
 *
 * 提供各種文字處理功能
 * Provides various text processing functions
 *
 * 教學重點 / Teaching Points:
 * 1. Pure vs Impure Pipes
 * 2. 字串處理技巧
 * 3. 文字截斷策略
 * 4. 安全的 HTML 處理
 */

import { Pipe, PipeTransform } from '@angular/core';

/**
 * 文字截斷管道
 * Text Truncate Pipe
 *
 * 截斷過長的文字並加上省略號
 * Truncates long text and adds ellipsis
 *
 * 教學說明：
 * 使用方式：{{ longText | truncate:50:'...' }}
 * - limit: 最大字元數
 * - ellipsis: 省略符號（預設 '...'）
 * - wholeWord: 是否只在完整單字處截斷（預設 false）
 */
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    limit: number = 50,
    ellipsis: string = '...',
    wholeWord: boolean = false
  ): string {
    if (!value) {
      return '';
    }

    if (value.length <= limit) {
      return value;
    }

    let truncated = value.substring(0, limit);

    // 如果需要在完整單字處截斷
    if (wholeWord) {
      const lastSpace = truncated.lastIndexOf(' ');
      if (lastSpace > 0) {
        truncated = truncated.substring(0, lastSpace);
      }
    }

    return truncated + ellipsis;
  }
}

/**
 * 首字母大寫管道
 * Capitalize Pipe
 *
 * 將第一個字元轉為大寫
 * Capitalizes the first character
 */
@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}

/**
 * 標題格式管道
 * Title Case Pipe (Enhanced)
 *
 * 將每個單字的首字母轉為大寫
 * Capitalizes the first letter of each word
 *
 * 教學說明：
 * 比 Angular 內建的 TitleCasePipe 更智能
 * 會忽略常見的小寫詞（如 a, an, the, in, on, at 等）
 */
@Pipe({
  name: 'titleCase',
  standalone: true,
})
export class TitleCasePipe implements PipeTransform {
  private readonly smallWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'in',
    'on',
    'at',
    'to',
    'for',
    'of',
    'by',
    'with',
  ]);

  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return value
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        // 第一個和最後一個單字永遠大寫
        if (
          index === 0 ||
          index === value.split(' ').length - 1 ||
          !this.smallWords.has(word)
        ) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(' ');
  }
}

/**
 * 移除 HTML 標籤管道
 * Strip HTML Tags Pipe
 *
 * 移除所有 HTML 標籤
 * Removes all HTML tags
 *
 * 教學說明：
 * 用於顯示純文字內容
 * 例如：將 HTML 內容轉換為純文字預覽
 */
@Pipe({
  name: 'stripHtml',
  standalone: true,
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    // 建立一個臨時元素來解析 HTML
    const tmp = document.createElement('DIV');
    tmp.innerHTML = value;
    return tmp.textContent || tmp.innerText || '';
  }
}

/**
 * 高亮搜尋關鍵字管道
 * Highlight Search Terms Pipe
 *
 * 在文字中高亮顯示搜尋關鍵字
 * Highlights search terms in text
 *
 * 教學說明：
 * 使用方式：{{ text | highlight:searchTerm }}
 * 會將符合的文字包裹在 <mark> 標籤中
 */
@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    searchTerm: string | null | undefined,
    caseSensitive: boolean = false
  ): string {
    if (!value || !searchTerm) {
      return value || '';
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(searchTerm, flags);

    return value.replace(regex, (match) => `<mark>${match}</mark>`);
  }
}

/**
 * 複數形式管道
 * Pluralize Pipe
 *
 * 根據數量決定單數或複數形式
 * Determines singular or plural form based on count
 *
 * 教學說明：
 * 使用方式：{{ count | pluralize:'item':'items' }}
 * 或：{{ count | pluralize:'apple' }} // 自動加 s
 */
@Pipe({
  name: 'pluralize',
  standalone: true,
})
export class PluralizePipe implements PipeTransform {
  transform(
    count: number | null | undefined,
    singular: string,
    plural?: string
  ): string {
    if (count === null || count === undefined) {
      return '';
    }

    if (count === 1) {
      return `${count} ${singular}`;
    }

    const pluralForm = plural || `${singular}s`;
    return `${count} ${pluralForm}`;
  }
}

/**
 * 位元組大小格式化管道
 * File Size Pipe
 *
 * 將位元組數轉換為可讀的檔案大小
 * Converts bytes to human-readable file size
 *
 * 教學說明：
 * 1024 → 1 KB
 * 1048576 → 1 MB
 * 1073741824 → 1 GB
 */
@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  private readonly units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  transform(
    bytes: number | null | undefined,
    decimals: number = 2
  ): string {
    if (bytes === null || bytes === undefined || bytes === 0) {
      return '0 B';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + this.units[i]
    );
  }
}

/**
 * 安全 URL 管道
 * Safe URL Pipe
 *
 * 將字串轉換為安全的 URL
 * Converts string to safe URL
 *
 * 教學說明：
 * 用於顯示用戶輸入的 URL，防止 XSS 攻擊
 */
@Pipe({
  name: 'safeUrl',
  standalone: true,
})
export class SafeUrlPipe implements PipeTransform {
  transform(url: string | null | undefined): string {
    if (!url) {
      return '';
    }

    // 基本的 URL 驗證
    try {
      const urlObj = new URL(url);
      // 只允許 http 和 https 協議
      if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
        return url;
      }
    } catch {
      // 如果不是有效的 URL，返回空字串
      return '';
    }

    return '';
  }
}

/**
 * 時間持續時間管道
 * Duration Pipe
 *
 * 將秒數轉換為可讀的時間格式
 * Converts seconds to readable duration format
 *
 * 教學說明：
 * 65 → 1分5秒
 * 3665 → 1小時1分5秒
 */
@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(
    seconds: number | null | undefined,
    format: 'short' | 'long' = 'short'
  ): string {
    if (seconds === null || seconds === undefined || seconds < 0) {
      return '-';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const parts: string[] = [];

    if (hours > 0) {
      parts.push(format === 'short' ? `${hours}h` : `${hours}小時`);
    }

    if (minutes > 0) {
      parts.push(format === 'short' ? `${minutes}m` : `${minutes}分`);
    }

    if (secs > 0 || parts.length === 0) {
      parts.push(format === 'short' ? `${secs}s` : `${secs}秒`);
    }

    return parts.join(' ');
  }
}
