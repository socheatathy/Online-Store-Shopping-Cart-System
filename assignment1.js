// Product data
const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 1000, stock: 5 },
  { id: 2, name: 'Shirt', category: 'clothing', price: 50, stock: 0 },  
  { id: 3, name: 'Coffee Mug', category: 'accessory', price: 15, stock: 10 },
  { id: 4, name: 'Headphones', category: 'electronics', price: 150, stock: 3 },
];

// Shopping cart
let cart = [
  { itemId: 1, quantity: 2 },
  { itemId: 2, quantity: 1 },  
  { itemId: 3, quantity: -1 },  
  { itemId: 4, quantity: 3 }
];

// User information
const user = { isStudent: true, userId: 123 };

// Function to apply discount for students
function applyDiscount(price, category, isStudent) {
  if (isStudent) {
    if (category === 'electronics') {
      return price * 0.9; 
    } else if (category === 'clothing') {
      return price * 0.85; 
    }
  }
  return price;
}

// Function to calculate the total cost
function calculateTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const cartItem = cart[i];
    const product = products.find(p => p.id === cartItem.itemId);

    if (!product) {
      console.error(`Item ID ${cartItem.itemId} is invalid.`);
      continue;
    }

    // Error handling for negative quantity
    if (cartItem.quantity < 0) {
      console.error(`Invalid quantity for item ID ${cartItem.itemId}. Quantity cannot be negative.`);
      continue;
    }

    // Jumping statement if item is out of stock
    if (product.stock <= 0) {
      console.log(`${product.name} is out of stock. Skipping...`);
      continue;
    }

    // Apply discount based on user status and category
    let discountedPrice = applyDiscount(product.price, product.category, user.isStudent);

    // Add item price to total cost
    total += discountedPrice * cartItem.quantity;
  }

  return total;
}

// Output the total cost
const totalCost = calculateTotal(cart);
console.log(`Total cost: $${totalCost.toFixed(2)}`);
