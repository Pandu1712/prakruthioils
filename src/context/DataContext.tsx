import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, Order, GalleryImage } from '../types';
import { products as initialProducts, categories as initialCategories } from '../data/products';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface DataContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  gallery: GalleryImage[];
  loading: boolean;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updatedProduct: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (id: string, updatedCategory: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  addGalleryImage: (image: Omit<GalleryImage, 'id' | 'createdAt'>) => Promise<void>;
  deleteGalleryImage: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  products: [],
  categories: [],
  orders: [],
  gallery: [],
  loading: true,
  addProduct: async () => {},
  updateProduct: async () => {},
  deleteProduct: async () => {},
  addCategory: async () => {},
  updateCategory: async () => {},
  deleteCategory: async () => {},
  addOrder: async () => {},
  updateOrderStatus: async () => {},
  deleteOrder: async () => {},
  addGalleryImage: async () => {},
  deleteGalleryImage: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize and check for empty database
  useEffect(() => {
    let unsubscribeProducts: () => void;
    let unsubscribeCategories: () => void;
    let unsubscribeOrders: () => void;
    let unsubscribeGallery: () => void;

    const setupDatabase = async () => {
      try {
        const productsCol = collection(db, 'products');
        const categoriesCol = collection(db, 'categories');

        // Check if database is completely empty (needs seeding)
        const productsSnapshot = await getDocs(productsCol);
        if (productsSnapshot.empty) {
          console.log('Migrating initial products...');
          for (const p of initialProducts) {
            await setDoc(doc(db, 'products', p.id), p);
          }
        }

        const categoriesSnapshot = await getDocs(categoriesCol);
        if (categoriesSnapshot.empty) {
          console.log('Migrating initial categories...');
          for (const c of initialCategories) {
            await setDoc(doc(db, 'categories', c.id), c);
          }
        } else {
          const existingIds = categoriesSnapshot.docs.map(d => d.id);
          const defaultIds = initialCategories.map(c => c.id);
          const missing = defaultIds.filter(id => !existingIds.includes(id));
          if (missing.length > 0) {
            console.log("Restoring missing categories:", missing);
            await restoreDefaultCategories();
          }
        }
      } catch (error) {
        console.error("Error setting up database:", error);
      }

      // Start real-time listeners for the app
      unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
        const productsList = snapshot.docs.map(doc => ({
          ...(doc.data() as Product),
          id: doc.id // Ensure we use the actual Firestore document ID
        }));
        setProducts(productsList);
      });

      unsubscribeCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
        const categoriesList = snapshot.docs.map(doc => ({
          ...(doc.data() as Category),
          id: doc.id // Ensure we use the actual Firestore document ID
        }));
        setCategories(categoriesList);
      });

      unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const ordersList = snapshot.docs.map(doc => ({
          ...(doc.data() as Order),
          id: doc.id
        }));
        // Sort by date descending
        ordersList.sort((a, b) => {
          const dateA = a.createdAt?.seconds || 0;
          const dateB = b.createdAt?.seconds || 0;
          return dateB - dateA;
        });
        setOrders(ordersList);
      });

      unsubscribeGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
        const galleryList = snapshot.docs.map(doc => ({
          ...(doc.data() as GalleryImage),
          id: doc.id
        }));
        setGallery(galleryList);
      });

      setLoading(false);
    };

    setupDatabase();

    return () => {
      if (unsubscribeProducts) unsubscribeProducts();
      if (unsubscribeCategories) unsubscribeCategories();
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeGallery) unsubscribeGallery();
    };
  }, []);

  // Product Methods
  const addProduct = async (product: Product) => {
    const id = product.id || `prod-${Date.now()}`;
    await setDoc(doc(db, 'products', id), { ...product, id });
  };

  const updateProduct = async (id: string, updatedProduct: Product) => {
    await setDoc(doc(db, 'products', id), { ...updatedProduct, id });
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error: any) {
      alert("Failed to delete product: " + error.message);
    }
  };

  // Category Methods
  const addCategory = async (category: Category) => {
    const id = category.id || `cat-${Date.now()}`;
    await setDoc(doc(db, 'categories', id), { ...category, id });
  };

  const updateCategory = async (id: string, updatedCategory: Category) => {
    await setDoc(doc(db, 'categories', id), updatedCategory);
  };

  const restoreDefaultCategories = async () => {
    for (const cat of initialCategories) {
      await setDoc(doc(db, 'categories', cat.id), cat);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      console.log(`Attempting to delete category with ID: ${id}`);
      await deleteDoc(doc(db, 'categories', id));
      console.log("Category deleted successfully from database.");
    } catch (error: any) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  // Order Methods
  const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const ordersCol = collection(db, 'orders');
    const newOrderRef = doc(ordersCol);
    await setDoc(newOrderRef, {
      ...order,
      id: newOrderRef.id,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, { status });
  };

  const deleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
    } catch (error: any) {
      alert("Failed to delete order: " + error.message);
    }
  };

  // Gallery Methods
  const addGalleryImage = async (image: Omit<GalleryImage, 'id' | 'createdAt'>) => {
    const galleryCol = collection(db, 'gallery');
    const newRef = doc(galleryCol);
    await setDoc(newRef, {
      ...image,
      id: newRef.id,
      createdAt: serverTimestamp()
    });
  };

  const deleteGalleryImage = async (id: string) => {
    await deleteDoc(doc(db, 'gallery', id));
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        gallery,
        addGalleryImage,
        deleteGalleryImage,
      }}
    >
      {/* We could optionally show a loader if loading === true, but showing children avoids flickering for initial render */}
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
