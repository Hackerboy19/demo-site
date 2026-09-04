import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  CheckCircle,
  FileCheck,
  Phone,
  Calculator,
  MessageSquare,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS, COMPANY_DETAILS } from '../data/products';
import { RfqFormData } from '../types';

interface RfqSectionProps {
  selectedProductId?: string;
  initialQuantity?: number;
  isOpenAsModal?: boolean;
  onCloseModal?: () => void;
}

export function RfqSection({
  selectedProductId,
  initialQuantity = 1000,
  isOpenAsModal = false,
  onCloseModal
}: RfqSectionProps) {
  const [formData, setFormData] = useState<RfqFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    productId: selectedProductId || 'hdpe-water-pipe',
    quantityMeters: initialQuantity,
    diameterMm: '110mm (PN 10)',
    deliveryLocation: 'Rajkot, Gujarat',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rfqRefId, setRfqRefId] = useState('');

  useEffect(() => {
    if (selectedProductId) {
      setFormData(prev => ({
        ...prev,
        productId: selectedProductId,
        quantityMeters: initialQuantity > 0 ? initialQuantity : prev.quantityMeters
      }));
    }
  }, [selectedProductId, initialQuantity]);

  const currentProduct = PRODUCTS.find(p => p.id === formData.productId) || PRODUCTS[0];
  const unitPrice = currentProduct.pricePerMeter;
  const estimatedSubtotal = unitPrice ? unitPrice * formData.quantityMeters : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant enterprise RFQ processing
    setTimeout(() => {
      const generatedId = `AP-${Date.now().toString().slice(-6)}`;
      setRfqRefId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#38bdf8', '#ffffff']
      });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      productId: 'hdpe-water-pipe',
      quantityMeters: 1000,
      diameterMm: '110mm (PN 10)',
      deliveryLocation: '',
      notes: ''
    });
  };

  const shareViaWhatsApp = () => {
    const text = `Hello Abhay Polyplast (Proprietor Mr. Vivek Apani),
I would like to request an official quotation:
• Reference: ${rfqRefId || 'New RFQ'}
• Product: ${currentProduct.name}
• Quantity: ${formData.quantityMeters.toLocaleString()} Meters
• Size / Rating: ${formData.diameterMm}
• Delivery Location: ${formData.deliveryLocation || 'Rajkot'}
• Customer: ${formData.fullName} (${formData.companyName || 'Individual'})
• Phone: ${formData.phone}`;

    const cleanPhone = COMPANY_DETAILS.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const content = (
    <div className="relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-6 sm:p-10">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-tr from-blue-500/15 via-sky-500/15 to-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sky-300 text-xs font-mono uppercase tracking-wider mb-2 shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            Fast Dispatch • Direct Factory Pricing
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Quick RFQ & Bulk Price Ingestion
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Receive GST-compliant pro-forma invoices directly from Rajkot production within 60 minutes.
          </p>
        </div>

        {isOpenAsModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-md transition-colors"
          >
            Close
          </button>
        )}
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
              Quotation Request Received
            </span>
            <h4 className="text-2xl font-bold text-white">
              Thank You, {formData.fullName || 'Valued Customer'}!
            </h4>
            <p className="text-slate-200 text-sm max-w-md mx-auto">
              Your inquiry has been assigned reference ID{' '}
              <span className="font-mono font-bold text-sky-300">{rfqRefId}</span>. Our sales desk will call you directly at{' '}
              <span className="text-white font-medium">{formData.phone}</span>.
            </p>
          </div>

          {/* Quotation summary review card */}
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between text-slate-300">
              <span>Item:</span>
              <span className="text-white font-sans font-semibold">{currentProduct.name}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Quantity:</span>
              <span className="text-white">{formData.quantityMeters.toLocaleString()} Meters</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Specification:</span>
              <span className="text-white">{formData.diameterMm}</span>
            </div>
            {estimatedSubtotal && (
              <div className="flex justify-between pt-2 border-t border-white/10 text-emerald-300 font-bold text-sm">
                <span>Indicative Factory Base:</span>
                <span>₹{estimatedSubtotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-[10px] text-slate-400 pt-1">
              <span>GST Registration:</span>
              <span>{COMPANY_DETAILS.gstNumber}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={shareViaWhatsApp}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(16,185,129,0.3)] border border-emerald-400/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send via WhatsApp to Factory Desk</span>
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-md transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Product & Technical Specs Selection */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Select Polymer Product
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, productId: p.id })}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between backdrop-blur-sm ${
                        formData.productId === p.id
                          ? 'bg-blue-500/20 border-sky-400/60 text-white shadow-[0_4px_20px_rgba(56,189,248,0.2)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-semibold text-sm text-white">{p.name}</div>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-sky-300 font-medium">{p.priceFormatted}</span>
                        <span className="text-slate-400 font-mono">MOQ: {p.moq}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider / Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                    Quantity Required (Meters)
                  </label>
                  <span className="font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-xl border border-white/15 text-sm backdrop-blur-sm">
                    {formData.quantityMeters.toLocaleString()} m
                  </span>
                </div>

                <input
                  type="range"
                  min={500}
                  max={25000}
                  step={500}
                  value={formData.quantityMeters}
                  onChange={e => setFormData({ ...formData, quantityMeters: Number(e.target.value) })}
                  className="w-full accent-sky-400 bg-white/10 h-2 rounded-lg cursor-pointer mb-2"
                />

                <div className="flex items-center gap-2">
                  {[1000, 2500, 5000, 10000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData({ ...formData, quantityMeters: val })}
                      className={`px-3 py-1 rounded-xl text-[11px] font-mono border backdrop-blur-sm transition-colors ${
                        formData.quantityMeters === val
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-sky-400/40 shadow-sm'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {val.toLocaleString()}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Diameter & Pressure Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    Size / Pressure Class
                  </label>
                  <select
                    value={formData.diameterMm}
                    onChange={e => setFormData({ ...formData, diameterMm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-sky-400/60 focus:outline-none backdrop-blur-sm"
                  >
                    <option value="63mm (PN 6 - 6 kg/cm²)" className="bg-slate-900 text-white">63 mm (PN 6 - 6 kg/cm²)</option>
                    <option value="75mm (PN 10 - 10 kg/cm²)" className="bg-slate-900 text-white">75 mm (PN 10 - 10 kg/cm²)</option>
                    <option value="90mm (PN 10 - 10 kg/cm²)" className="bg-slate-900 text-white">90 mm (PN 10 - 10 kg/cm²)</option>
                    <option value="110mm (PN 10 - 10 kg/cm²)" className="bg-slate-900 text-white">110 mm (PN 10 - 10 kg/cm²)</option>
                    <option value="110mm (PN 16 - 16 kg/cm²)" className="bg-slate-900 text-white">110 mm (PN 16 - 16 kg/cm²)</option>
                    <option value="160mm (PN 12.5 - 12.5 kg/cm²)" className="bg-slate-900 text-white">160 mm (PN 12.5)</option>
                    <option value="200mm (PN 10 - 10 kg/cm²)" className="bg-slate-900 text-white">200 mm (PN 10)</option>
                    <option value="16mm Drip Lateral (Class 2)" className="bg-slate-900 text-white">16 mm Drip Lateral (Class 2)</option>
                    <option value="40/33mm PLB Telecom Duct" className="bg-slate-900 text-white">40/33 mm PLB Telecom Duct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                    Destination City / Pin
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rajkot, Ahmedabad, Surat"
                    value={formData.deliveryLocation}
                    onChange={e => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-400 focus:border-sky-400/60 focus:outline-none backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Buyer Contact Details & Estimation Card */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mr. Rajesh Patel"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-400 focus:border-sky-400/60 focus:outline-none backdrop-blur-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-400 focus:border-sky-400/60 focus:outline-none backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                      Company / Farm Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kisan Agro"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-400 focus:border-sky-400/60 focus:outline-none backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="purchase@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-400 focus:border-sky-400/60 focus:outline-none backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Live Estimation Card */}
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Standard Factory Base Rate:</span>
                  <span className="font-mono text-white font-medium">{currentProduct.priceFormatted}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Batch Volume:</span>
                  <span className="font-mono text-white font-medium">
                    {formData.quantityMeters.toLocaleString()} Meters
                  </span>
                </div>
                {estimatedSubtotal ? (
                  <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                    <span className="text-xs font-mono uppercase text-slate-200">
                      Estimated Order Value:
                    </span>
                    <span className="text-xl font-extrabold text-emerald-300 font-mono">
                      ₹{estimatedSubtotal.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-white/10 text-xs text-amber-300 font-mono">
                    Custom agricultural coil lot rates apply
                  </div>
                )}
                <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3 text-sky-400 inline" />
                  Official quote with GST credit {COMPANY_DETAILS.gstNumber} issued upon submission
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-rfq-form-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-[0_8px_32px_rgba(37,99,235,0.45)] border border-sky-400/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Pro-Forma Invoice...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Request for Bulk Quotation
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );

  if (isOpenAsModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <div className="w-full max-w-4xl my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="rfq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {content}
    </section>
  );
}
