import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsList = await AsyncStorage.getItem(
        '@GoMarketplace:productslist',
      );

      if (productsList) {
        setProducts([...JSON.parse(productsList)]);
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const productExist = products.find(
        productCart => productCart.id === product.id,
      );

      if (productExist) {
        setProducts(
          products.map(productCart =>
            productCart.id
              ? { ...product, quantity: productCart.quantity + 1 }
              : productCart,
          ),
        );
      } else {
        setProducts([...products, { ...product, quantity: 1 }]);
      }

      await AsyncStorage.setItem(
        '@GoMarketplace:productslist',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const newProducts = products.map(productCart =>
        productCart.id === id
          ? { ...productCart, quantity: productCart.quantity + 1 }
          : productCart,
      );

      setProducts(newProducts);

      await AsyncStorage.setItem(
        '@GoMarketplace:productslist',
        JSON.stringify(newProducts),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const deleteProducts = products.map(productCart =>
        productCart.id === id
          ? { ...productCart, quantity: productCart.quantity - 1 }
          : productCart,
      );

      setProducts(deleteProducts);

      await AsyncStorage.setItem(
        '@GoMarketplace:productslist',
        JSON.stringify(deleteProducts),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
