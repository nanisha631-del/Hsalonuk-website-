/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import * as React from "react";
import { Phone, Mail, MapPin, Calendar, CheckCircle, ArrowRight } from "lucide-react";

interface ContactUsPageProps {
  onBackToHome: () => void;
}

export default function ContactUsPage({ onBackToHome }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "appointment-booking",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "appointment-booking", message: "" });
      }, 5000);
    }
  };

  return (
    <div id="contact-us-page" className="w-full bg-brand-offwhite pt-32 pb-24 px-4 md:px-12 animate-fade-in text-brand-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumbs / Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#82D8C5]">
            <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Home</span>
            <span>/</span>
            <span>Connect</span>
          </div>
          <h1 
            className="font-sans font-black text-4xl md:text-[56px] leading-[0.9] tracking-normal uppercase text-brand-black"
            style={{ wordSpacing: "0.3em" }}
          >
            CONTACT FORMULA LAB
          </h1>
          <p className="font-sans text-xs md:text-sm text-brand-black/60 tracking-wider uppercase">
            RESERVE A SPECIALIST CONSULTATION OR REACH USER HELP DESK
          </p>
          <div className="w-12 h-0.5 bg-[#82D8C5] mx-auto mt-4" />
        </div>

        {/* Form and info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* LEFT: Contact details & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-brand-black/5 shadow-xs">
            
            {/* Direct Channels */}
            <div className="space-y-6">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black">H Salon HQ</h3>
              
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-[#82D8C5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase text-brand-black">Physical Address</h4>
                  <p className="font-sans text-xs text-brand-black/60 mt-0.5 leading-relaxed">
                    H Salon<br />
                    71-75 Shelton Street, Covent Garden<br />
                    London, WC2H 9JQ, United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-[#82D8C5] shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase text-brand-black">Phone Number</h4>
                  <p className="font-sans text-xs text-brand-black/60 mt-0.5">+44 7520 644594</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-[#82D8C5] shrink-0" />
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase text-brand-black">Email Address</h4>
                  <p className="font-sans text-xs text-[#82D8C5] font-extrabold mt-0.5 hover:underline">
                    info@hsalon.uk
                  </p>
                </div>
              </div>

              <div className="border-t border-brand-black/10 pt-4 text-[10.5px] font-sans text-brand-black/45 space-y-1">
                <p><strong>Trade Name:</strong> H Salon</p>
                <p><strong>Operated By:</strong> H SALON LTD</p>
                <p><strong>Company Registration:</strong> 14605981 (Registered in England & Wales)</p>
              </div>
            </div>

            {/* Opening hours */}
            <div className="border-t border-brand-black/15 pt-8 space-y-4">
              <h3 className="font-sans font-black text-xs uppercase tracking-widest text-brand-black flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#82D8C5]" /> Clinic Hours
              </h3>
              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between border-b border-brand-black/5 pb-1 text-brand-black/75">
                  <span className="font-semibold uppercase tracking-wider">Monday — Friday</span>
                  <span className="font-mono">10:00 — 20:00 GMT</span>
                </div>
                <div className="flex justify-between border-b border-brand-black/5 pb-1 text-brand-black/75">
                  <span className="font-semibold uppercase tracking-wider">Saturday</span>
                  <span className="font-mono">09:00 — 18:00 GMT</span>
                </div>
                <div className="flex justify-between text-brand-black/40">
                  <span className="font-semibold uppercase tracking-wider">Sunday</span>
                  <span className="font-mono">Closed for clinical sterilisation</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Interative Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-brand-black/5 shadow-xs">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 flex flex-col items-center justify-center animate-fade-in">
                <CheckCircle className="w-12 h-12 text-[#82D8C5] animate-bounce" />
                <h3 className="font-sans font-black text-xl text-brand-black uppercase tracking-wider">Submission received successfully!</h3>
                <p className="font-sans text-xs text-brand-black/65 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out {formData.name}. Our dermal formulation concierge will response to your request at <span className="underline font-semibold font-mono">{formData.email}</span> within 2 hours.
                </p>
                <div className="w-48 h-1 bg-[#82D8C5]/20 rounded-full mt-2 overflow-hidden">
                  <div className="w-full h-full bg-[#82D8C5] animate-slide-right" style={{ animationDuration: "5000ms" }} />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-sans font-black text-normal text-brand-black uppercase tracking-wider">Enquiry form</h3>
                  <p className="font-sans text-xs text-brand-black/50 leading-normal mt-0.5">Allow our clinical staff to coordinate product sizing, scalp bookings, or ingredients questions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="font-sans text-[10px] font-black uppercase tracking-wider text-brand-black/60">Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Lady Sarah Temple"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-brand-offwhite font-sans text-xs border border-brand-black/10 rounded-lg py-2.5 px-3 text-brand-black focus:outline-hidden focus:border-[#82D8C5] transition-colors"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="font-sans text-[10px] font-black uppercase tracking-wider text-brand-black/60">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="e.g. sarah.temple@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-brand-offwhite font-sans text-xs border border-brand-black/10 rounded-lg py-2.5 px-3 text-brand-black focus:outline-hidden focus:border-[#82D8C5] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="font-sans text-[10px] font-black uppercase tracking-wider text-brand-black/60">Subject Area</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-brand-offwhite font-sans text-xs border border-brand-black/10 rounded-lg py-2.5 px-3 text-brand-black focus:outline-hidden focus:border-[#82D8C5] transition-colors cursor-pointer"
                  >
                    <option value="appointment-booking">Professional Scalp Consultation Booking</option>
                    <option value="product-sizing">Bulk Order / Sizing Consultation</option>
                    <option value="ingredients">Organic Sourcing & Ingredient concerns</option>
                    <option value="press">Press & Wholesale partnerships</option>
                  </select>
                </div>

                <div className="space-y-2 text-left">
                  <label className="font-sans text-[10px] font-black uppercase tracking-wider text-brand-black/60">Message detail</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe your hair state, goals, or desired booking date..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-brand-offwhite font-sans text-xs border border-brand-black/10 rounded-lg py-2.5 px-3 text-brand-black focus:outline-hidden focus:border-[#82D8C5] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-black hover:bg-[#82D8C5] text-[#82D8C5] hover:text-brand-black py-3 rounded-lg font-sans text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Dispatch concierge request <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
