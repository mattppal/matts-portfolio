import { LinkTree } from '@/components/links/link-tree';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Connect with Matt Palmer across various platforms',
};

export default function LinksPage() {
  return (
    <main className="container mx-auto flex max-w-2xl flex-col items-center gap-8 px-4 py-8">
      <LinkTree />
    </main>
  );
}
