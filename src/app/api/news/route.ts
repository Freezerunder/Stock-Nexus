import { NextResponse } from 'next/server';
import { getStockNews } from '@/lib/api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'AAPL';
    const news = await getStockNews(symbol);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 });
  }
}
