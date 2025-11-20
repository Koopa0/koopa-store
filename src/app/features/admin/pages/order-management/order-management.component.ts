/**
 * 訂單管理組件（佔位符）
 * Order Management Component (Placeholder)
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div style="padding: 2rem;">
      <h1>訂單管理</h1>
      <mat-card>
        <mat-card-content>
          <p>訂單管理功能開發中...</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class OrderManagementComponent {}
