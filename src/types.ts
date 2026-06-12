/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  colors?: { name: string; hex: string; bgImage?: string }[];
  category: "lip" | "face" | "eye" | "brush" | "pouch" | "skincare";
  description?: string;
  intro?: string;
  bullets?: string[];
  tags?: string[];
  howToUse?: string;
  ingredients?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date?: string;
  type: "text" | "image";
  imageUrl?: string;
}
