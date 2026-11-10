import React, { useState, useEffect } from 'react';
import { ReceiptData, PRESET_RECEIPTS } from './types';
import { Navbar } from './components/Navbar';
import { ReceiptForm } from './components/ReceiptForm';
import { ReceiptPreview } from './components/ReceiptPreview';
import { PresetsModal } from './components/PresetsModal';
import { HistoryModal } from './components/HistoryModal';
import { exportReceiptToPDF, exportReceiptToImage } from './utils/pdfExport';
import { Printer, Download, Save, Sparkles, Image as ImageIcon, Check } from 'lucide-react';

export default function App() {
  const [currentReceipt, setCurrentReceipt] = useState<ReceiptData>(PRESET_RECEIPTS[0]);
  const [savedReceipts, setSavedReceipts] = useState<ReceiptData[]>([]);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Load saved receipts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('natwest_saved_receipts');
      if (stored) {
        setSavedReceipts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved receipts', e);
    }
  }, []);

  // Save to localStorage when savedReceipts changes
  useEffect(() => {
    try {
      localStorage.setItem('natwest_saved_receipts', JSON.stringify(savedReceipts));
    } catch (e) {
      console.error('Failed to save receipts', e);
    }
  }, [savedReceipts]);

  const handleSaveReceipt = () => {
    setIsSaving(true);
    const newReceipt: ReceiptData = {
      ...currentReceipt,
      id: `receipt-${Date.now()}`
    };
    setSavedReceipts(prev => [newReceipt, ...prev]);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }, 400);
  };

  const handleDeleteReceipt = (id: string) => {
    setSavedReceipts(prev => prev.filter(r => r.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved receipts?')) {
      setSavedReceipts([]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      await exportReceiptToPDF('printable-receipt', `NatWest-Receipt-${currentReceipt.recipientName.replace(/\s+/g, '-')}.pdf`);
    } catch (e) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    try {
      await exportReceiptToImage('printable-receipt', `NatWest-Receipt-${currentReceipt.recipientName.replace(/\s+/g, '-')}.png`);
    } catch (e) {
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <Navbar
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onPrint={handlePrint}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-r from-purple-900 to-purple-950 rounded-2xl p-6 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">NatWest Receipt Studio</h2>
                <p className="text-purple-200 text-xs mt-1 max-w-md">
                  Replicating professional transaction receipts with form customization, direct printing, and instant PDF download.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPresetsOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  Presets
                </button>
              </div>
            </div>
          </div>

          <ReceiptForm
            data={currentReceipt}
            onChange={setCurrentReceipt}
            onResetToDefault={() => setCurrentReceipt(PRESET_RECEIPTS[0])}
          />
        </div>

        {/* Right Column: Live Receipt Preview & Actions */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Live Preview</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveReceipt}
                  disabled={isSaving}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Receipt
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Receipt Component */}
            <ReceiptPreview
              data={currentReceipt}
              id="printable-receipt"
              onShare={handleDownloadPDF}
            />

            {/* Export & Print Action Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={handlePrint}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="py-2.5 px-3 bg-purple-900 hover:bg-purple-950 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                PDF
              </button>
              <button
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                PNG
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={(preset) => setCurrentReceipt(preset)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedReceipts={savedReceipts}
        onSelectReceipt={(receipt) => setCurrentReceipt(receipt)}
        onDeleteReceipt={handleDeleteReceipt}
        onClearAll={handleClearAllHistory}
      />
    </div>
  );
}
