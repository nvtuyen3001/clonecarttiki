const mockData = {
  cartItems: [
    {
      id: 1,
      name: 'Tô Sứ Cực Lớn Dung Soup/Cơm/Canh, Tô Cát Thực Tăng Cao Gó Đĩnh - Cán Cập',
      variant: 'Giao hàng 6 ngày',
      price: 159000,
      originalPrice: 159000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop',
      shopName: 'TUANAUHOME',
      promotion: 'Gói chính xác cực tự khuyến mãi'
    },
    {
      id: 2,
      name: 'Combo chuột phím không dây Logitech MK240 - màu gon: 1 đầu thi USB, không dây 10m, pin đau được trượt...',
      variant: 'Giao hàng 6 ngày',
      price: 448000,
      originalPrice: 448000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=150&h=150&fit=crop',
      shopName: 'NGUYENVUSTORE',
      promotion: 'Gói chính xác cực tự khuyến mãi'
    },
    {
      id: 3,
      name: 'Combo chuột phím không dây Logitech MK240 - màu gon: 1 đầu thi USB, không dây 10m, pin đau được trượt...',
      variant: 'Giao hàng 5 ngày',
      price: 484030,
      originalPrice: 498000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=150&h=150&fit=crop',
      shopName: 'Trong Ân audio',
      promotion: 'Freeship 10k đơn từ 45K, Freeship 25K đơn từ 100K'
    }
  ],
  deliveryInfo: {
    name: 'Vũ Văn Hậu',
    phone: '0981596853',
    address: 'Nhà 4 ngõ 34 vũ trọng khánh, Phường Mỹ Lao, Quận Hà Đông, Hà Nội'
  },
  promotions: [
    {
      id: 1,
      code: 'TIKI',
      description: 'Giảm 3% tối đa...',
      type: 'percentage',
      discount: 3,
      maxDiscount: 50000,
      selected: true
    },
    {
      id: 2,
      code: 'GIFT50',
      description: 'Giảm 50K',
      type: 'fixed',
      discount: 50000,
      selected: true
    }
  ]
};

export default mockData;