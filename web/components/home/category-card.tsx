'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function CategoryCard({
  title,
  slug,
}: {
  title: string;
  slug?: string;
}) {
  const searchs = useSearchParams();
  const category = searchs.get('category');
  const active = category === slug;
  return (
    <div className="">
      <Link
        href={`?category=${slug}`}
        scroll={false}
        className={
          'bg-background-600 p-2 h-[40px] rounded-lg transition-all' +
          ` cursor-pointer border-2 ${
            active ? 'border-primary' : 'border-primary/0'
          } font-bold hover:border-primary`
        }
      >
        {title}
      </Link>
    </div>
  );
}
