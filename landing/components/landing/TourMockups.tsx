import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { TourMock } from '@/data/translations'

// Namuna ekranlar ilovadagi haqiqiy bo'limlarni takrorlaydi: lid holatlari,
// davomat belgilari, hisob holatlari va o'quvchi paneli. Ilovada yo'q narsa
// (SMS, onlayn to'lov, QR) bu yerga qo'shilmaydi.

const card = 'bg-neutral-950 p-3 rounded-lg border border-neutral-800 hover:border-blue-800 transition-colors'
const item = 'bg-neutral-900 p-2.5 rounded-md text-xs border border-neutral-800 space-y-1'
const tag = 'inline-block text-[9px] font-bold bg-blue-950 text-blue-400 px-1.5 py-0.5 rounded border border-blue-900'
const muted = 'inline-block text-[9px] font-bold bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded'

function LeadsMock({ m }: { m: TourMock }) {
  const columns = [
    { title: m.leadColumns[0], count: 12, leads: [['Anvar K.', 'General English', 'Instagram'], ['Malika S.', 'IELTS', 'Telegram']] },
    { title: m.leadColumns[1], count: 4, leads: [['Rustam T.', m.callToday, '']] },
    { title: m.leadColumns[2], count: 5, leads: [['Shahzod B.', `${m.groupLabel}: IELTS 4`, '']] },
  ]
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 animate-in fade-in duration-300'>
      {columns.map((col) => (
        <div key={col.title} className={`${card} space-y-2`}>
          <div className='text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between'>
            <span>{col.title}</span>
            <span className='bg-blue-950 border border-blue-900 px-1.5 rounded text-[10px]'>{col.count}</span>
          </div>
          {col.leads.map(([name, detail, source]) => (
            <div key={name} className={item}>
              <div className='font-bold text-white'>{name}</div>
              <div className='text-[10px] text-neutral-400'>{detail}</div>
              {source && <span className={tag}>{source}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function AttendanceMock({ m }: { m: TourMock }) {
  const rows: [string, string, boolean][] = [
    ['Kamila Y.', m.present, true],
    ['Sardor M.', m.present, true],
    ['Jasur T.', m.excused, false],
    ['Dilnoza R.', m.absent, false],
  ]
  return (
    <div className='space-y-3 pt-2 animate-in fade-in duration-300'>
      <div className={`${card} space-y-2`}>
        <div className='text-xs font-bold text-neutral-200'>{m.lessonTitle}</div>
        {rows.map(([name, status, ok]) => (
          <div key={name} className='flex items-center justify-between bg-neutral-900 px-2.5 py-2 rounded-md border border-neutral-800 text-xs'>
            <span className='font-semibold text-white'>{name}</span>
            <span className={ok ? tag : muted}>{status}</span>
          </div>
        ))}
      </div>
      <div className='flex items-center gap-2 text-[11px] text-blue-400'>
        <CheckCircle2 className='h-3.5 w-3.5' />
        <span>{m.markedNote}</span>
      </div>
    </div>
  )
}

function PaymentsMock({ m }: { m: TourMock }) {
  return (
    <div className='space-y-3 pt-2 animate-in fade-in duration-300'>
      <div className='grid grid-cols-3 gap-3'>
        {[
          [m.paid, '86'],
          [m.pending, '23'],
          [m.overdue, '7'],
        ].map(([label, value]) => (
          <div key={label} className={card}>
            <div className='text-[10px] text-neutral-400 font-medium'>{label}</div>
            <div className='text-xl font-black text-white mt-1'>{value}</div>
          </div>
        ))}
      </div>
      <div className={`${card} text-xs space-y-2`}>
        <div className='font-bold text-neutral-200'>{m.paymentsTitle}</div>
        {[
          ['Sardor M.', m.paidAction, '+450 000'],
          ['Kamila Y.', m.monthlyFee, '−450 000'],
        ].map(([name, type, amount]) => (
          <div key={name + type} className='flex justify-between text-[11px] text-neutral-300 border-t border-neutral-800 pt-2'>
            <span>{name} · {type}</span>
            <span className='text-blue-400 font-bold'>{amount} so&apos;m</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StudentMock({ m }: { m: TourMock }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-in fade-in duration-300'>
      <div className={`${card} space-y-2`}>
        <div className='text-xs font-bold text-neutral-200'>{m.myAttendance}</div>
        <div className='bg-neutral-900 p-3 rounded-md text-[11px] text-neutral-300 border border-neutral-800'>
          {m.attendanceSummary}
        </div>
      </div>
      <div className={`${card} space-y-2`}>
        <div className='text-xs font-bold text-neutral-200'>{m.myBalance}</div>
        <div className='bg-neutral-900 p-3 rounded-md border border-neutral-800'>
          <div className='text-lg font-black text-white'>0 so&apos;m</div>
          <div className='text-[10px] text-blue-400'>{m.balanceHint}</div>
        </div>
      </div>
      <div className={`${card} space-y-1 sm:col-span-2 text-[11px]`}>
        <div className='text-xs font-bold text-neutral-200'>{m.myGroup}</div>
        <div className='text-neutral-300'>IELTS 4 · {m.teacherLabel}: Aziza N. · 14:00</div>
      </div>
    </div>
  )
}

export function TourMockup({ tab, mock }: { tab: string; mock: TourMock }) {
  if (tab === 'attendance') return <AttendanceMock m={mock} />
  if (tab === 'payments') return <PaymentsMock m={mock} />
  if (tab === 'student') return <StudentMock m={mock} />
  return <LeadsMock m={mock} />
}
