/**
 * 首頁元件
 * Home Page Component
 *
 * 顯示推薦商品、最新商品、分類等
 * Display featured products, new arrivals, categories, etc.
 */

import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';

// ngx-translate
import { TranslateModule } from '@ngx-translate/core';

// Services
import { LoggerService } from '@core/services';

// Pipes
import { CurrencyFormatPipe } from '@shared/pipes';

// Models
import { ProductListItem } from '@core/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatGridListModule,
    CurrencyFormatPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly logger = inject(LoggerService);
  private readonly router = inject(Router);

  /**
   * 精選商品
   * Featured products
   */
  featuredProducts = signal<ProductListItem[]>([]);

  /**
   * 最新商品
   * New arrivals
   */
  newArrivals = signal<ProductListItem[]>([]);

  /**
   * 熱門分類
   * Popular categories
   */
  categories = signal([
    { id: '1', name: '電子產品', icon: 'devices', slug: 'electronics' },
    { id: '2', name: '服飾配件', icon: 'checkroom', slug: 'fashion' },
    { id: '3', name: '家居生活', icon: 'home', slug: 'home-living' },
    { id: '4', name: '運動健身', icon: 'sports_soccer', slug: 'sports' },
    { id: '5', name: '美妝保養', icon: 'face', slug: 'beauty' },
    { id: '6', name: '書籍文具', icon: 'menu_book', slug: 'books' },
  ]);

  ngOnInit(): void {
    this.loadFeaturedProducts();
    this.loadNewArrivals();
    this.logger.info('[HomeComponent] Initialized');
  }

  /**
   * 載入精選商品
   * Load featured products
   */
  private loadFeaturedProducts(): void {
    // TODO: 從 API 載入實際數據
    // 現在使用模擬數據
    const mockProducts: ProductListItem[] = [
      {
        id: 'prod-1',
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        sku: 'APPLE-IP15P-128',
        price: 36900,
        primaryImageUrl: 'https://picsum.photos/seed/iphone/400/400',
        images: [],
        stockQuantity: 50,
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-2',
        name: 'MacBook Pro 14"',
        slug: 'macbook-pro-14',
        sku: 'APPLE-MBP14-512',
        price: 59900,
        primaryImageUrl: 'https://picsum.photos/seed/macbook/400/400',
        images: [],
        stockQuantity: 30,
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-3',
        name: 'AirPods Pro 2',
        slug: 'airpods-pro-2',
        sku: 'APPLE-APP2-WHITE',
        price: 7990,
        primaryImageUrl: 'https://picsum.photos/seed/airpods/400/400',
        images: [],
        stockQuantity: 100,
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-4',
        name: 'Apple Watch Series 9',
        slug: 'apple-watch-9',
        sku: 'APPLE-AWS9-GPS',
        price: 12900,
        primaryImageUrl: 'https://picsum.photos/seed/watch/400/400',
        images: [],
        stockQuantity: 75,
        isActive: true,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.featuredProducts.set(mockProducts);
  }

  /**
   * 載入最新商品
   * Load new arrivals
   */
  private loadNewArrivals(): void {
    // TODO: 從 API 載入實際數據
    const mockProducts: ProductListItem[] = [
      {
        id: 'prod-5',
        name: 'iPad Air',
        slug: 'ipad-air',
        sku: 'APPLE-IPA-64',
        price: 19900,
        primaryImageUrl: 'https://picsum.photos/seed/ipad/400/400',
        images: [],
        stockQuantity: 60,
        isActive: true,
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-6',
        name: 'Magic Keyboard',
        slug: 'magic-keyboard',
        sku: 'APPLE-MK-WHITE',
        price: 3290,
        primaryImageUrl: 'https://picsum.photos/seed/keyboard/400/400',
        images: [],
        stockQuantity: 120,
        isActive: true,
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-7',
        name: 'HomePod mini',
        slug: 'homepod-mini',
        sku: 'APPLE-HPM-BLACK',
        price: 3000,
        primaryImageUrl: 'https://picsum.photos/seed/homepod/400/400',
        images: [],
        stockQuantity: 85,
        isActive: true,
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-8',
        name: 'AirTag 4 pack',
        slug: 'airtag-4pack',
        sku: 'APPLE-AT-4PK',
        price: 3590,
        primaryImageUrl: 'https://picsum.photos/seed/airtag/400/400',
        images: [],
        stockQuantity: 200,
        isActive: true,
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    this.newArrivals.set(mockProducts);
  }

  /**
   * 前往商品詳情
   * Go to product detail
   */
  goToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  /**
   * 前往分類
   * Go to category
   */
  goToCategory(categorySlug: string): void {
    this.router.navigate(['/categories', categorySlug]);
  }

  /**
   * 前往所有商品
   * Go to all products
   */
  goToAllProducts(): void {
    this.router.navigate(['/products']);
  }
}
