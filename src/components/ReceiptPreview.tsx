import React, { useState } from 'react';
import { ReceiptData } from '../types';
import { ArrowUpRight, HelpCircle, ArrowLeft, Gift, Share2, CheckCircle2, Clock, AlertCircle, XCircle, Check } from 'lucide-react';

interface ReceiptPreviewProps {
  data: ReceiptData;
  id?: string;
  onShare?: () => void;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  data,
  id = 'printable-receipt',
  onShare
}) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    const summary = `NatWest Transaction Receipt\nAmount: ${data.currencySymbol}${data.amount.toLocaleString()}\nRecipient: ${data.recipientName} (${data.recipientBank})\nStatus: ${data.status}\nDate: ${data.date} at ${data.time}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NatWest Transaction Receipt',
          text: summary,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fallback: Copy summary to clipboard & trigger onShare (PDF)
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }

    if (onShare) {
      onShare();
    }
  };

  const getStatusBadge = (status: ReceiptData['status']) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Processing
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Pending
          </span>
        );
      case 'Failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Failed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Smartphone Frame Container */}
      <div 
        id={id}
        className="w-full max-w-[440px] bg-white rounded-[32px] shadow-xl border border-slate-200 overflow-hidden text-slate-900 font-sans relative flex flex-col"
      >
        {/* Phone Top Header (Back & Help) */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-white">
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Transfer Icon & Main Amount Header */}
        <div className="px-6 pt-2 pb-6 text-center flex flex-col items-center bg-white">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 shadow-sm border border-slate-200">
              <ArrowUpRight className="w-8 h-8 text-slate-800" strokeWidth={2.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-xs border border-slate-100">
              🇬🇧
            </div>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-mono">
            {data.currencySymbol}{data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-1">
            Sent to <span className="font-bold text-slate-900">{data.recipientName}</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">{data.date} · {data.time}</p>
        </div>

        {/* Perforated Divider Notch Line */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-100 border-r border-slate-200"></div>
          <div className="w-full border-t-2 border-dashed border-slate-200 mx-6"></div>
          <div className="absolute right-0 translate-x-1/2 w-6 h-6 rounded-full bg-slate-100 border-l border-slate-200"></div>
        </div>

        {/* Transaction Details Section */}
        <div className="px-6 py-4 space-y-4 bg-white flex-1">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Transaction details
          </h3>

          <div className="space-y-4 text-sm">
            {/* Status */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 font-medium">Status</span>
              <div>{getStatusBadge(data.status)}</div>
            </div>

            {/* Recipient receives */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 font-medium">Recipient receives</span>
              <span className="font-bold text-slate-900 font-mono">
                {data.currencySymbol}{data.recipientReceives.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Recipient name */}
            <div className="flex items-center justify-between py-1 gap-4">
              <span className="text-slate-500 font-medium shrink-0">Recipient name</span>
              <span className="font-bold text-slate-900 text-right truncate max-w-[200px]" title={data.recipientName}>
                {data.recipientName}
              </span>
            </div>

            {/* Recipient bank */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 font-medium">Recipient bank</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">{data.recipientBank}</span>
                <span className="text-xs text-slate-400 font-mono">{data.recipientAccountMask}</span>
              </div>
            </div>

            {/* Dashed divider */}
            <div className="border-t border-dashed border-slate-200 my-2"></div>

            {/* Transaction fee */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 font-medium">Transaction fee</span>
              <span className="font-bold text-slate-900 font-mono">
                {data.currencySymbol}{data.transactionFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 font-medium">Category</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100">
                <Gift className="w-3.5 h-3.5 text-purple-600" />
                {data.category}
              </span>
            </div>

            {/* Payment channel */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 font-medium">Payment channel</span>
              <span className="font-bold text-slate-900">{data.paymentChannel}</span>
            </div>
          </div>
        </div>

        {/* Bottom Button Area */}
        <div className="p-6 bg-white pt-2 pb-8">
          <button
            onClick={handleShareClick}
            className="w-full py-3.5 px-4 bg-purple-900 hover:bg-purple-950 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                Copied details & downloading PDF
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Share transaction receipt
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
