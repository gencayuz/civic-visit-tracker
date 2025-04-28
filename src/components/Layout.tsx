
import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavItem = ({ to, children, className }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
};

const Layout: React.FC = () => {
  const { user, logout, isAdmin, isDirectorate } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Icon component for better organization
  const Icon = ({ icon, className = "" }: { icon: string, className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {icon === 'dashboard' && (
        <>
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </>
      )}
      {icon === 'visits' && (
        <>
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
          <line x1="3" x2="21" y1="9" y2="9"></line>
          <line x1="9" x2="9" y1="21" y2="9"></line>
        </>
      )}
      {icon === 'events' && (
        <>
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
          <path d="M9 16h6"></path>
        </>
      )}
      {icon === 'departments' && (
        <>
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </>
      )}
      {icon === 'directorates' && (
        <>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </>
      )}
      {icon === 'reports' && (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" x2="8" y1="13" y2="13"></line>
          <line x1="16" x2="8" y1="17" y2="17"></line>
          <line x1="10" x2="8" y1="9" y2="9"></line>
        </>
      )}
      {icon === 'settings' && (
        <>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </>
      )}
      {icon === 'menu' && (
        <>
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </>
      )}
      {icon === 'logout' && (
        <>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" x2="9" y1="12" y2="12"></line>
        </>
      )}
      {icon === 'chevron-left' && (
        <>
          <path d="m15 18-6-6 6-6"></path>
        </>
      )}
      {icon === 'user' && (
        <>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </>
      )}
    </svg>
  );

  // Check if the user is from a directorate
  const isDirectorateUser = isDirectorate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <Icon icon="visits" className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold">Belediye Takip</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "ml-auto h-8 w-8 p-0",
              !sidebarOpen && "mx-auto"
            )}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Icon icon={sidebarOpen ? "chevron-left" : "menu"} />
          </Button>
        </div>

        <div className="py-4 space-y-1 px-3">
          {/* Only show Dashboard for non-directorate users */}
          {!isDirectorateUser && (
            <NavItem to="/dashboard">
              <Icon icon="dashboard" />
              {sidebarOpen && <span>Gösterge Paneli</span>}
            </NavItem>
          )}
          
          {!isDirectorateUser && (
            <>
              <div className="pt-4 pb-2">
                {sidebarOpen && <div className="px-3 text-xs font-semibold text-muted-foreground tracking-wider">VATANDAŞ İŞLEMLERİ</div>}
              </div>
              
              <NavItem to="/visits">
                <Icon icon="visits" />
                {sidebarOpen && <span>Ziyaretler</span>}
              </NavItem>
              
              <NavItem to="/events">
                <Icon icon="events" />
                {sidebarOpen && <span>Etkinlikler</span>}
              </NavItem>
              
              <NavItem to="/departments">
                <Icon icon="departments" />
                {sidebarOpen && <span>Departmanlar</span>}
              </NavItem>
            </>
          )}
          
          {/* Directorates link is shown to all users */}
          <NavItem to="/directorates">
            <Icon icon="directorates" />
            {sidebarOpen && <span>Müdürlükler</span>}
          </NavItem>
          
          {/* Admin section only visible to admins */}
          {isAdmin() && (
            <>
              <div className="pt-4 pb-2">
                {sidebarOpen && <div className="px-3 text-xs font-semibold text-muted-foreground tracking-wider">YÖNETİM</div>}
              </div>
              
              <NavItem to="/reports">
                <Icon icon="reports" />
                {sidebarOpen && <span>Raporlar</span>}
              </NavItem>
              
              <NavItem to="/settings">
                <Icon icon="settings" />
                {sidebarOpen && <span>Ayarlar</span>}
              </NavItem>
            </>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-background flex items-center px-6">
          <h1 className="text-2xl font-semibold">Belediye Ziyaret ve Etkinlik Takip</h1>
          
          {/* User dropdown */}
          <div className="ml-auto flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon icon="user" className="h-5 w-5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.role === 'admin' ? 'Yönetici' : 
                       user?.role === 'directorate' ? 'Müdürlük' : 'Personel'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <Icon icon="logout" className="mr-2 h-4 w-4" />
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-secondary/20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
