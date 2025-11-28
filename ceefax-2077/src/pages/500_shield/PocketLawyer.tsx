import { useState } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { SecurityService, type LegalRight } from '../../services/SecurityService'

export default function PocketLawyer() {
  const [issue, setIssue] = useState('')
  const [legalRight, setLegalRight] = useState<LegalRight | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const analyzeLegalIssue = () => {
    if (!issue.trim()) return

    setAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      const right = SecurityService.getLegalRights(issue)
      setLegalRight(right)
      setAnalyzing(false)
    }, 1000)
  }

  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className="text-red-400 text-xl">POCKET LAWYER</h1>
          <p className="text-cyan-300 text-sm">Legal Rights Simplified • Know Your Rights</p>
        </div>

        <div className="space-y-3">
          <div className="border border-red-400 p-2">
            <label className="text-yellow-300 text-sm">Describe Your Legal Issue:</label>
            <textarea
              className="w-full bg-black text-cyan-300 border border-gray-600 p-2 mt-1 font-mono text-xs"
              rows={3}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="e.g., Landlord won't fix heater, Got fired unfairly, Debt collector harassing me..."
              disabled={analyzing}
            />
          </div>

          <button
            onClick={analyzeLegalIssue}
            disabled={analyzing || !issue.trim()}
            className={`w-full py-2 font-bold ${
              analyzing || !issue.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {analyzing ? '⚖️ ANALYZING...' : 'GET LEGAL ADVICE'}
          </button>

          {/* Analyzing State */}
          {analyzing && (
            <div className="border border-yellow-400 p-3 text-center animate-pulse">
              <div className="text-yellow-300 text-lg">⚖️</div>
              <div className="text-white text-xs mt-2">
                Consulting legal database...
              </div>
            </div>
          )}

          {/* Results */}
          {legalRight && !analyzing && (
            <>
              {/* Header */}
              <div className="border border-yellow-400 bg-yellow-900 bg-opacity-30 p-2">
                <div className="text-yellow-300 text-xs text-center font-bold">
                  ⚖️ LEGAL ANALYSIS ⚖️
                </div>
              </div>

              {/* Issue */}
              <div className="border border-gray-600 p-2">
                <div className="text-cyan-300 text-xs mb-1">📋 ISSUE:</div>
                <div className="text-white text-sm">{legalRight.issue}</div>
              </div>

              {/* Law */}
              <div className="border border-gray-600 p-2">
                <div className="text-cyan-300 text-xs mb-1">📜 APPLICABLE LAW:</div>
                <div className="text-white text-sm font-bold">{legalRight.law}</div>
              </div>

              {/* Your Right (Yellow - Highlighted) */}
              <div className="border border-yellow-400 bg-yellow-900 bg-opacity-30 p-3">
                <div className="text-yellow-300 text-xs mb-2 font-bold">
                  ✓ YOUR LEGAL RIGHT:
                </div>
                <div className="text-yellow-300 text-sm leading-relaxed">
                  {legalRight.yourRight}
                </div>
              </div>

              {/* Action Steps */}
              <div className="border border-green-400 bg-green-900 bg-opacity-20 p-2">
                <div className="text-green-400 text-xs mb-2 font-bold">
                  🎯 RECOMMENDED ACTION:
                </div>
                <div className="text-white text-xs leading-relaxed">
                  {legalRight.action}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="border border-red-400 bg-red-900 bg-opacity-20 p-2">
                <div className="text-red-400 text-xs font-bold mb-1">
                  ⚠️ IMPORTANT DISCLAIMER:
                </div>
                <div className="text-white text-xs">
                  This is general information, not legal advice. Laws vary by state. 
                  Consult a licensed attorney for your specific situation. 
                  Time limits may apply to your case.
                </div>
              </div>

              {/* Resources */}
              <div className="border border-cyan-400 p-2">
                <div className="text-cyan-300 text-xs mb-2 font-bold">
                  📞 LEGAL RESOURCES:
                </div>
                <div className="text-white text-xs space-y-1">
                  <div>• Legal Aid: 1-800-LAW-HELP</div>
                  <div>• State Bar Referral: Find local attorney</div>
                  <div>• Small Claims Court: Self-representation</div>
                  <div>• ACLU: Civil rights violations</div>
                </div>
              </div>
            </>
          )}

          {/* Info Box */}
          {!legalRight && !analyzing && (
            <div className="border border-gray-600 p-2">
              <div className="text-yellow-300 text-xs mb-1">💡 COMMON ISSUES:</div>
              <div className="text-white text-xs space-y-1">
                <div>• Landlord/tenant disputes</div>
                <div>• Employment/wrongful termination</div>
                <div>• Consumer refunds/returns</div>
                <div>• Debt collection harassment</div>
                <div>• Police encounters</div>
                <div>• Discrimination/harassment</div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 text-center">
          <p className="text-gray-400 text-xs">
            Know your rights • Consult attorney for legal advice
          </p>
        </div>
      </div>
    </TeletextGrid>
  )
}
