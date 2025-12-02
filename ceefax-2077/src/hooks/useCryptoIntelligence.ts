/**
 * Crypto Intelligence Hook
 * Uses ChainExecutor to run multi-stage crypto analysis
 */

import { useState, useEffect } from 'react';
import { ChainExecutor, type ChainResult } from '../mcp/ChainExecutor';

interface CryptoIntelligenceData {
  prediction: {
    price: number;
    confidence: number;
  };
  reasoning: string[];
  risk_factors: string[];
}

export function useCryptoIntelligence(coin: string) {
  const [data, setData] = useState<CryptoIntelligenceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coin) return;

    const runAnalysis = async () => {
      setLoading(true);
      setError(null);

      try {
        const executor = new ChainExecutor();
        
        // Define crypto intelligence workflow
        const steps = [
          {
            step: 1,
            tool: 'fetch_price_history',
            input: { coin, timeframe: '24h' }
          },
          {
            step: 2,
            tool: 'technical_analysis',
            input: { prices: '${step_1.prices}' },
            depends_on: [1]
          },
          {
            step: 3,
            tool: 'sentiment_analysis',
            input: { coin }
          },
          {
            step: 4,
            tool: 'synthesize_prediction',
            input: {
              technical: '${step_2}',
              sentiment: '${step_3}'
            },
            depends_on: [2, 3]
          }
        ];

        const result: ChainResult = await executor.execute(steps);

        if (result.success && result.final_output) {
          const output = result.final_output as CryptoIntelligenceData;
          setData(output);
        } else {
          setError(result.errors?.join(', ') || 'Analysis failed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [coin]);

  return { data, loading, error };
}
