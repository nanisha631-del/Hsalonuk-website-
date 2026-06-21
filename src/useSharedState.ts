/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Product, CartItem } from "./types";

interface SharedState {
  currentView: "home" | "product" | "shop_all" | "bestsellers" | "about" | "contact" | "order-success";
  selectedProductId: string;
  cartOpen: boolean;
  searchOpen: boolean;
  cartItems: CartItem[];
  shopifyModalOpen: boolean;
  bestsellersTab: "BESTSELLERS" | "WHATS HOT";
  selectedCategory: string;
}

const listeners = new Set<() => void>();

let globalState: SharedState = {
  currentView: "home",
  selectedProductId: "halo-highlighter",
  cartOpen: false,
  searchOpen: false,
  cartItems: [],
  shopifyModalOpen: false,
  bestsellersTab: "BESTSELLERS",
  selectedCategory: "all",
};

// Seed initial cart item list from local storage securely
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("phenomena-cart-items");
    if (saved) {
      globalState.cartItems = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Could not load checkout state from cache", e);
  }

  // Synchronize dynamic routing on load based on browser pathing
  const path = window.location.pathname.toLowerCase();
  if (path.includes("/order-success") || path.endsWith("/order-success")) {
    globalState.currentView = "order-success";
  } else if (path.includes("/products/") || path.includes("/product/")) {
    let matchedId = "halo-highlighter";
    if (path.includes("serum") || path.includes("treatment") || path.includes("snail-silk-serum")) {
      matchedId = "snail-silk-serum";
    } else if (path.includes("masque") || path.includes("mask") || path.includes("snail-silk-scalp-mask")) {
      matchedId = "snail-silk-scalp-mask";
    } else if (path.includes("lust") || path.includes("gold-lust") || path.includes("scalp-oil")) {
      matchedId = "snail-silk-scalp-oil";
    } else if (path.includes("recovery") || path.includes("face-oil")) {
      matchedId = "ground-recovery-oil";
    } else if (path.includes("body-oil") || path.includes("active-body") || path.includes("gym")) {
      matchedId = "gym-silk";
    } else if (path.includes("elixir") || path.includes("ultime") || path.includes("highlighter") || path.includes("halo")) {
      matchedId = "halo-highlighter";
    } else if (path.includes("drops") || path.includes("booster") || path.includes("mascara")) {
      matchedId = "color-mascara";
    }
    globalState.selectedProductId = matchedId;
    globalState.currentView = "product";
  }
}

export function useSharedState() {
  const [state, setState] = useState<SharedState>(globalState);

  useEffect(() => {
    const callback = () => setState({ ...globalState });
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }, []);

  const updateState = (updates: Partial<SharedState> | ((prev: SharedState) => Partial<SharedState>)) => {
    const calculated = typeof updates === "function" ? updates(globalState) : updates;
    globalState = { ...globalState, ...calculated };

    if (calculated.cartItems) {
      try {
        localStorage.setItem("phenomena-cart-items", JSON.stringify(globalState.cartItems));
      } catch (e) {
        console.error("Local storage sync error:", e);
      }
    }

    listeners.forEach((listener) => listener());
  };

  // Helper Cart Handlers for global components
  const handleAddToCart = (product: Product, quantity: number, color?: string) => {
    const prev = globalState.cartItems;
    const idx = prev.findIndex(
      (item) => item.product.id === product.id && item.selectedColor === color
    );
    let newItems: CartItem[];
    if (idx > -1) {
      newItems = [...prev];
      newItems[idx].quantity += quantity;
    } else {
      newItems = [...prev, { product, quantity, selectedColor: color }];
    }
    updateState({ cartItems: newItems, cartOpen: true });
  };

  const handleUpdateQuantity = (id: string, color: string | undefined, qty: number) => {
    const prev = globalState.cartItems;
    const newItems = prev.map((item) =>
      item.product.id === id && item.selectedColor === color
        ? { ...item, quantity: Math.max(1, qty) }
        : item
    );
    updateState({ cartItems: newItems });
  };

  const handleRemoveItem = (id: string, color: string | undefined) => {
    const prev = globalState.cartItems;
    const newItems = prev.filter((item) => !(item.product.id === id && item.selectedColor === color));
    updateState({ cartItems: newItems });
  };

  const handleSelectProduct = (productId: string) => {
    updateState({ selectedProductId: productId, currentView: "product" });
    
    // Check if we have active Shopify integration markers (global object or customizer scripts)
    const isShopifyTheme = typeof window !== "undefined" && (
      (window as any).Shopify !== undefined ||
      document.getElementById("shopify-section-settings") !== null ||
      document.querySelectorAll(".shopify-react-section").length > 0
    );

    const isLocalOrPreview = typeof window !== "undefined" && (
      window.location.hostname.includes("run.app") ||
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1") ||
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("netlify.app") ||
      window.location.hostname.includes("github.io")
    );

    const isShopifyLive = isShopifyTheme && !isLocalOrPreview;

    if (isShopifyLive) {
      window.location.href = `/products/${productId}`;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGoHome = () => {
    updateState({ currentView: "home" });

    // Clean browser location address if on /order-success or when returning to home view
    if (typeof window !== "undefined") {
      try {
        window.history.replaceState(null, "", "/");
      } catch (e) {
        console.warn("Could not clean address history:", e);
      }
    }

    // Check if we have active Shopify integration markers (global object or customizer scripts)
    const isShopifyTheme = typeof window !== "undefined" && (
      (window as any).Shopify !== undefined ||
      document.getElementById("shopify-section-settings") !== null ||
      document.querySelectorAll(".shopify-react-section").length > 0
    );

    const isLocalOrPreview = typeof window !== "undefined" && (
      window.location.hostname.includes("run.app") ||
      window.location.hostname.includes("localhost") ||
      window.location.hostname.includes("127.0.0.1") ||
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("netlify.app") ||
      window.location.hostname.includes("github.io")
    );

    const isShopifyLive = isShopifyTheme && !isLocalOrPreview;

    if (isShopifyLive) {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    state,
    updateState,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleSelectProduct,
    handleGoHome,
  };
}
