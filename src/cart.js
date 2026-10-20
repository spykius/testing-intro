function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart = [], item, quantity) {
  if (quantity === 0 || item.stock < quantity) {
    throw new RangeError('Out of range');
  }

  const existed = cart.find(({ id }) => item.id === id);

  if (existed) {
    if (existed.quantity + quantity <= existed.stock) {
      existed.quantity += quantity;
    } else {
      throw new RangeError('Out of range');
    }
  } else {
    cart.push({ ...item, quantity });
  }

  return cart;
}

function changeQuantity(cart, itemId, quantity) {
  if (quantity === 0) {
    throw new RangeError('Out of range');
  }

  const existed = cart.find(({ id }) => itemId === id);
  if (existed) {
    if (quantity > existed.stock) {
      throw new RangeError('Out of range');
    }
    existed.quantity = quantity;
  }

  return cart;
}

function removeFromCart(cart, itemId) {
  const index = cart.findIndex(({ id }) => itemId === id);
  cart.splice(index, 1);
  return cart;
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promo) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  if (promo === 'SAVE10') {
    discount = subtotal >= 20000 ? subtotal * 0.1 : 0;
  }
  const delivery = subtotal > 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
