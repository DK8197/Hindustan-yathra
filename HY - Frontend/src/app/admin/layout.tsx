import Link from 'next/link';
import {
  LayoutDashboard, Map, Compass, Users, MessageSquare, Star, HelpCircle, Search, Image as ImageIcon, Languages,
} from 'lucide-react';
import './admin.css';

const navGroups = [
  {
    title: 'Content',
    links: [
      { href: '/admin/tours', label: 'Tours', icon: Map },
      { href: '/admin/destinations', label: 'Destinations', icon: Compass },
      { href: '/admin/banners', label: 'Banners', icon: ImageIcon },
    ],
  },
  {
    title: 'Engagement',
    links: [
      { href: '/admin/leads', label: 'Leads', icon: MessageSquare },
      { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
      { href: '/admin/users', label: 'Users', icon: Users },
    ],
  },
  {
    title: 'Site',
    links: [
      { href: '/admin/seo', label: 'SEO', icon: Search },
      { href: '/admin', label: 'Language Content', icon: Languages },
      { href: '/admin', label: 'FAQs', icon: HelpCircle },
    ],
  },
];

// Deliberately outside app/[locale] — this is an internal operational tool,
// not a public/SEO/bilingual surface, and is protected by requireAdmin()
// on every mutating API route (see src/lib/auth.ts).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="admin-body">
        <div className="flex min-h-screen">
          <aside className="w-64 shrink-0 border-r bg-white p-4">
            <Link href="/admin" className="mb-8 block px-2 text-lg font-semibold text-himalaya-900">
              <LayoutDashboard className="mb-1 inline" size={18} /> HY Admin
            </Link>
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {group.title}
                </p>
                {group.links.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-himalaya-50"
                  >
                    <Icon size={16} /> {label}
                  </Link>
                ))}
              </div>
            ))}
          </aside>
          <main className="flex-1 bg-gray-50 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
