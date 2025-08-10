import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import mockData from '../mock/cartData';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setCartItems(mockData.cartItems);
  }, []);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (itemId, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === cartItems.length);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Cart Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="p-4 border-b">
              <h1 className="text-xl font-medium text-gray-800 mb-4">GIỎ HÀNG</h1>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">
                  Tất cả ({cartItems.length} sản phẩm)
                </span>
                <div className="flex space-x-8 ml-auto text-sm text-gray-500">
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  selected={selectedItems.has(item.id)}
                  onSelect={(checked) => handleSelectItem(item.id, checked)}
                  onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            {/* Promotions */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2 text-blue-600 cursor-pointer hover:text-blue-700">
                <span className="text-sm">📋</span>
                <span className="text-sm">Thêm mã khuyến mãi của Shop</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <DeliveryInfo />
            <PromotionCodes />
            <OrderSummary total={calculateTotal()} selectedCount={selectedItems.size} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, selected, onSelect, onUpdateQuantity, onRemove }) => {
  return (
    <div className="p-4 flex items-start space-x-3">
      <Checkbox 
        checked={selected}
        onCheckedChange={onSelect}
      />
      <img 
        src={item.image} 
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-800 mb-1">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{item.variant}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-red-600">
            {item.price.toLocaleString('vi-VN')}đ
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium text-red-600 ml-4">
              {(item.price * item.quantity).toLocaleString('vi-VN')}đ
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeliveryInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Giao tới</span>
        <button className="text-blue-600 text-sm hover:text-blue-700">Thay đổi</button>
      </div>
      <div className="space-y-1">
        <p className="font-medium text-gray-800">Vũ Văn Hậu | 0981596853</p>
        <p className="text-sm text-gray-600">
          Nhà 4 ngõ 34 vũ trọng khánh, Phường Mỹ Lao, Quận Hà Đông, Hà Nội
        </p>
      </div>
      <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-yellow-700">
        Lưu ý: Sử dụng đá chi nhánh hàng trước khi nhập
      </div>
    </div>
  );
};

const PromotionCodes = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">Tiki Khuyến Mãi</span>
        <span className="text-xs text-gray-500">Có thể chọn 2</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 border rounded">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded">TIKI</span>
            <span className="text-sm">Giảm 3% tối đa...</span>
          </div>
          <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
            Bỏ Chọn
          </Button>
        </div>
        <div className="flex items-center justify-between p-2 border rounded">
          <div className="flex items-center space-x-2">
            <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">🎁</span>
            <span className="text-sm">Giảm 50K</span>
          </div>
          <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
            Bỏ Chọn
          </Button>
        </div>
      </div>
      <button className="text-blue-600 text-sm mt-3 hover:text-blue-700">
        📋 Mua thêm để freeship 30K cho...
      </button>
    </div>
  );
};

const OrderSummary = ({ total, selectedCount }) => {
  const savings = 14870;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tiền hàng</span>
          <span className="font-medium">{total.toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Mã khuyến mãi tự Tiki</span>
          <span className="text-green-600">-{savings.toLocaleString('vi-VN')}đ</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-medium">
          <span>Tổng tiền thanh toán</span>
          <span className="text-red-600">{(total - savings).toLocaleString('vi-VN')}đ</span>
        </div>
        <div className="text-xs text-green-600 text-right">
          Tiết kiệm {savings.toLocaleString('vi-VN')}đ
        </div>
        <div className="text-xs text-gray-500 text-right">
          (Đã bao gồm VAT nếu có)
        </div>
      </div>
      
      <Button 
        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        disabled={selectedCount === 0}
      >
        Mua Hàng ({selectedCount})
      </Button>
      
      <div className="mt-4 border-t pt-4">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=150" 
          alt="Promotion Banner"
          className="w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default ShoppingCart;