/**
 * Crisis Mode Type Definitions
 */

export type CrisisReason = 
  | 'market_crash' 
  | 'system_error' 
  | 'network_loss' 
  | 'security_breach' 
  | 'glitch_trap';

export interface CrisisCondition {
  type: CrisisReason;
  threshold: number;
  currentValue: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface CrisisAlert {
  reason: CrisisReason;
  message: string;
  actions: string[];
  timestamp: number;
}
