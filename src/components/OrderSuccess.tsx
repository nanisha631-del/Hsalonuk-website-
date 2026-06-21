/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { CheckCircle, ShoppingBag, ArrowRight, CreditCard, ExternalLink } from "lucide-react";
import { CartItem } from "../types";

interface OrderSuccessProps {
  onContinueShopping: () => void;
  cartItems?: CartItem[];
  onClearCart?: () => void;
}

export default function OrderSuccess({ onContinueShopping, cartItems = [], onClearCart }: OrderSuccessProps) {
  const [checkoutUrl, setCheckoutUrl] = useState<string>("");
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Attempt to extract the checkoutUrl from the current browser search params
    const params = new URLSearchParams(window.location.search);
    const urlFromParam = params.get("checkoutUrl");
    if (urlFromParam) {
      setCheckoutUrl(decodeURIComponent(urlFromParam));
    } else {
      // Fallback: check sessionStorage/localStorage
      const savedUrl = sessionStorage.getItem("shopify_checkout_url") || localStorage.getItem("shopify_checkout_url");
      if (savedUrl) {
        setCheckoutUrl(savedUrl);
      }
    }

    // Capture items for rendering summary before we clear the cart
    if (cartItems && cartItems.length > 0) {
      setItems(cartItems);
    } else {
      const savedItems = localStorage.getItem("phenomena-cart-items");
      if (savedItems) {
        try {
          setItems(JSON.parse(savedItems));
        } catch (e) {
          console.warn("Failed to parse cart items for order success snapshot", e);
        }
      }
    }

    // Clear cart so that when they continue shopping or return, the cart is refreshed
    if (onClearCart) {
      // Delay slightly or do immediately
      onClearCart();
    }
  }, []);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      onContinueShopping();
    }
  };

  return (
    <div className="min-h-[85vh] bg-brand-offwhite pt-32 pb-20 px-4 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-white border border-brand-black/5 rounded-2xl p-6 sm:p-10 shadow-xl flex flex-col items-center text-center gap-6 relative overflow-hidden">
        {/* Decorative ambient gradient backdrop */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-brand-lilac to-amber-300" />

        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
          <CheckCircle className="w-10 h-10 stroke-[1.5]" />
        </div>

        {/* Header Titles */}
        <div className="space-y-2">
          <strong className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
            Order Process Initiated
          </strong>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-black uppercase tracking-tight">
            Thank You For Your Order
          </h1>
          <p className="text-[14px] text-gray-500 max-w-md mx-auto leading-relaxed">
            Your secure checkout session is ready! Please review your details and proceed to Shopify's secure billing system to finalize payment.
          </p>
        </div>

        {/* Items Summary list */}
        {items.length > 0 && (
          <div className="w-full text-left border border-brand-black/5 bg-brand-offwhite/40 rounded-xl p-4 sm:p-6 my-2 space-y-4">
            <h3 className="font-serif text-[15px] font-bold text-brand-black uppercase tracking-wider border-b border-brand-black/5 pb-2 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-lilac" />
              Order Summary ({items.reduce((sum, i) => sum + i.quantity, 0)} Items)
            </h3>
            
            <div className="divide-y divide-brand-black/5 max-h-[220px] overflow-y-auto pr-1 no-scrollbar space-y-3">
              {items.map((item, index) => (
                <div key={`${item.product.id}-${index}`} className="flex justify-between items-center pt-3 first:pt-0">
                  <div className="flex gap-3 items-center">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-cover rounded bg-gray-100"
                    />
                    <div>
                      <h4 className="font-serif text-[14px] font-semibold text-brand-black leading-tight">
                        {item.product.name}
                      </h4>
                      {item.selectedColor && (
                        <p className="text-[11px] text-gray-400 font-sans uppercase">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      <p className="text-[12px] text-gray-500 font-sans">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <span className="font-sans text-[14px] font-bold text-brand-black">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-black/5 pt-3 mt-1 flex justify-between items-center">
              <span className="font-serif text-[15px] font-bold text-brand-black uppercase">Subtotal</span>
              <span className="font-sans text-[18px] font-extrabold text-brand-black">${subtotal.toFixed(2)} USD</span>
            </div>
          </div>
        )}

        {/* Checkout Session Warning Alert */}
        {checkoutUrl && (
          <div className="p-4 bg-emerald-50 border border-emerald-200/60 rounded-xl text-left text-gray-750 text-[12px] leading-relaxed flex gap-3 items-start w-full">
            <div className="p-1 rounded bg-emerald-100 text-emerald-800 shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-emerald-950 block mb-0.5 uppercase tracking-wider text-[11px]">
                Secure Billing Authorization
              </span>
              Click the major CTA below to securely checkout on Shopify. Once payment is completed, you'll be brought right back to H Salon.
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full mt-2">
          {checkoutUrl && (
            <button
              onClick={handleProceedToPayment}
              className="flex-1 bg-brand-black text-white hover:bg-brand-black/95 py-4 px-6 rounded-none font-bold text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-95 active:scale-98 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              PROCEED TO SECURE PAYMENT
              <ExternalLink className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onContinueShopping}
            className={`flex-1 ${!checkoutUrl ? 'bg-brand-black text-white hover:bg-brand-black/95' : 'bg-transparent text-brand-black hover:bg-brand-black/5 border border-brand-black/10'} py-4 px-6 rounded-none font-bold text-[13px] uppercase tracking-[0.2em] transition-all duration-300 active:scale-98 cursor-pointer flex items-center justify-center gap-2`}
          >
            CONTINUE SHOPPING
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Additional support notes for standard headless storefront setup */}
        <div className="text-[11px] text-gray-400 max-w-sm mt-2">
          Secure transaction encrypted with SSL. Direct connections with H Salon UK Shopify merchant account.
        </div>
      </div>
    </div>
  );
}
