import React from 'react';
import { Receipt, History, Download, Sparkles, Printer } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  onOpenPresets: () => void;
  onPrint: () => void;
  onDownloadPDF: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHistory,
  onOpenPresets,
  onPrint,
  onDownloadPDF
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-900 flex items-center justify-center text-white shadow-sm font-bold">
          NW
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            NatWest Receipt Studio
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">Transaction Receipt Generator</p>
        </div>
      </div>

      {/* Zone 2: 4-5 clean single-line text navigation links / actions */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button 
          onClick={onOpenPresets}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          Presets
        </button>
        <button 
          onClick={onOpenHistory}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <History className="w-4 h-4 text-slate-500" />
          Saved Receipts
        </button>
        <button 
          onClick={onPrint}
          className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          Direct Print
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onDownloadPDF}
          className="px-4 py-2 text-xs font-semibold text-white bg-purple-900 hover:bg-purple-950 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Download PDF / Image
        </button>
      </div>
    </header>
  );
};
