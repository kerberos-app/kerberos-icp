import { CardData } from '../types/vault';

interface CardDetailsProps {
  data: CardData;
  onCopy: (text: string, fieldName: string) => void;
}

function CardDetails({ data, onCopy }: CardDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Cardholder Name</label>
        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
          <span className="flex-1 text-white">{data.cardholderName}</span>
          <button 
            onClick={() => {
              void onCopy(data.cardholderName, 'Cardholder name');
            }}
            className="p-1 text-gray-400 hover:text-white transition-colors" 
            title="Copy name"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
          <span className="flex-1 text-white font-mono">{data.number}</span>
          <button 
            onClick={() => {
              void onCopy(data.number, 'Card number');
            }}
            className="p-1 text-gray-400 hover:text-white transition-colors" 
            title="Copy number"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Expiry</label>
          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <span className="flex-1 text-white font-mono">{data.expiryMonth}/{data.expiryYear}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <span className="flex-1 text-white font-mono">{data.cvv}</span>
            <button 
              onClick={() => {
                void onCopy(data.cvv, 'CVV');
              }}
              className="p-1 text-gray-400 hover:text-white transition-colors" 
              title="Copy CVV"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDetails; 