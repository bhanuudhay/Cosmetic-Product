import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // In a real application, you would fetch this data from an API
  // For this demo, we'll use mock data initially and later set up mock API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // This would be replaced with real API calls in production
        //yeh images ke liya hai
        const mockCategories = [
          { id: 1, name: "Skincare", image: "/skincare.jpg" },
          { id: 2, name: "Makeup", image: "/makeup.jpg" },
          { id: 3, name: "Hair Care", image: "/haircare.jpg" },
          { id: 4, name: "Fragrances", image: "/frag.jpg" },
          { id: 5, name: "Bath & Body", image: "/bath.jpg" },
          { id: 6, name: "Men's Grooming", image: "/mengr.jpg" },
          { id: 7, name: "Ayurvedic", image: "/ayur.jpg" },
        ];

        const mockProducts = [
          // SKINCARE PRODUCTS
          {
            id: 1,
            categoryId: 1,
            name: "Hydrating Face Serum",
            image: "/hyfc.jpg",
            manufacturer: "GlowLabs",
            weight: "30ml",
            price: 1299,
            discount: 10,
            available: true,
            description:
              "Intensive hydrating serum with hyaluronic acid for all skin types.",
            variants: [
              { size: "15ml", price: 799, available: true },
              { size: "30ml", price: 1299, available: true },
              { size: "50ml", price: 1999, available: false },
            ],
          },
          {
            id: 2,
            categoryId: 1,
            name: "Vitamin C Moisturizer",
            image: "/vtc.jpg",
            manufacturer: "GlowLabs",
            weight: "50ml",
            price: 899,
            discount: 0,
            available: true,
            description:
              "Brightening moisturizer with Vitamin C for radiant skin.",
            variants: [],
          },
          {
            id: 3,
            categoryId: 1,
            name: "Niacinamide Facial Toner",
            image: "/ncmd.jpg",
            manufacturer: "Derma Essentials",
            weight: "200ml",
            price: 499,
            discount: 5,
            available: true,
            description:
              "Alcohol-free toner that minimizes pores and refines skin texture.",
            variants: [],
          },
          {
            id: 4,
            categoryId: 1,
            name: "Clay Face Mask",
            image: "/clfc.jpg",
            manufacturer: "GlowLabs",
            weight: "100g",
            price: 599,
            discount: 0,
            available: true,
            description:
              "Deep cleansing clay mask that detoxifies and purifies skin.",
            variants: [],
          },
          {
            id: 5,
            categoryId: 1,
            name: "Anti-Aging Night Cream",
            image: "/aagc.jpg",
            manufacturer: "Derma Essentials",
            weight: "50ml",
            price: 1499,
            discount: 15,
            available: true,
            description:
              "Luxurious night cream that reduces fine lines and wrinkles while you sleep.",
            variants: [],
          },

          // MAKEUP PRODUCTS
          {
            id: 6,
            categoryId: 2,
            name: "Long-lasting Foundation",
            image: "/llf.jpg",
            manufacturer: "BeautyBlend",
            weight: "30ml",
            price: 1299,
            discount: 15,
            available: true,
            description:
              "Full coverage, 24-hour wear foundation for all skin types.",
            variants: [
              { shade: "Light", price: 1299, available: true },
              { shade: "Medium", price: 1299, available: true },
              { shade: "Dark", price: 1299, available: true },
            ],
          },
          {
            id: 7,
            categoryId: 2,
            name: "Volumizing Mascara",
            image: "/vmm.jpg",
            manufacturer: "BeautyBlend",
            weight: "10ml",
            price: 799,
            discount: 0,
            available: true,
            description:
              "Adds dramatic volume and length to lashes without clumping.",
            variants: [],
          },
          {
            id: 8,
            categoryId: 2,
            name: "Matte Lipstick",
            image: "/ml.jpg",
            manufacturer: "BeautyBlend",
            weight: "4g",
            price: 599,
            discount: 10,
            available: true,
            description:
              "Long-lasting matte lipstick that doesn't dry out your lips.",
            variants: [
              { shade: "Red Velvet", price: 599, available: true },
              { shade: "Mauve Pink", price: 599, available: true },
              { shade: "Nude Beige", price: 599, available: true },
              { shade: "Berry Wine", price: 599, available: true },
            ],
          },
          {
            id: 9,
            categoryId: 2,
            name: "Eyeshadow Palette",
            image: "/eys.jpg",
            manufacturer: "ColorPop",
            weight: "15g",
            price: 1199,
            discount: 0,
            available: true,
            description:
              "Versatile eyeshadow palette with 12 highly pigmented shades.",
            variants: [
              { shade: "Neutral", price: 1199, available: true },
              { shade: "Smoky", price: 1199, available: true },
              { shade: "Warm Tone", price: 1199, available: false },
            ],
          },
          {
            id: 10,
            categoryId: 2,
            name: "Liquid Eyeliner",
            image: "/lq.jpg",
            manufacturer: "ColorPop",
            weight: "5ml",
            price: 499,
            discount: 0,
            available: true,
            description:
              "Waterproof liquid eyeliner with a precision tip for perfect application.",
            variants: [],
          },

          // HAIR CARE PRODUCTS
          {
            id: 11,
            categoryId: 3,
            name: "Repair Shampoo",
            image: "/sh.jpg",
            manufacturer: "HairRevive",
            weight: "250ml",
            price: 499,
            discount: 0,
            available: true,
            description: "Nourishing shampoo for damaged hair with argan oil.",
            variants: [
              { size: "250ml", price: 499, available: true },
              { size: "500ml", price: 899, available: true },
            ],
          },
          {
            id: 12,
            categoryId: 3,
            name: "Repair Conditioner",
            image: "/rp.jpg",
            manufacturer: "HairRevive",
            weight: "250ml",
            price: 549,
            discount: 0,
            available: true,
            description:
              "Nourishing conditioner that pairs with our Repair Shampoo.",
            variants: [
              { size: "250ml", price: 549, available: true },
              { size: "500ml", price: 949, available: true },
            ],
          },
          {
            id: 13,
            categoryId: 3,
            name: "Hair Mask Treatment",
            image: "/hair-mask.jpg",
            manufacturer: "HairRevive",
            weight: "200ml",
            price: 799,
            discount: 5,
            available: true,
            description: "Intensive weekly treatment for dry and damaged hair.",
            variants: [],
          },
          {
            id: 14,
            categoryId: 3,
            name: "Hair Styling Gel",
            image: "/hair-gel.jpg",
            manufacturer: "StyleMasters",
            weight: "150ml",
            price: 349,
            discount: 0,
            available: true,
            description:
              "Medium-hold styling gel that doesn't leave hair stiff or flaky.",
            variants: [],
          },
          {
            id: 15,
            categoryId: 3,
            name: "Anti-Frizz Serum",
            image: "/hair-serum.jpg",
            manufacturer: "StyleMasters",
            weight: "100ml",
            price: 649,
            discount: 10,
            available: true,
            description: "Smoothing serum that tames frizz and adds shine.",
            variants: [],
          },

          // FRAGRANCES
          {
            id: 16,
            categoryId: 4,
            name: "Floral Eau de Parfum",
            image: "/perfume.jpg",
            manufacturer: "ScentSations",
            weight: "50ml",
            price: 1999,
            discount: 5,
            available: true,
            description:
              "Delicate floral fragrance with notes of jasmine and rose.",
            variants: [
              { size: "30ml", price: 1499, available: true },
              { size: "50ml", price: 1999, available: true },
              { size: "100ml", price: 2999, available: false },
            ],
          },
          {
            id: 17,
            categoryId: 4,
            name: "Citrus Body Mist",
            image: "/body-mist.jpg",
            manufacturer: "ScentSations",
            weight: "200ml",
            price: 699,
            discount: 0,
            available: true,
            description:
              "Refreshing body mist with citrus and green tea notes.",
            variants: [],
          },
          {
            id: 18,
            categoryId: 4,
            name: "Woody Eau de Toilette",
            image: "/edt.jpg",
            manufacturer: "ScentSations",
            weight: "100ml",
            price: 1799,
            discount: 15,
            available: true,
            description:
              "Sophisticated fragrance with sandalwood and cedar notes.",
            variants: [
              { size: "50ml", price: 1199, available: true },
              { size: "100ml", price: 1799, available: true },
            ],
          },
          {
            id: 19,
            categoryId: 4,
            name: "Oriental Perfume Oil",
            image: "/perfume-oil.jpg",
            manufacturer: "AromaCraft",
            weight: "15ml",
            price: 899,
            discount: 0,
            available: true,
            description:
              "Long-lasting oil-based perfume with exotic spice notes.",
            variants: [],
          },
          {
            id: 20,
            categoryId: 4,
            name: "Fresh Linen Room Spray",
            image: "/room-spray.jpg",
            manufacturer: "AromaCraft",
            weight: "200ml",
            price: 449,
            discount: 0,
            available: true,
            description: "Clean, fresh scent for home or office spaces.",
            variants: [],
          },

          // BATH & BODY
          {
            id: 21,
            categoryId: 5,
            name: "Moisturizing Body Wash",
            image: "/body-wash.jpg",
            manufacturer: "Pure Bliss",
            weight: "400ml",
            price: 399,
            discount: 0,
            available: true,
            description: "Creamy body wash with shea butter and almond oil.",
            variants: [
              { scent: "Lavender", price: 399, available: true },
              { scent: "Coconut", price: 399, available: true },
              { scent: "Vanilla", price: 399, available: true },
            ],
          },
          {
            id: 22,
            categoryId: 5,
            name: "Body Scrub",
            image: "/body-scrub.jpg",
            manufacturer: "Pure Bliss",
            weight: "200g",
            price: 599,
            discount: 10,
            available: true,
            description:
              "Exfoliating scrub with natural sugar and essential oils.",
            variants: [
              { scent: "Coffee", price: 599, available: true },
              { scent: "Rose", price: 599, available: true },
            ],
          },
          {
            id: 23,
            categoryId: 5,
            name: "Hand Cream",
            image: "/hand-cream.jpg",
            manufacturer: "Pure Bliss",
            weight: "75ml",
            price: 249,
            discount: 0,
            available: true,
            description: "Fast-absorbing hand cream that softens and protects.",
            variants: [],
          },
          {
            id: 24,
            categoryId: 5,
            name: "Foot Spa Set",
            image: "/foot-spa.jpg",
            manufacturer: "Pure Bliss",
            weight: "350g",
            price: 799,
            discount: 5,
            available: true,
            description: "Complete foot care set with scrub, soak, and cream.",
            variants: [],
          },
          {
            id: 25,
            categoryId: 5,
            name: "Luxury Bath Bombs",
            image: "/bath-bombs.jpg",
            manufacturer: "AromaCraft",
            weight: "120g x 4",
            price: 699,
            discount: 0,
            available: true,
            description:
              "Set of 4 colorful, fragrant bath bombs with essential oils.",
            variants: [],
          },

          // MEN'S GROOMING
          {
            id: 26,
            categoryId: 6,
            name: "Beard Oil",
            image: "/beard-oil.jpg",
            manufacturer: "ManCraft",
            weight: "30ml",
            price: 599,
            discount: 0,
            available: true,
            description:
              "Nourishing oil that softens beard hair and moisturizes skin.",
            variants: [
              { scent: "Sandalwood", price: 599, available: true },
              { scent: "Unscented", price: 599, available: true },
            ],
          },
          {
            id: 27,
            categoryId: 6,
            name: "Beard Wash",
            image: "/beard-wash.jpg",
            manufacturer: "ManCraft",
            weight: "150ml",
            price: 499,
            discount: 0,
            available: true,
            description:
              "Specially formulated wash that cleans without drying beard hair.",
            variants: [],
          },
          {
            id: 28,
            categoryId: 6,
            name: "Men's Face Wash",
            image: "/men-face-wash.jpg",
            manufacturer: "ManCraft",
            weight: "100ml",
            price: 349,
            discount: 0,
            available: true,
            description: "Deep-cleansing face wash for men's skin.",
            variants: [],
          },
          {
            id: 29,
            categoryId: 6,
            name: "Hair Styling Pomade",
            image: "/pomade.jpg",
            manufacturer: "StyleMasters",
            weight: "100g",
            price: 499,
            discount: 5,
            available: true,
            description:
              "Medium-hold pomade for classic styles with natural finish.",
            variants: [],
          },
          {
            id: 30,
            categoryId: 6,
            name: "Aftershave Balm",
            image: "/aftershave.jpg",
            manufacturer: "ManCraft",
            weight: "100ml",
            price: 399,
            discount: 0,
            available: true,
            description:
              "Alcohol-free balm that soothes and moisturizes post-shave.",
            variants: [],
          },

          // AYURVEDIC
          {
            id: 31,
            categoryId: 7,
            name: "Neem Face Wash",
            image: "/neem-face-wash.jpg",
            manufacturer: "Ayur Naturals",
            weight: "100ml",
            price: 299,
            discount: 0,
            available: true,
            description:
              "Traditional face wash with neem and turmeric for clear skin.",
            variants: [],
          },
          {
            id: 32,
            categoryId: 7,
            name: "Aloe Vera Gel",
            image: "/aloe.jpg",
            manufacturer: "Ayur Naturals",
            weight: "150ml",
            price: 249,
            discount: 0,
            available: true,
            description: "Pure aloe vera gel for skin and hair health.",
            variants: [
              { size: "150ml", price: 249, available: true },
              { size: "300ml", price: 449, available: true },
            ],
          },
          {
            id: 33,
            categoryId: 7,
            name: "Herbal Hair Oil",
            image: "/hhr.jpg",
            manufacturer: "Ayur Naturals",
            weight: "200ml",
            price: 349,
            discount: 5,
            available: true,
            description:
              "Traditional oil blend with amla, brahmi, and bhringraj.",
            variants: [],
          },
          {
            id: 34,
            categoryId: 7,
            name: "Ubtan Face Mask",
            image: "/ubt.jpg",
            manufacturer: "Ayur Naturals",
            weight: "100g",
            price: 399,
            discount: 0,
            available: true,
            description:
              "Traditional herbal face pack with turmeric and gram flour.",
            variants: [],
          },
          {
            id: 35,
            categoryId: 7,
            name: "Kumkumadi Oil",
            image: "/kuk.jpg",
            manufacturer: "Ayur Naturals",
            weight: "30ml",
            price: 1299,
            discount: 10,
            available: true,
            description:
              "Luxurious ayurvedic facial oil with saffron for glowing skin.",
            variants: [],
          },
        ];

        setCategories(mockCategories);
        setProducts(mockProducts);
        setSelectedCategory(mockCategories[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter((product) => product.categoryId === categoryId);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const selectCategoryByName = (categoryName) => {
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (category) {
      setSelectedCategory(category.id);
      return true;
    }
    return false;
  };

  const value = {
    categories,
    products,
    selectedCategory,
    selectedProduct,
    loading,
    error,
    isModalOpen,
    setSelectedCategory,
    getProductsByCategory,
    openProductModal,
    closeProductModal,
    selectCategoryByName,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContext;
