import React from 'react';
import { ReceiptData } from '../types';
import { RefreshCw, Sparkles, User, Building, Calendar, Clock } from 'lucide-react';

interface ReceiptFormProps {
  data: ReceiptData;
  onChange: (updated: ReceiptData) => void;
  onResetToDefault: () => void;
}

export const ReceiptForm: React.FC<ReceiptFormProps> = ({
  data,
  onChange,
  onResetToDefault
}) => {
  const handleChange = (field: keyof ReceiptData, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleSetCurrentDateTime = () => {
    const now = new Date();
    // Format date e.g. "Nov 10, 2026"
    const dateStr = now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    // Format time e.g. "01:51 AM"
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    onChange({
      ...data,
      date: dateStr,
      time: timeStr
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Receipt Customizer</h2>
          <p className="text-xs text-slate-500">Modify any field to customize your transaction</p>
        </div>
        <button
          onClick={onResetToDefault}
          className="text-xs font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          Reset Default
        </button>
      </div>

      <div className="space-y-4">
        {/* Amount & Currency */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Transfer Amount ({data.currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm font-medium">
                {data.currencySymbol}
              </span>
              <input
                type="number"
                step="0.01"
                value={data.amount}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  const fee = data.transactionFee;
                  // Auto-calculator: Recipient receives = Amount - Transaction Fee
                  onChange({
                    ...data,
                    amount: val,
                    recipientReceives: Math.max(0, val - fee)
                  });
                }}
                className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Currency</label>
            <select
              value={data.currency}
              onChange={(e) => {
                const curr = e.target.value;
                const symbols: Record<string, string> = { GBP: '£', USD: '$', EUR: '€', NGN: '₦', CAD: 'CA$', AUD: 'A$' };
                onChange({
                  ...data,
                  currency: curr,
                  currencySymbol: symbols[curr] || curr
                });
              }}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900"
            >
              <option value="GBP">GBP (£)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="NGN">NGN (₦)</option>
              <option value="CAD">CAD (CA$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        </div>

        {/* Status & Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={data.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 font-medium"
            >
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={data.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900"
            >
              <option value="Gift">Gift</option>
              <option value="Bills">Bills & Utilities</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Salary</option>
              <option value="Family">Family Support</option>
            </select>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recipient Information</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={data.recipientName}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 font-medium uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Recipient Bank</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Building className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={data.recipientBank}
                  onChange={(e) => handleChange('recipientBank', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Account Mask</label>
              <input
                type="text"
                value={data.recipientAccountMask}
                onChange={(e) => handleChange('recipientAccountMask', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>Recipient Receives</span>
                <span className="text-[10px] text-purple-600 font-normal">Auto-calculated</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">
                  {data.currencySymbol}
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={data.recipientReceives}
                  onChange={(e) => handleChange('recipientReceives', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Transaction Fee</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">
                  {data.currencySymbol}
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={data.transactionFee}
                  onChange={(e) => {
                    const fee = parseFloat(e.target.value) || 0;
                    const amt = data.amount;
                    // Auto-calculator: Recipient receives = Amount - Transaction Fee
                    onChange({
                      ...data,
                      transactionFee: fee,
                      recipientReceives: Math.max(0, amt - fee)
                    });
                  }}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sender & Payment Details */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Sender & Channel</h3>
            <button
              onClick={handleSetCurrentDateTime}
              className="text-xs font-medium text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              Set Current Date & Time
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sender Name</label>
              <input
                type="text"
                value={data.senderName}
                onChange={(e) => handleChange('senderName', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900 uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Channel</label>
              <select
                value={data.paymentChannel}
                onChange={(e) => handleChange('paymentChannel', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900"
              >
                <option value="Bank Account">Bank Account</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Wire Transfer">Wire Transfer</option>
                <option value="Mobile Wallet">Mobile Wallet</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={data.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Time</label>
              <input
                type="text"
                value={data.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white text-slate-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
