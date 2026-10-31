'use client'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

type Tab = 'voice' | 'document'

export function ROICalculator() {
  const [tab, setTab] = useState<Tab>('voice')

  // Voice AI inputs
  const [callsPerDay, setCallsPerDay] = useState(100)
  const [avgDuration, setAvgDuration] = useState(4)
  const [currentCostPerMin, setCurrentCostPerMin] = useState(0.65)

  // Document inputs
  const [docsPerMonth, setDocsPerMonth] = useState(500)
  const [pagesPerDoc, setPagesPerDoc] = useState(3)
  const [currentDocCost, setCurrentDocCost] = useState(0.30)

  // Voice calculations
  const minutesPerMonth = callsPerDay * avgDuration * 30
  const currentVoiceCost = minutesPerMonth * currentCostPerMin
  const qaVoiceCost = minutesPerMonth * 0.08
  const voiceSaving = currentVoiceCost - qaVoiceCost
  const voiceAnnual = voiceSaving * 12

  // Document calculations
  const totalPages = docsPerMonth * pagesPerDoc
  const currentDocTotal = totalPages * currentDocCost
  const qaDocTotal = totalPages * 0.08
  const docSaving = currentDocTotal - qaDocTotal
  const docAnnual = docSaving * 12

  const voiceChartData = [
    { name: 'Current cost', value: Math.round(currentVoiceCost), color: '#2E261F' },
    { name: 'With Quantum Atlas', value: Math.round(qaVoiceCost), color: '#FFBF00' },
  ]
  const docChartData = [
    { name: 'Current cost', value: Math.round(currentDocTotal), color: '#2E261F' },
    { name: 'Nanonets ($0.30/pg)', value: Math.round(totalPages * 0.30), color: '#2E261F' },
    { name: 'With Quantum Atlas', value: Math.round(qaDocTotal), color: '#FFBF00' },
  ]

  const inputClass = "w-full px-4 py-3 rounded-lg border border-space-border bg-space-dark text-text-primary text-sm focus:outline-none focus:border-electric-blue transition-colors"
  const labelClass = "block text-text-secondary text-xs mb-1.5 uppercase tracking-wide"

  return (
    <div
      className="rounded-2xl border border-space-border overflow-hidden"
      style={{ background: '#171411' }}
    >
      {/* Tabs */}
      <div className="flex border-b border-space-border">
        {(['voice', 'document'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 px-6 py-4 text-sm font-medium transition-colors"
            style={{
              background: tab === t ? '#2E261F' : 'transparent',
              color: tab === t ? '#FAF7F5' : '#A8998A',
              borderBottom: tab === t ? '2px solid #FFBF00' : '2px solid transparent',
              fontFamily: 'var(--font-display)',
            }}
          >
            {t === 'voice' ? 'Voice AI Calculator' : 'Document Processing Calculator'}
          </button>
        ))}
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="flex flex-col gap-5">
          <p className="text-text-secondary text-[11px] tracking-[2px] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            Your current numbers
          </p>

          {tab === 'voice' ? (
            <>
              <div>
                <label className={labelClass}>Calls per day</label>
                <input type="number" value={callsPerDay} onChange={(e) => setCallsPerDay(Number(e.target.value))} className={inputClass} min={1} />
              </div>
              <div>
                <label className={labelClass}>Average call duration (minutes)</label>
                <input type="number" value={avgDuration} onChange={(e) => setAvgDuration(Number(e.target.value))} className={inputClass} min={1} />
              </div>
              <div>
                <label className={labelClass}>Current cost per minute ($)</label>
                <input type="number" value={currentCostPerMin} onChange={(e) => setCurrentCostPerMin(Number(e.target.value))} step={0.01} className={inputClass} min={0} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className={labelClass}>Documents per month</label>
                <input type="number" value={docsPerMonth} onChange={(e) => setDocsPerMonth(Number(e.target.value))} className={inputClass} min={1} />
              </div>
              <div>
                <label className={labelClass}>Average pages per document</label>
                <input type="number" value={pagesPerDoc} onChange={(e) => setPagesPerDoc(Number(e.target.value))} className={inputClass} min={1} />
              </div>
              <div>
                <label className={labelClass}>Current cost per page ($)</label>
                <input type="number" value={currentDocCost} onChange={(e) => setCurrentDocCost(Number(e.target.value))} step={0.01} className={inputClass} min={0} />
              </div>
            </>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          <p className="text-text-secondary text-[11px] tracking-[2px] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
            Your savings
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: '#0C0A08' }}>
              <p className="text-text-secondary text-xs mb-1">Monthly saving</p>
              <p className="text-2xl font-bold text-electric-blue" style={{ fontFamily: 'var(--font-mono)' }}>
                ${Math.round(tab === 'voice' ? voiceSaving : docSaving).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#0C0A08' }}>
              <p className="text-text-secondary text-xs mb-1">Annual saving</p>
              <p className="text-2xl font-bold text-electric-blue" style={{ fontFamily: 'var(--font-mono)' }}>
                ${Math.round(tab === 'voice' ? voiceAnnual : docAnnual).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tab === 'voice' ? voiceChartData : docChartData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E261F" />
                <XAxis dataKey="name" tick={{ fill: '#A8998A', fontSize: 11 }} />
                <YAxis tick={{ fill: '#A8998A', fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip
                  contentStyle={{ background: '#171411', border: '1px solid #2E261F', borderRadius: 8 }}
                  labelStyle={{ color: '#FAF7F5' }}
                  formatter={(v) => {
                    const num = typeof v === 'number' ? v : Number(v ?? 0)
                    return [`$${num.toLocaleString()}`, 'Monthly cost'] as [string, string]
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {(tab === 'voice' ? voiceChartData : docChartData).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
