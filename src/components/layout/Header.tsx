import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Menu, FileText } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', href: '#', active: true },
  { label: 'Patients', href: '#', active: false },
  { label: 'Reports', href: '#', active: false },
  { label: 'Settings', href: '#', active: false },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[100] bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <FileText className="w-[18px] h-[18px] text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">AssessFlow</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-150',
                  item.active
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center rounded-full transition-shadow duration-150 hover:ring-2 hover:ring-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="User menu"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary-100 text-primary-700 text-sm font-semibold">
                      DR
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 mt-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-150',
                    item.active
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
