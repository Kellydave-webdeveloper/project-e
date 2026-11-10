import React from 'react';
import { PRESET_RECEIPTS, ReceiptData } from '../types';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: ReceiptData) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Transaction Presets</h3>
              <p className="text-xs text-slate-500">Select a pre-configured template to load instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {PRESET_RECEIPTS.map((preset) => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="p-4 rounded-xl border border-slate-200 hover:border-purple-600 hover:bg-purple-50/50 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 font-mono text-base">
                    {preset.currencySymbol}{preset.amount.toLocaleString()}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    preset.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {preset.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  To <span className="font-semibold text-slate-900">{preset.recipientName}</span> ({preset.recipientBank})
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Category: {preset.category} · {preset.date}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center text-slate-500 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
