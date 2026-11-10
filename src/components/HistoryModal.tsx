import React from 'react';
import { ReceiptData } from '../types';
import { X, History, Trash2, ArrowRight } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedReceipts: ReceiptData[];
  onSelectReceipt: (receipt: ReceiptData) => void;
  onDeleteReceipt: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedReceipts,
  onSelectReceipt,
  onDeleteReceipt,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Saved Receipts History</h3>
              <p className="text-xs text-slate-500">Access previously generated and saved receipts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedReceipts.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <History className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-700">No saved receipts yet</p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Save your custom generated receipts to access them anytime from this browser.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{savedReceipts.length} saved receipt(s)</span>
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            </div>

            {savedReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-purple-600 transition-all flex items-center justify-between group bg-slate-50/50"
              >
                <div 
                  onClick={() => {
                    onSelectReceipt(receipt);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-mono text-base">
                      {receipt.currencySymbol}{receipt.amount.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {receipt.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    To <span className="font-semibold text-slate-900">{receipt.recipientName}</span> ({receipt.recipientBank})
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {receipt.date} · {receipt.time}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectReceipt(receipt);
                      onClose();
                    }}
                    title="Load Receipt"
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteReceipt(receipt.id)}
                    title="Delete"
                    className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 flex items-center justify-center text-slate-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
