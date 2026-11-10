export interface ReceiptData {
  id: string;
  amount: number;
  currency: string;
  currencySymbol: string;
  senderName: string;
  recipientName: string;
  recipientBank: string;
  recipientAccountMask: string;
  date: string;
  time: string;
  status: 'Processing' | 'Completed' | 'Pending' | 'Failed' | 'Cancelled';
  recipientReceives: number;
  transactionFee: number;
  category: string;
  paymentChannel: string;
  themeColor: string; // e.g. 'purple', 'blue', 'navy', 'emerald'
}

export const PRESET_RECEIPTS: ReceiptData[] = [
  {
    id: 'preset-1',
    amount: 2000.00,
    currency: 'GBP',
    currencySymbol: '£',
    senderName: 'JOHN DOE',
    recipientName: 'OLUSEGUN FESTUS OGUNMILADE',
    recipientBank: 'Palmpay',
    recipientAccountMask: '•••• 7842',
    date: 'Nov 03, 2026',
    time: '07:09 AM',
    status: 'Processing',
    recipientReceives: 1850.00,
    transactionFee: 150.00,
    category: 'Gift',
    paymentChannel: 'Bank Account',
    themeColor: 'purple'
  },
  {
    id: 'preset-2',
    amount: 450.00,
    currency: 'GBP',
    currencySymbol: '£',
    senderName: 'SARAH JENKINS',
    recipientName: 'MICHAEL SMITH',
    recipientBank: 'Monzo',
    recipientAccountMask: '•••• 1928',
    date: 'Nov 10, 2026',
    time: '02:15 PM',
    status: 'Completed',
    recipientReceives: 445.00,
    transactionFee: 5.00,
    category: 'Bills',
    paymentChannel: 'Debit Card',
    themeColor: 'purple'
  },
  {
    id: 'preset-3',
    amount: 12500.00,
    currency: 'USD',
    currencySymbol: '$',
    senderName: 'GLOBAL VENTURES LTD',
    recipientName: 'TECHFLOW SOLUTIONS INC',
    recipientBank: 'Chase Bank',
    recipientAccountMask: '•••• 9910',
    date: 'Nov 08, 2026',
    time: '11:30 AM',
    status: 'Completed',
    recipientReceives: 12450.00,
    transactionFee: 50.00,
    category: 'Business',
    paymentChannel: 'Wire Transfer',
    themeColor: 'navy'
  }
];
