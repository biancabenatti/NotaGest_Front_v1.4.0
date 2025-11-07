import { NextRequest, NextResponse } from 'next/server';

export interface Cupom {
  id: number;
  titulo: string;
  data: string; // ISO string: '2025-09-22'
  status: 'pendente' | 'pago';
}
export async function GET(req: NextRequest) {
  const cupons: Cupom[] = [
    { id: 1, titulo: 'NF 1234', data: '2025-09-22', status: 'pendente' },
    { id: 2, titulo: 'NF 5678', data: '2025-09-25', status: 'pago' },
  ];

  return NextResponse.json(cupons);
}
