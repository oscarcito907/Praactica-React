import { Product } from '../shared/types';

let mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 17 Pro",
    price: 1200,
    description: "Último modelo de Apple en perfecto estado.",
    isOnSale: false,
    tags: ["mobile", "lifestyle"],
    userId: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "MacBook Air M3",
    price: 1050,
    description: "Ideal para desarrollo web, música y diseño.",
    isOnSale: true,
    tags: ["work", "lifestyle"],
    userId: 1,
    createdAt: new Date().toISOString()
  }
];

export const api = {
  login: async (credentials: any) => {
    return { accessToken: 'mock-local-token-success' };
  },

  getProducts: async (): Promise<Product[]> => {
    return [...mockProducts];
  },

  getProduct: async (id: string | number): Promise<Product> => {
    const product = mockProducts.find(p => p.id === Number(id));
    if (!product) throw new Error('Producto no encontrado');
    return { ...product };
  },

  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    const newProduct: Product = {
      id: mockProducts.length > 0 ? Math.max(...mockProducts.map(p => p.id)) + 1 : 1,
      name: productData.name || '',
      price: Number(productData.price) || 0,
      description: productData.description || '',
      isOnSale: !!productData.isOnSale,
      tags: productData.tags || [],
      userId: 1,
      createdAt: new Date().toISOString()
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  deleteProduct: async (id: string | number): Promise<void> => {
    mockProducts = mockProducts.filter(p => p.id !== Number(id));
  },

  getTags: async (): Promise<string[]> => {
    return ["motor", "work", "lifestyle", "mobile", "motorcycle"];
  }
};