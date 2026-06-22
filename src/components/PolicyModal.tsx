/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, ShieldCheck, Truck, RotateCcw, FileText } from "lucide-react";
import { motion } from "motion/react";

export type PolicyTab = "privacy" | "refund" | "shipping" | "terms";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export default function PolicyModal({ isOpen, onClose, initialTab = "privacy" }: PolicyModalProps) {
  const [activeTab, setActiveTab] = React.useState<PolicyTab>(initialTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const tabsConfig = [
    { id: "privacy" as PolicyTab, label: "Privacy Policy", icon: ShieldCheck },
    { id: "refund" as PolicyTab, label: "Refund Policy", icon: RotateCcw },
    { id: "shipping" as PolicyTab, label: "Shipping Policy", icon: Truck },
    { id: "terms" as PolicyTab, label: "Terms of Service", icon: FileText },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-6" id="policy-modal-container">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-brand-black/45 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="bg-white rounded-2xl w-full max-w-4xl h-[85vh] md:h-[75vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative border border-brand-black/5 z-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-brand-black/45 hover:text-brand-black bg-brand-offwhite hover:bg-brand-black/5 rounded-full transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Sidebar tabs (on desktop/tablet) */}
        <div className="w-full md:w-64 bg-[#F8F6F9] border-b md:border-b-0 md:border-r border-brand-black/5 p-4 md:p-6 flex flex-col gap-1 md:gap-2 shrink-0 pt-12 md:pt-16">
          <div className="mb-4 hidden md:block">
            <h3 className="font-serif text-lg font-black text-[#8B7C68]">H SALON</h3>
            <p className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Legal Statements</p>
          </div>
          
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar -mx-4 md:mx-0 px-4 md:px-0 gap-1.5 py-1">
            {tabsConfig.map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-brand-black text-[#82D8C5] shadow-xs"
                      : "text-brand-black/60 hover:text-brand-black hover:bg-brand-black/5"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 pt-8" id="policy-modal-scroll-pane">
          {activeTab === "privacy" && (
            <div className="space-y-6 font-sans text-brand-black/85 leading-relaxed text-sm">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-black uppercase">Privacy Policy</h2>
              <p className="text-xs text-gray-400 font-mono">Last updated: June 22, 2026</p>
              
              <div className="space-y-4">
                <p>
                  This Privacy Policy describes how H Salon (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from hsalon.uk.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">1. Personal Information We Collect</h3>
                <p>
                  When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
                </p>
                <p>
                  Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as <strong>"Device Information"</strong>.
                </p>
                <p>
                  When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this as <strong>"Order Information"</strong>.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">2. How Do We Use Your Personal Information?</h3>
                <p>
                  We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
                </p>
                <p>
                  Additionally, we use this Order Information to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Communicate with you;</li>
                  <li>Screen our orders for potential risk or fraud; and</li>
                  <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                </ul>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">3. Sharing Your Personal Information</h3>
                <p>
                  We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store — you can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer" className="text-[#82D8C5] underline hover:text-[#5fc0aa]">shopify.com/legal/privacy</a>.
                </p>
                <p>
                  We also use Google Analytics to help us understand how our customers use the Site — you can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer" className="text-[#82D8C5] underline hover:text-[#5fc0aa]">google.com/privacy</a>.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">4. Your Rights & GDPR Compliance</h3>
                <p>
                  If you are a European or United Kingdom resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">5. Data Retention</h3>
                <p>
                  When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">6. Contact Us</h3>
                <p>
                  For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <span className="font-bold text-[#82D8C5] hover:underline cursor-pointer">info@hsalon.uk</span>, by phone at <span className="font-bold text-[#82D8C5]">+44 7520 644594</span> or by mail using the details provided below:
                </p>
                <p className="bg-brand-offwhite p-3.5 rounded-lg border border-brand-black/5 font-mono text-xs leading-relaxed">
                  <strong>Trade Name:</strong> H Salon<br />
                  <strong>Operated By:</strong> H SALON LTD (Company No. 14605981)<br />
                  71-75 Shelton Street, Covent Garden<br />
                  London, WC2H 9JQ, United Kingdom
                </p>
              </div>
            </div>
          )}

          {activeTab === "refund" && (
            <div className="space-y-6 font-sans text-brand-black/85 leading-relaxed text-sm">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-black uppercase">Refund Policy</h2>
              <p className="text-xs text-gray-400 font-mono">Last updated: June 22, 2026</p>

              <div className="space-y-4">
                <p>
                  We have a <strong>14-day return policy</strong>, which means you have 14 days after receiving your item to request a return.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">Eligibility Requirements</h3>
                <p>
                  To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                </p>
                <p>
                  For safety and hygiene reasons, we cannot accept returns on opened personal care items, cosmetics, skincare formulas, or hair and scalp oils where the seal or screw top has been broken, unless the product is damaged or defective upon arrival.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">Damages and Issues</h3>
                <p>
                  Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">Exceptions / Non-Returnable Items</h3>
                <p>
                  Certain types of items cannot be returned, like perishable goods, custom products (such as special orders or personalized items), and personal care goods (such as beauty products). Please get in touch if you have questions or concerns about your specific item.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">Exchanges</h3>
                <p>
                  The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">Refund Processing</h3>
                <p>
                  We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
                </p>

                <p>
                  To start a return, you can contact us at <span className="font-bold text-[#82D8C5] hover:underline cursor-pointer">info@hsalon.uk</span>.
                </p>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-6 font-sans text-brand-black/85 leading-relaxed text-sm">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-black uppercase">Shipping Policy</h2>
              <p className="text-xs text-gray-400 font-mono">Last updated: June 22, 2026</p>

              <div className="space-y-4">
                <p>
                  Welcome to H Salon. We are dedicated to delivering our hand-harvested clinical scalp, root, and skin wellness active formulas to you safely and efficiently.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">1. Processing Times</h3>
                <p>
                  All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped containing Evri or Royal Mail tracking information.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">2. Domestic Shipping Rates and Estimates</h3>
                <p>
                  We offer standard tracked shipping across the United Kingdom.
                </p>
                <div className="overflow-x-auto border border-brand-black/5 rounded-lg">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="bg-brand-offwhite border-b border-brand-black/5 font-bold uppercase text-brand-black">
                        <th className="p-3">Shipping Option</th>
                        <th className="p-3">Delivery Time</th>
                        <th className="p-3">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-black/5">
                      <tr>
                        <td className="p-3 font-semibold">UK Standard Tracked</td>
                        <td className="p-3">2-4 Business Days</td>
                        <td className="p-3">£3.99 (Free on UK orders over £75)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">UK Express Delivery</td>
                        <td className="p-3">1-2 Business Days</td>
                        <td className="p-3">£5.95</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">3. International Shipping</h3>
                <p>
                  We ship globally to most major international destinations including the US, EU, and Canada. Standard international deliveries take approximately 5 to 15 business days depending on carrier schedules and customs clearance processes.
                </p>
                <p className="text-xs text-gray-500 italic">
                  * Please note: Your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. H Salon is not responsible for these charges if they are applied and are your responsibility as the customer.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">4. How do I check the status of my order?</h3>
                <p>
                  When your order has shipped, you will receive an email notification from us which will include a tracking link you can use to check its status. Please allow 48 hours for the tracking information to become active.
                </p>
                <p>
                  If you haven’t received your order within 7 days of receiving your shipping confirmation email, please contact us at <span className="font-bold text-[#82D8C5] hover:underline cursor-pointer">info@hsalon.uk</span> with your name and order number, and we will look into it for you.
                </p>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-6 font-sans text-brand-black/85 leading-relaxed text-sm">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-brand-black uppercase">Terms of Service</h2>
              <p className="text-xs text-gray-400 font-mono">Last updated: June 22, 2026</p>

              <div className="space-y-4">
                <p>
                  This website is operated by H Salon. Throughout the site, the terms “we”, “us” and “our” refer to H Salon. H Salon offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">1. Online Store Terms</h3>
                <p>
                  By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                </p>
                <p>
                  You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">2. Accuracy, Completeness and Timeliness of Information</h3>
                <p>
                  We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">3. Modifications to the Service and Prices</h3>
                <p>
                  Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">4. Products or Services</h3>
                <p>
                  Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.
                </p>
                <p>
                  We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">5. Accuracy of Billing and Account Information</h3>
                <p>
                  We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
                </p>

                <h3 className="font-serif text-base font-bold text-brand-black uppercase pt-2">6. Governing Law</h3>
                <p>
                  These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the United Kingdom.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
