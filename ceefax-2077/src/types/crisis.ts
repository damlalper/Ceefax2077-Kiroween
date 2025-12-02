/**
 * Crisis Mode Types
 * Used by PersonalityService for crisis situations
 */

export type CrisisReason = 
  | 'market_crash'
  | 'system_error'
  | 'network_loss'
  | 'security_breach'
  | 'glitch_trap';

export interface CrisisState {
  active: boolean;
  reason?: CrisisReason;
  startTime?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface CrisisAlert {
  title: string;
  message: string;
  actions: string[];
  dismissible: boolean;
}
