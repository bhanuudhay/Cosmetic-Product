// This is a mock service that simulates API calls
// In a real application, these would be actual API calls using axios

// Get data from local storage
const getStoredData = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// Set data to local storage
const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
};

// Initial mock data
const initialCategories = [
  { id: 1, name: "Skincare", image: "skincare.jpg" },
  { id: 2, name: "Makeup", image: "makeup.jpg" },
  { id: 3, name: "Hair Care", image: "haircare.jpg" },
  { id: 4, name: "Fragrances", image: "fragrances.jpg" },
];

const initialProducts = [
  {
    id: 1,
    categoryId: 1,
    name: "Hydrating Face Serum",
    image: "/serum.jpg",
    manufacturer: "GlowLabs",
    weight: "30ml",
    price: 29.99,
    discount: 10,
    available: true,
    description:
      "Intensive hydrating serum with hyaluronic acid for all skin types.",
    variants: [
      { size: "15ml", price: 14.99, available: true },
      { size: "30ml", price: 29.99, available: true },
      { size: "50ml", price: 39.99, available: false },
    ],
  },
  {
    id: 2,
    categoryId: 1,
    name: "Vitamin C Moisturizer",
    image: "moisturizer.jpg",
    manufacturer: "GlowLabs",
    weight: "50ml",
    price: 24.99,
    discount: 0,
    available: true,
    description: "Brightening moisturizer with Vitamin C for radiant skin.",
    variants: [],
  },
  {
    id: 3,
    categoryId: 2,
    name: "Long-lasting Foundation",
    image: "foundation.jpg",
    manufacturer: "BeautyBlend",
    weight: "30ml",
    price: 34.99,
    discount: 15,
    available: true,
    description: "Full coverage, 24-hour wear foundation for all skin types.",
    variants: [
      { shade: "Light", price: 34.99, available: true },
      { shade: "Medium", price: 34.99, available: true },
      { shade: "Dark", price: 34.99, available: true },
    ],
  },
  {
    id: 4,
    categoryId: 2,
    name: "Volumizing Mascara",
    image: "mascara.jpg",
    manufacturer: "BeautyBlend",
    weight: "10ml",
    price: 19.99,
    discount: 0,
    available: true,
    description: "Adds dramatic volume and length to lashes without clumping.",
    variants: [],
  },
  {
    id: 5,
    categoryId: 3,
    name: "Repair Shampoo",
    image: "shampoo.jpg",
    manufacturer: "HairRevive",
    weight: "250ml",
    price: 15.99,
    discount: 0,
    available: true,
    description: "Nourishing shampoo for damaged hair with argan oil.",
    variants: [
      { size: "250ml", price: 15.99, available: true },
      { size: "500ml", price: 25.99, available: true },
    ],
  },
  {
    id: 6,
    categoryId: 4,
    name: "Floral Eau de Parfum",
    image: "perfume.jpg",
    manufacturer: "ScentSations",
    weight: "50ml",
    price: 49.99,
    discount: 5,
    available: true,
    description: "Delicate floral fragrance with notes of jasmine and rose.",
    variants: [
      { size: "30ml", price: 34.99, available: true },
      { size: "50ml", price: 49.99, available: true },
      { size: "100ml", price: 79.99, available: false },
    ],
  },
];

// Initialize storage with mock data if empty
const initializeStorage = () => {
  if (!localStorage.getItem("categories")) {
    setStoredData("categories", initialCategories);
  }

  if (!localStorage.getItem("products")) {
    setStoredData("products", initialProducts);
  }
};

// Product Service methods
export const productService = {
  // Initialize the storage with default data
  init: () => {
    initializeStorage();
    return Promise.resolve();
  },

  // Category methods
  getCategories: () => {
    initializeStorage();
    const categories = getStoredData("categories", []);
    return Promise.resolve(categories);
  },

  getCategoryById: (id) => {
    const categories = getStoredData("categories", []);
    const category = categories.find((cat) => cat.id === id);
    return Promise.resolve(category);
  },

  createCategory: (category) => {
    const categories = getStoredData("categories", []);
    const newCategory = {
      ...category,
      id: Math.max(0, ...categories.map((c) => c.id)) + 1,
    };
    const updatedCategories = [...categories, newCategory];
    setStoredData("categories", updatedCategories);
    return Promise.resolve(newCategory);
  },

  updateCategory: (id, categoryData) => {
    const categories = getStoredData("categories", []);
    const updatedCategories = categories.map((cat) =>
      cat.id === id ? { ...cat, ...categoryData } : cat
    );
    setStoredData("categories", updatedCategories);
    return Promise.resolve(updatedCategories.find((cat) => cat.id === id));
  },

  deleteCategory: (id) => {
    const categories = getStoredData("categories", []);
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setStoredData("categories", updatedCategories);

    // Also remove products in this category
    const products = getStoredData("products", []);
    const updatedProducts = products.filter((prod) => prod.categoryId !== id);
    setStoredData("products", updatedProducts);

    return Promise.resolve({ success: true });
  },

  // Product methods
  getProducts: () => {
    initializeStorage();
    const products = getStoredData("products", []);
    return Promise.resolve(products);
  },

  getProductsByCategory: (categoryId) => {
    const products = getStoredData("products", []);
    const filteredProducts = products.filter(
      (prod) => prod.categoryId === categoryId
    );
    return Promise.resolve(filteredProducts);
  },

  getProductById: (id) => {
    const products = getStoredData("products", []);
    const product = products.find((prod) => prod.id === id);
    return Promise.resolve(product);
  },

  createProduct: (product) => {
    const products = getStoredData("products", []);
    const newProduct = {
      ...product,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
    };
    const updatedProducts = [...products, newProduct];
    setStoredData("products", updatedProducts);
    return Promise.resolve(newProduct);
  },

  updateProduct: (id, productData) => {
    const products = getStoredData("products", []);
    const updatedProducts = products.map((prod) =>
      prod.id === id ? { ...prod, ...productData } : prod
    );
    setStoredData("products", updatedProducts);
    return Promise.resolve(updatedProducts.find((prod) => prod.id === id));
  },

  deleteProduct: (id) => {
    const products = getStoredData("products", []);
    const updatedProducts = products.filter((prod) => prod.id !== id);
    setStoredData("products", updatedProducts);
    return Promise.resolve({ success: true });
  },
};

export default productService;
