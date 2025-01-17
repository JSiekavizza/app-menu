let cart = [];

const getCart = (req, res) => {
  res.status(200).json(cart);
};

const addToCart = (req, res) => {
  const { producto } = req.body;

  const productExist = cart.find((item) => item.id === producto.id);

  if (productExist) {
    cart = cart.map((item) =>
      item.id === producto.id ? { ...item, quanty: item.quanty + 1 } : item
    );
  } else {
    cart.push({ ...producto, quanty: 1 });
  }

  res.status(201).json(cart);
};

const removeFromCart = (req, res) => {
  const { id } = req.params;

  cart = cart.filter((item) => item.id !== id);

  res.status(200).json(cart);
};

module.exports = { getCart, addToCart, removeFromCart };
