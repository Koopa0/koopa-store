/**
 * 商品詳情元件
 * Product Detail Component
 *
 * 顯示單一商品的詳細資訊
 * Displays detailed information for a single product
 *
 * 教學重點 / Teaching Points:
 * 1. 路由參數的接收
 * 2. 商品資訊展示
 * 3. 圖片輪播
 * 4. 商品規格選擇
 * 5. 購物車功能整合
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-detail-page">
      <h1>商品詳情頁面（待開發）</h1>
      <p>Product ID: {{ productId() }}</p>
    </div>
  `,
  styles: [`
    .product-detail-page {
      padding: 2rem;
    }
  `],
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  public readonly productId = signal<string>('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId.set(id);
    }
  }
}
