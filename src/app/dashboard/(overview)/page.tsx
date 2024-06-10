import { lusitana } from '@/src/components/layout/fonts';
import { fetchCardData } from '@/src/modules/home/data';
import RevenueChart from '@/src/components/home/revenue-chart';
import LatestInvoices from '@/src/components/home/latest-invoices';
import { Card } from '@/src/components/home/cards';
import { Suspense } from 'react';
import CardWrapper from '@/src/components/home/cards';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardSkeleton,
} from '@/src/components/home/skeletons';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
