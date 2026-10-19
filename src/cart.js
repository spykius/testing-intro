function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart = [], item, quantity) {
  if (quantity === 0 || item.stock < quantity) {
    throw new RangeError('Out of range');
  }

  const existed = cart.find(({ id }) => item.id === id);

  if (existed) {
    existed.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  return cart;
}

function changeQuantity() {
  return notImplemented();
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
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
