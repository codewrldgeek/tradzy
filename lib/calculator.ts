interface CurrencyPair {
  name: string;
  pipValue: number; // Value of 1 pip in USD for 1 standard lot
}

const CURRENCY_PAIRS: Record<string, CurrencyPair> = {
  EURUSD: { name: "EUR/USD", pipValue: 10 },
  GBPUSD: { name: "GBP/USD", pipValue: 10 },
  USDJPY: { name: "USD/JPY", pipValue: 9.34 },
  AUDUSD: { name: "AUD/USD", pipValue: 10 },
  USDCAD: { name: "USD/CAD", pipValue: 7.54 },
  NZDUSD: { name: "NZD/USD", pipValue: 10 },
};

const MAX_RISK_PERCENTAGE = 0.02; // 2% maximum risk per trade

interface TradeSetup {
  accountSize: number;
  pair: string;
  stopLoss: number;
}

function extractTradeSetup(message: string): TradeSetup | null {
  // Extract account size (looking for dollar amounts)
  const accountMatch = message.match(/\$?\s?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  const accountSize = accountMatch
    ? parseFloat(accountMatch[1].replace(/,/g, ""))
    : null;

  // Extract currency pair
  const pairMatch = message.match(/(?:EUR|GBP|USD|JPY|AUD|CAD|NZD){6}/i);
  const pair = pairMatch ? pairMatch[0].toUpperCase() : null;

  // Extract stop loss (looking for numbers followed by 'pip' or 'pips')
  const slMatch = message.match(/(\d+)\s*(?:pip|pips)/i);
  const stopLoss = slMatch ? parseInt(slMatch[1]) : null;

  if (accountSize && pair && stopLoss) {
    return { accountSize, pair, stopLoss };
  }

  return null;
}

function calculateLotSize(setup: TradeSetup): {
  lotSize: number;
  riskAmount: number;
  maxLoss: number;
} {
  const pair = CURRENCY_PAIRS[setup.pair];
  if (!pair) throw new Error("Unsupported currency pair");

  const maxRiskAmount = setup.accountSize * MAX_RISK_PERCENTAGE;
  const pipValuePerLot = pair.pipValue / 10; // Convert to 0.1 lot pip value
  const maxLoss = setup.stopLoss * pipValuePerLot;

  // Calculate lot size based on risk
  const lotSize = maxRiskAmount / maxLoss;

  return {
    lotSize: Math.floor(lotSize * 100) / 100, // Round to 2 decimal places
    riskAmount: maxRiskAmount,
    maxLoss: maxLoss * lotSize,
  };
}

export async function calculatePositionSize(message: string): Promise<string> {
  try {
    const setup = extractTradeSetup(message);
    if (!setup) {
      return "I couldn't understand all the details. Please provide:\n\n• Account size (in $)\n• Currency pair (e.g., EURUSD, GBPUSD)\n• Stop loss in pips\n\nFor example: 'Calculate position size for EURUSD with $5000 and 25 pip stop loss'";
    }

    const { lotSize, riskAmount, maxLoss } = calculateLotSize(setup);
    const pair = CURRENCY_PAIRS[setup.pair];

    return `📊 Analysis for ${pair.name}
  
  💰 Account Size: $${setup.accountSize.toLocaleString()}
  🎯 Stop Loss: ${setup.stopLoss} pips
  ⚠️ Maximum Risk (2%): $${riskAmount.toFixed(2)}
  
  📈 Recommended Position Size: ${lotSize.toFixed(2)} lots
  📉 Maximum Loss: $${maxLoss.toFixed(2)}
  
  🔑 Key Reminders:
  • Always use a stop loss order
  • Never risk more than 2% per trade
  • Consider market volatility and news events
  • Monitor your emotional state while trading`;
  } catch (error) {
    return "⚠️ I encountered an error calculating your position size. Please ensure you're:\n\n• Using a supported currency pair (EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD, NZDUSD)\n• Providing clear numbers for account size\n• Specifying stop loss in pips";
  }
}
