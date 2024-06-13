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
    <div>
      <Link
        href={`?category=${slug}`}
        scroll={false}
        className={
          'bg-background-600 p-2 rounded-lg transition-all' +
          ` cursor-pointer border-2 ${
            active ? 'border-primary' : 'border-primary/0'
          } hover:border-primary`
        }
      >
        {title}
      </Link>
    </div>
  );
}
