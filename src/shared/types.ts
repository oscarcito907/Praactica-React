export interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
  image?: string;
  isOnSale: boolean;
  description: string;
  userId: number;
  createdAt: string;
}

export interface Credentials {
  email: string;
  password: string;
}