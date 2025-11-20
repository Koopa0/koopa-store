# 專案問題修復清單
# Project Issues Fix List

## 發現的問題

### 1. ✅ 首頁商品卡片點擊進入詳情頁顯示「商品顯示失敗」
**原因**: 首頁使用的商品 ID (`prod-1`, `prod-2`) 與 ProductService 的 ID (`1`, `2`) 不一致

**修復方式**:
- 將 `src/app/pages/home/home.component.ts` 中的商品 ID 改為 `1`, `2`, `3`, `4`, `5`
- 確保與 `src/app/features/product/services/product.service.ts` 的 MOCK_PRODUCTS 一致

### 2. ✅ 結帳送出訂單報錯 (Cannot access 'order' before initialization)
**原因**: `order.service.ts` 第 453 行在定義 `order` 常數時，在其內部引用了 `order.id`

**修復方式**:
```typescript
// 修復前 (第 453 行)
items: mockItems.map(item => ({ ...item, orderId: order.id })),

// 修復後
// 先生成 orderId
const orderId = crypto.randomUUID();

// 修改 mockItems
const itemsWithOrderId = mockItems.map(item => ({
  ...item,
  orderId,
}));

// 然後使用這個 orderId 建立 order
const order: OrderDetail = {
  id: orderId,
  ...
  items: itemsWithOrderId,
};
```

### 3. ⚠️ 結帳表單每次都要重新填寫
**原因**: 未從使用者資料或地址列表自動帶入

**修復方式**:
- 從 AddressService 取得用戶的預設地址
- 自動填入表單
- 允許用戶選擇已儲存的地址

### 4. ⚠️ Google Pay icon 無法顯示
**原因**: Material Icons 可能沒有 Google Pay 的圖示

**修復方式**:
- 使用自訂 SVG 圖示
- 或使用替代的 Material Icon (如 `payment`)

### 5. ⚠️ 分類功能未實作
**原因**: 只有分類頁面路由，但沒有實際的篩選功能

**修復方式**:
- 在商品列表頁面加入分類參數
- 實作左側分類導航欄
- 根據分類篩選商品

### 6. ⚠️ 商品資料太少
**當前**: 只有 5 個商品

**建議**: 擴充到至少 20-30 個商品，涵蓋多個分類

### 7. ⚠️ 預設路由導向登入頁
**原因**: `app.routes.ts` 的預設路由設定不正確

**修復方式**:
- 將空路徑 (`''`) 導向首頁 (`/home`)
- 登入頁只在需要認證時才自動導向

## 修復優先順序

### 高優先級 (Critical)
1. ✅ 首頁商品 ID 不一致 → 影響核心功能
2. ✅ 訂單建立錯誤 → 影響結帳流程

### 中優先級 (Important)
3. 結帳表單自動填入 → 改善 UX
4. 預設路由設定 → 改善導航體驗
5. 建立更多商品資料 → 提升專案完整度

### 低優先級 (Nice to Have)
6. Google Pay icon
7. 分類導航欄UI改進
8. 分類頁面功能實作

## 修復進度

- [x] 分析所有問題
- [ ] 修復首頁商品 ID
- [ ] 修復訂單建立錯誤
- [ ] 結帳表單自動填入
- [ ] 修改預設路由
- [ ] 建立更多商品資料
- [ ] 實作左側分類導航
- [ ] 修復 Google Pay icon

