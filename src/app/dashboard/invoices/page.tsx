import { lusitana } from '@/src/components/layout/fonts';
import { CreateInvoice } from '@/src/components/invoices/buttons';
import Search from '@/src/components/layout/search';
import { InvoicesTableSkeleton } from '@/src/components/home/skeletons';
import { Suspense } from 'react';
import Table from '@/src/components/invoices/table';
import { fetchInvoicesPages } from '@/src/modules/home/data';
import Pagination from '@/src/components/invoices/pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
// useSearchParam -> /dashboard/invoices?page=1&query=pending = {page: '1', query: 'pending'}
// usePathname -> /dashboard/invoices = /dashboard/invoices
// useRouter

// Capture the user's input.
// Update the URL with the search params.
// Keep the URL in sync with the input field.
// Update the table to reflect the search query.
