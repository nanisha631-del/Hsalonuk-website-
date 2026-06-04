/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Trash, ShoppingBag, ArrowRight } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, color: string | undefined, qty: number) => void;
  onRemoveItem: (id: string, color: string | undefined) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 75;
  const deliveryCostMessage =
    subtotal >= freeShippingThreshold
      ? "You've earned FREE shipping!"
      : `Spend $${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE shipping.`;

  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-black/45 backdrop-blur-xs z-50 cursor-pointer"
            onClick={onClose}
          />

          {/* Sldie-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-brand-offwhite shadow-2xl z-50 flex flex-col h-full overflow-hidden"
          >
            {/* Promo Heading Banner */}
            <div className="bg-brand-black text-white text-center py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium px-4">
              ✨ New customers save 10% with code <span className="text-brand-lilac font-bold">WELCOME10</span>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-black/5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-black" />
                <h2 className="font-serif text-[22px] font-semibold text-brand-black">
                  Cart (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items)
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2.5 hover:bg-brand-black/5 rounded-full transition-colors font-sans text-brand-black cursor-pointer flex items-center justify-center gap-1 text-[13px] tracking-wider uppercase"
              >
                Close <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shipping Goal Progress */}
            <div className="p-6 bg-brand-lilac/10 border-b border-brand-black/5 flex flex-col gap-2">
              <span className="font-sans text-[12px] font-bold text-brand-black uppercase tracking-wider">
                {deliveryCostMessage}
              </span>
              <div className="w-full bg-brand-black/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-lilac h-full transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-[#D8D3CC] stroke-[1px]" />
                  <p className="font-serif text-[20px] text-gray-500 italic">
                    Your bag is empty. Let's find your radiant glow.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-brand-black text-white text-[11px] uppercase tracking-[0.2em] px-6 py-3 font-sans font-bold hover:bg-brand-black/90 active:scale-95 transition-all duration-300"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor || "none"}`}
                    className="flex gap-4 border-b border-brand-black/5 pb-6 last:border-0"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-[#E0DEDA] aspect-square overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title and delete */}
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-[17px] font-medium text-brand-black">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Selected Color / Detail variant */}
                        {item.selectedColor && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[12px] text-gray-500">
                              Color: {item.selectedColor}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Quantity & price controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-brand-black/10 rounded-full py-1 px-3 bg-white">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="p-1 hover:opacity-75 cursor-pointer text-brand-black"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-sans text-[13px] font-semibold text-brand-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="p-1 hover:opacity-75 cursor-pointer text-brand-black"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-sans text-[15px] font-bold text-brand-black">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sticky bottom panel summary */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-brand-black/5 flex flex-col gap-4">
                {/* Notes & Gifts links */}
                <div className="flex items-center justify-between text-xs text-gray-500 tracking-wider">
                  <button className="hover:underline uppercase">Add Order Notes</button>
                  <span>•</span>
                  <button className="hover:underline uppercase">Add Gift Wrap</button>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center border-t border-brand-black/5 pt-4">
                  <span className="font-serif text-[18px] text-brand-black font-medium">
                    Subtotal
                  </span>
                  <span className="font-sans text-[20px] font-extrabold text-brand-black">
                    ${subtotal.toFixed(2)} USD
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 text-center uppercase tracking-wider">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout CTA */}
                <button
                  id="checkout-trigger"
                  onClick={() => alert("Secure Checkout is locked in pre-production. Excellent choice!")}
                  className="w-full bg-brand-black hover:bg-brand-black/95 text-white py-4 text-[13px] font-bold uppercase tracking-[0.2em] hover:opacity-95 active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  CHECKOUT NOW
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
