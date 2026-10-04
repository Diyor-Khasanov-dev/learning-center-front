import type { TransactionDto, TransactionType } from '@/shared/types'
import { db, json, nextId, noContent, page, type Row } from './state'

/**
 * Hisoblar va to'lovlar.
 *
 * Haqiqiy backendda hisob 12-darsdan keyin AVTOMATIK yaratiladi va uni
 * mijoz tomondan yaratib bo'lmaydi — shuning uchun bu yerda ham `POST
 * /invoice` yo'q. To'lov esa `POST /transaction` orqali yoziladi.
 */
export function handleInvoices(
    path: string,
    method: string,
    url: URL,
    body: Record<string, unknown>
): Response | null {
    if (path === '/invoice' && method === 'GET') {
        const status = url.searchParams.get('status')
        const byStatus = status ? db.invoices.filter((invoice) => invoice.paymentStatus === status) : db.invoices
        // Backend qidiruvi o'quvchi TELEFONINI ham qamraydi (to'lov oynasi
        // hisoblarni shu bilan topadi), hisob qatorida esa telefon yo'q —
        // shuning uchun telefonni o'quvchidan qarab qo'shib qidiramiz.
        const search = (url.searchParams.get('search') ?? '').toLowerCase()
        const rows = search
            ? byStatus.filter((invoice) => {
                  const student = db.students.find((item) => item.id === invoice.enrollmentDto?.studentId)
                  return `${JSON.stringify(invoice)} ${student?.userDto?.phone ?? ''}`.toLowerCase().includes(search)
              })
            : byStatus
        const params = new URL(url)
        params.searchParams.delete('search')
        return page(rows as unknown as Row[], params)
    }
    // Guruhga qo'lda hisob yaratish. Ikkinchi marta chaqirilsa haqiqiy
    // backend 409 qaytaradi — demo'da ham shunday, tugmaning xato holati
    // ko'rinsin.
    if (path.startsWith('/invoice/') && method === 'POST') {
        const groupId = path.split('/')[2]
        const already = db.invoices.some((invoice) => invoice.enrollmentDto?.groupId === groupId)
        if (already) return json({ errorCode: 'AlreadyExists', message: 'Invoice already created' }, 409)

        const created = db.students.slice(0, 2).map((student, index) => ({
            id: nextId('i'),
            invoiceNumber: `INV-${String(db.invoices.length + index + 1).padStart(3, '0')}`,
            amount: 450000,
            issuedAt: new Date().toISOString().slice(0, 19),
            paymentStatus: 'PENDING' as const,
            enrollmentDto: {
                id: nextId('e'),
                studentId: student.id,
                studentFullName: student.userDto?.fullName,
                groupId,
            },
        }))
        db.invoices = [...db.invoices, ...created]
        return noContent()
    }
    if (path.startsWith('/invoice/') && method === 'DELETE') {
        const id = path.split('/')[2]
        db.invoices = db.invoices.filter((invoice) => invoice.id !== id)
        return noContent()
    }

    if (path === '/transaction' && method === 'GET') {
        return page(db.transactions as unknown as Row[], url)
    }
    if (path === '/transaction' && method === 'POST') {
        const studentId = String(body.studentId ?? '')
        const student = db.students.find((item) => item.id === studentId)
        // Backendda `invoiceId` `@NotNull` — yuborilmasa 400.
        if (!body.invoiceId) return json({ errorCode: 'BadRequest', message: 'invoiceId must not be null' }, 400)
        const invoice = db.invoices.find((item) => item.id === body.invoiceId)
        if (!invoice) return json({ message: 'Invoice not found' }, 404)
        if (body.type === 'PAID' && invoice.paymentStatus === 'PAID') {
            return json({ errorCode: 'BadRequest', message: 'Invoice already paid' }, 400)
        }

        const transaction: TransactionDto = {
            id: nextId('t'),
            type: body.type as TransactionType,
            amount: Number(body.amount),
            note: body.note ? String(body.note) : undefined,
            invoice,
            user: student,
            createdAt: new Date().toISOString().slice(0, 19),
        }
        db.transactions = [transaction, ...db.transactions]
        return json(transaction)
    }
    if (path.startsWith('/transaction/') && method === 'DELETE') {
        const id = path.split('/')[2]
        db.transactions = db.transactions.filter((transaction) => transaction.id !== id)
        return noContent()
    }

    return null
}
