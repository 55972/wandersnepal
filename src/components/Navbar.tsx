'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Menu, X, User, LogOut, MapPin, BookOpen, Users, Calendar, Home, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { siteConfig } from '@/lib/config';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/places', label: 'Destinations', icon: MapPin },
    { path: '/tour-plans', label: 'Tour Plans', icon: Calendar },
    { path: '/tour-guides', label: 'Tour Guides', icon: Users },
    { path: '/blog', label: 'Blog', icon: BookOpen },
  ];

  const isActive = (path: string) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-kaleo-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-xl lg:text-2xl font-serif font-bold text-kaleo-charcoal">{siteConfig.siteName}</span>
                <span className="text-xs text-kaleo-terracotta hidden sm:inline">.com.np</span>
              </div>
              <span className="text-xs text-kaleo-charcoal/50 hidden sm:inline">Powered by Bibash Baniya & Aayush Rijal</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path) ? 'text-kaleo-terracotta bg-kaleo-terracotta/10' : 'text-kaleo-charcoal hover:text-kaleo-terracotta hover:bg-kaleo-terracotta/5'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Input type="search" placeholder="Search places..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pr-10 bg-white/80 border-kaleo-terracotta/20 focus:border-kaleo-terracotta" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-kaleo-terracotta hover:text-kaleo-charcoal">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-kaleo-terracotta/10 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="hidden lg:inline text-sm font-medium text-kaleo-charcoal">{user?.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild><Link href="/profile" className="flex items-center"><User className="w-4 h-4 mr-2" />Profile</Link></DropdownMenuItem>
                  {isAdmin && <DropdownMenuItem asChild><Link href="/admin" className="flex items-center"><Shield className="w-4 h-4 mr-2" />Admin</Link></DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600"><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => router.push('/login')} className="text-kaleo-charcoal hover:text-kaleo-terracotta">Login</Button>
                <Button size="sm" onClick={() => router.push('/register')} className="bg-kaleo-terracotta hover:bg-kaleo-charcoal text-white">Register</Button>
              </div>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-kaleo-terracotta/10 transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-kaleo-charcoal" /> : <Menu className="w-6 h-6 text-kaleo-charcoal" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-kaleo-cream/95 backdrop-blur-md border-t border-kaleo-terracotta/10">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="md:hidden">
              <div className="relative">
                <Input type="search" placeholder="Search places..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="w-full pr-10 bg-white/80" />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-kaleo-terracotta"><Search className="w-4 h-4" /></button>
              </div>
            </form>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(link.path) ? 'text-kaleo-terracotta bg-kaleo-terracotta/10' : 'text-kaleo-charcoal hover:bg-kaleo-terracotta/5'}`}>
                  <link.icon className="w-5 h-5" /><span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
            {!isAuthenticated && (
              <div className="sm:hidden pt-4 border-t border-kaleo-terracotta/10 space-y-2">
                <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>Login</Button>
                <Button className="w-full bg-kaleo-terracotta hover:bg-kaleo-charcoal" onClick={() => router.push('/register')}>Register</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
