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
    <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-md p-6 sm:p-10">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono uppercase tracking-wider mb-2 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            Fast Dispatch • Direct Factory Pricing
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quick RFQ & Bulk Price Ingestion
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Receive GST-compliant pro-forma invoices directly from Rajkot production within 60 minutes.
          </p>
        </div>

        {isOpenAsModal && onCloseModal && (
          <button
            onClick={onCloseModal}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
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
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-semibold">
              Quotation Request Received
            </span>
            <h4 className="text-2xl font-bold text-slate-900">
              Thank You, {formData.fullName || 'Valued Customer'}!
            </h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Your inquiry has been assigned reference ID{' '}
              <span className="font-mono font-bold text-blue-600">{rfqRefId}</span>. Our sales desk will call you directly at{' '}
              <span className="text-slate-900 font-medium">{formData.phone}</span>.
            </p>
          </div>

          {/* Quotation summary review card */}
          <div className="max-w-md mx-auto bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Item:</span>
              <span className="text-slate-900 font-sans font-semibold">{currentProduct.name}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Quantity:</span>
              <span className="text-slate-900 font-semibold">{formData.quantityMeters.toLocaleString()} Meters</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Specification:</span>
              <span className="text-slate-900 font-semibold">{formData.diameterMm}</span>
            </div>
            {estimatedSubtotal && (
              <div className="flex justify-between pt-2 border-t border-slate-200 text-blue-600 font-bold text-sm">
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
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send via WhatsApp to Factory Desk</span>
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Polymer Product
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PRODUCTS.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, productId: p.id })}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs flex flex-col justify-between ${
                        formData.productId === p.id
                          ? 'bg-blue-50 border-blue-500 text-slate-900 shadow-sm ring-1 ring-blue-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-semibold text-sm text-slate-900">{p.name}</div>
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-blue-600 font-bold">{p.priceFormatted}</span>
                        <span className="text-slate-400 font-mono">MOQ: {p.moq}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider / Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Quantity Required (Meters)
                  </label>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200 text-sm">
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
                  className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer mb-2"
                />

                <div className="flex items-center gap-2">
                  {[1000, 2500, 5000, 10000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData({ ...formData, quantityMeters: val })}
                      className={`px-3 py-1 rounded-xl text-[11px] font-mono border transition-colors ${
                        formData.quantityMeters === val
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
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
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Size / Pressure Class
                  </label>
                  <select
                    value={formData.diameterMm}
                    onChange={e => setFormData({ ...formData, diameterMm: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
                  >
                    <option value="63mm (PN 6 - 6 kg/cm²)">63 mm (PN 6 - 6 kg/cm²)</option>
                    <option value="75mm (PN 10 - 10 kg/cm²)">75 mm (PN 10 - 10 kg/cm²)</option>
                    <option value="90mm (PN 10 - 10 kg/cm²)">90 mm (PN 10 - 10 kg/cm²)</option>
                    <option value="110mm (PN 10 - 10 kg/cm²)">110 mm (PN 10 - 10 kg/cm²)</option>
                    <option value="110mm (PN 16 - 16 kg/cm²)">110 mm (PN 16 - 16 kg/cm²)</option>
                    <option value="160mm (PN 12.5 - 12.5 kg/cm²)">160 mm (PN 12.5)</option>
                    <option value="200mm (PN 10 - 10 kg/cm²)">200 mm (PN 10)</option>
                    <option value="16mm Drip Lateral (Class 2)">16 mm Drip Lateral (Class 2)</option>
                    <option value="40/33mm PLB Telecom Duct">40/33 mm PLB Telecom Duct</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Destination City / Pin
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rajkot, Ahmedabad, Surat"
                    value={formData.deliveryLocation}
                    onChange={e => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Col: Buyer Contact Details & Estimation Card */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mr. Rajesh Patel"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company / Farm Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kisan Agro"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="purchase@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Estimation Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Standard Factory Base Rate:</span>
                  <span className="font-mono text-slate-900 font-semibold">{currentProduct.priceFormatted}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Batch Volume:</span>
                  <span className="font-mono text-slate-900 font-semibold">
                    {formData.quantityMeters.toLocaleString()} Meters
                  </span>
                </div>
                {estimatedSubtotal ? (
                  <div className="pt-2 border-t border-slate-200 flex items-baseline justify-between">
                    <span className="text-xs font-mono uppercase text-slate-500 font-medium">
                      Estimated Order Value:
                    </span>
                    <span className="text-xl font-extrabold text-blue-600 font-mono">
                      ₹{estimatedSubtotal.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-slate-200 text-xs text-amber-700 font-mono">
                    Custom agricultural coil lot rates apply
                  </div>
                )}
                <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1">
                  <Clock className="w-3 h-3 text-blue-600 inline" />
                  Official quote with GST credit {COMPANY_DETAILS.gstNumber} issued upon submission
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-rfq-form-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
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
