import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Button as AriaButton, Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import {
  FaBookOpen,
  FaFlask,
  FaHistory,
  FaCubes,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaUserCheck,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSchool,
  FaShieldAlt,
  FaCrown,
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaBars,
  FaServer,
  FaUsers,
  FaEdit,
  FaFileAlt,
  FaLightbulb,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { UserRole, ROLE_DISPLAY_NAMES } from '../utils/rbac';
import { in3dFontStyle, TrademarkSymbol } from './In3DTypography';
import { Sheet, SheetContent } from './ui/sheet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SchoolCodeBlock } from './SchoolCodeBlock';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { canEditLesson, hasMinimumRole } from '../utils/rbac';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Normalize role to lowercase for consistent comparison
const normalizeRole = (role: string | undefined): UserRole => {
  if (!role) return 'student';
  const raw = role.toLowerCase().trim();
  // Handle case where someone might use "Super Admin" or "SuperAdmin"
  if (raw === 'super admin' || raw === 'super_admin') {
    return 'superadmin';
  }
  // Handle common variations
  if (['student', 'teacher', 'school', 'admin', 'superadmin', 'principal', 'associate'].includes(raw)) {
    return raw as UserRole;
  }
  return 'student'; // Default fallback
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed for minimal design
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const userRole = useMemo(() => normalizeRole(profile?.role), [profile?.role]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save collapsed state
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Don't render sidebar on these pages
  const hiddenPages = ['/login', '/signup', '/forgot-password', '/onboarding', '/approval-pending', '/secretbackend', '/vrlessonplayer', '/xrlessonplayer', '/in3d-demo'];
  if (hiddenPages.some(page => location.pathname.startsWith(page)) || !user) {
    return null;
  }

  // Role checks
  const isStudent = userRole === 'student';
  const isTeacher = userRole === 'teacher';
  const isPrincipal = userRole === 'principal';
  const isSchool = userRole === 'school';
  const isAssociate = userRole === 'associate';
  const [schoolCode, setSchoolCode] = useState<string | null>(null);

  // Fetch school code for School Admin and Teacher
  useEffect(() => {
    if (!profile || (userRole !== 'school' && userRole !== 'teacher')) return;
    const schoolId = profile.school_id || profile.managed_school_id;
    if (!schoolId) return;
    getDoc(doc(db, 'schools', schoolId))
      .then((snap) => {
        if (snap.exists()) setSchoolCode(snap.data()?.schoolCode || null);
      })
      .catch(() => {});
  }, [profile, userRole]);
  const isAdmin = userRole === 'admin';
  const isSuperadmin = userRole === 'superadmin';
  const isAdminOrSuperadmin = isAdmin || isSuperadmin;
  // School administrators should NOT have access to Create, Explore, History
  const canCreate = isTeacher || isAdminOrSuperadmin;

  // Build navigation items based on role according to the spec:
  // Associate: Dashboard, Lessons only (refine lessons, submit for approval)
  // Student: Dashboard, Lessons, Profile
  // Teacher: Dashboard, Lessons, Create, Explore, History, Studio, Profile, Settings
  // Principal: Dashboard, Lessons, Profile, Settings
  // Admin/Superadmin: Dashboard (Content), Lessons, Create, Explore, History, Approvals, System, Profile, Settings
  const getNavItems = (): NavItem[] => {
    const items: NavItem[] = [];

    // Associate: only Dashboard and Lessons
    if (isAssociate) {
      items.push({ path: '/dashboard/associate', label: 'Dashboard', icon: FaTachometerAlt });
      items.push({ path: '/lessons', label: 'Lessons', icon: FaBookOpen });
      return items;
    }

    // LMS Dashboards - role-based
    if (isStudent) {
      items.push({ path: '/dashboard/student', label: 'Dashboard', icon: FaTachometerAlt });
    } else if (isTeacher) {
      items.push({ path: '/dashboard/teacher', label: 'Dashboard', icon: FaTachometerAlt });
    } else if (isPrincipal) {
      items.push({ path: '/dashboard/principal', label: 'Dashboard', icon: FaTachometerAlt });
    } else if (isSchool) {
      items.push({ path: '/dashboard/school', label: 'Dashboard', icon: FaTachometerAlt });
    } else if (isAdminOrSuperadmin) {
      // Admin/Superadmin see content dashboard
      items.push({ path: '/studio/content', label: 'Dashboard', icon: FaTachometerAlt });
    }

    // Lessons - everyone can see
    items.push({ path: '/lessons', label: 'Lessons', icon: FaBookOpen });

    // AI Tutor (Personalized Learning) - students only; routes to /personalized-learning
    if (isStudent) {
      items.push({ path: '/personalized-learning', label: 'AI Tutor', icon: FaLightbulb });
    }

    // AI Teacher Support merged into Create page (top-right panel) - no separate nav item

    // Creator tools - teachers, schools, admin, superadmin (includes AI Teacher Support panel in top-right)
    if (canCreate) {
      items.push({ path: '/main', label: 'Create', icon: FaFlask });
      items.push({ path: '/explore', label: 'Explore', icon: FaCubes });
      items.push({ path: '/history', label: 'History', icon: FaHistory });
      // Studio / Chapter Editor - admin and superadmin only (no school)
    }

    // Teacher tools - approve students
    if (isTeacher) {
      items.push({ path: '/teacher/approvals', label: 'Student Approvals', icon: FaUserCheck });
    }

    // School administrator tools - approve teachers, manage classes
    if (isSchool) {
      items.push({ path: '/school/approvals', label: 'Teacher Approvals', icon: FaUserCheck });
      items.push({ path: '/admin/classes', label: 'Class Management', icon: FaUsers });
    }

    // Admin tools - only for admin/superadmin
    if (isAdminOrSuperadmin) {
      items.push({ path: '/admin/approvals', label: 'Approvals', icon: FaUserCheck });
      items.push({ path: '/admin/lesson-edit-requests', label: 'Lesson Edit Requests', icon: FaEdit });
      items.push({ path: '/admin/schools', label: 'School Management', icon: FaSchool });
      items.push({ path: '/admin/classes', label: 'Class Management', icon: FaUsers });
      items.push({ path: '/admin/logs', label: 'Production Logs', icon: FaFileAlt });
      items.push({ path: '/system-status', label: 'System', icon: FaServer });
    }

    // Studio tools - n8n Lesson Builder for studio roles (admin, superadmin, associate)
    if (profile && (canEditLesson(profile) || hasMinimumRole(profile, 'associate'))) {
      items.push({ path: '/studio/n8n-lesson-builder', label: 'n8n Lesson Builder', icon: FaFlask });
    }

    // Principal can also access class management, student approvals, and teacher approvals
    if (isPrincipal) {
      items.push({ path: '/teacher/approvals', label: 'Student Approvals', icon: FaUserCheck });
      items.push({ path: '/school/approvals', label: 'Teacher Approvals', icon: FaChalkboardTeacher });
      items.push({ path: '/admin/classes', label: 'Class Management', icon: FaUsers });
    }

    return items;
  };

  const navItems = getNavItems();

  // Role icon mapping
  const getRoleIcon = () => {
    switch (userRole) {
      case 'student': return FaGraduationCap;
      case 'teacher': return FaChalkboardTeacher;
      case 'principal': return FaSchool;
      case 'school': return FaSchool;
      case 'associate': return FaUser;
      case 'admin': return FaShieldAlt;
      case 'superadmin': return FaCrown;
      default: return FaUser;
    }
  };

  // Role color mapping
  const getRoleColor = () => {
    switch (userRole) {
      case 'student': return 'text-emerald-400';
      case 'teacher': return 'text-blue-400';
      case 'principal': return 'text-indigo-400';
      case 'school': return 'text-primary';
      case 'associate': return 'text-cyan-400';
      case 'admin': return 'text-amber-400';
      case 'superadmin': return 'text-rose-400';
      default: return 'text-gray-400';
    }
  };

  const getRoleBgColor = () => {
    switch (userRole) {
      case 'student': return 'bg-emerald-500/20';
      case 'teacher': return 'bg-blue-500/20';
      case 'principal': return 'bg-indigo-500/20';
      case 'school': return 'bg-primary/20';
      case 'associate': return 'bg-cyan-500/20';
      case 'admin': return 'bg-amber-500/20';
      case 'superadmin': return 'bg-rose-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const RoleIcon = getRoleIcon();
  const roleColor = getRoleColor();
  const roleBgColor = getRoleBgColor();

  const sidebarWidth = isCollapsed ? 'var(--sidebar-width-icon)' : 'var(--sidebar-width)';

  const NavContent = ({
    forceExpanded = false,
    onNavClick,
  }: {
    forceExpanded?: boolean;
    /** When set (e.g. mobile drawer), nav items use this to navigate and close drawer instead of Link */
    onNavClick?: (path: string) => void;
  }) => {
    const expanded = forceExpanded || !isCollapsed;
    const navLinkClass = (active: boolean) =>
      `group relative flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-primary/25 bg-primary/12 text-sidebar-foreground shadow-card'
          : 'border-transparent text-sidebar-foreground/80 hover:border-sidebar-border hover:bg-sidebar-accent/70 hover:text-sidebar-foreground'
      } ${!expanded ? 'justify-center px-0' : ''}`;

    const renderNavLink = (
      to: string,
      label: string,
      Icon: React.ComponentType<{ className?: string }>,
      active: boolean
    ) => {
      if (onNavClick) {
        return (
          <button
            type="button"
            onClick={() => {
              onNavClick(to);
            }}
            className={navLinkClass(active)}
            title={!expanded ? label : undefined}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {expanded && <span className="truncate">{label}</span>}
            {!expanded && (
              <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-xl border border-sidebar-border bg-popover/95 px-3 py-2 text-xs text-popover-foreground shadow-panel opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            )}
          </button>
        );
      }
      return (
        <Link to={to} className={navLinkClass(active)} title={!expanded ? label : undefined}>
          <Icon className="h-4 w-4 shrink-0" />
          {expanded && <span className="truncate">{label}</span>}
          {!expanded && (
            <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-xl border border-sidebar-border bg-popover/95 px-3 py-2 text-xs text-popover-foreground shadow-panel opacity-0 transition-opacity group-hover:opacity-100">
              {label}
            </span>
          )}
        </Link>
      );
    };

    return (
      <div className="flex h-full flex-col">
        <div className="flex h-20 shrink-0 items-center gap-2 border-b border-sidebar-border/80 px-3">
          <Link
            to={isAdminOrSuperadmin ? '/studio/content' : isAssociate ? '/dashboard/associate' : '/lessons'}
            className={cn(
              'flex min-w-0 items-center gap-3 rounded-2xl border border-transparent px-2.5 py-2 transition-colors hover:border-sidebar-border hover:bg-sidebar-accent/60',
              expanded ? 'flex-1' : 'justify-center'
            )}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sidebar-border/80 bg-sidebar-primary/15 text-sidebar-primary shadow-card">
              <FaGraduationCap className="h-5 w-5" />
            </div>
            {expanded && (
              <div className="min-w-0">
                <span className="block truncate font-semibold leading-none" style={in3dFontStyle}>
                  <span className="text-sidebar-foreground">In3D</span>
                  <span className="text-sidebar-primary">.ai</span>
                  <TrademarkSymbol className="ml-0.5 inline" />
                </span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  AI workspace
                </span>
              </div>
            )}
          </Link>
          {expanded && (
            <div className="rounded-full border border-sidebar-border bg-sidebar-accent/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Live
            </div>
          )}
        </div>
        {(isSchool || isTeacher) && schoolCode && (
          <div className="shrink-0 border-b border-sidebar-border/80 px-3 py-3">
            {expanded ? (
              <SchoolCodeBlock code={schoolCode} variant="sidebar" />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sidebar-border/80 bg-sidebar-accent/40 text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                    title="School code"
                    aria-label="Show school code"
                  >
                    <FaSchool className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="min-w-[220px] rounded-2xl border-border/80 bg-card/95 p-3 shadow-panel backdrop-blur-2xl">
                  <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">School code</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold tracking-wider">{schoolCode}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(schoolCode);
                          toast.success('School code copied');
                        } catch {}
                      }}
                    >
                      <FaCopy className="h-3 w-3" /> Copy
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {expanded && (
            <div className="mb-4 rounded-[1.5rem] border border-sidebar-border/80 bg-sidebar-accent/35 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">Workspace</p>
              <p className="mt-2 text-sm font-medium text-sidebar-foreground">
                {ROLE_DISPLAY_NAMES[userRole] || userRole} console
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Navigation is tailored to your role and current permissions.</p>
            </div>
          )}
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/lessons' && location.pathname.startsWith(item.path + '/'));
              return (
                <li key={item.path}>{renderNavLink(item.path, item.label, item.icon, isActive)}</li>
              );
            })}
          </ul>
          <div className="my-4 h-px bg-sidebar-border/80" />
          <ul className="space-y-1.5">
            {isAdminOrSuperadmin && (
              <li>
                {renderNavLink('/developer', 'Settings', FaCog, location.pathname === '/developer')}
              </li>
            )}
          </ul>
        </nav>
        <div className="shrink-0 border-t border-sidebar-border/80 bg-sidebar/70 p-3 backdrop-blur-xl">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`group relative mb-2 flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sm text-sidebar-foreground transition-all duration-200 hover:border-sidebar-border hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground ${!expanded ? 'justify-center px-0' : ''}`}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <FaSun className="h-4 w-4 shrink-0" /> : <FaMoon className="h-4 w-4 shrink-0" />}
            {expanded && <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
            {!expanded && (
              <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-xl border border-sidebar-border bg-popover/95 px-3 py-2 text-xs text-popover-foreground shadow-panel opacity-0 transition-opacity group-hover:opacity-100">
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </span>
            )}
          </button>
          <MenuTrigger>
            <AriaButton
              className={`group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-3 text-sidebar-foreground transition-all duration-200 hover:border-sidebar-border hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground ${!expanded ? 'justify-center px-0' : ''}`}
              aria-label="Account menu"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sidebar-border/80 ${roleColor} ${roleBgColor}`}>
                <RoleIcon className="h-4 w-4" />
              </div>
              {expanded && (
                <div className="min-w-0 flex-1 truncate text-left">
                  <p className="truncate text-xs font-medium">
                    {ROLE_DISPLAY_NAMES[userRole] || userRole}
                    {profile?.isGuest && (
                      <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[9px] font-normal">
                        Guest
                      </Badge>
                    )}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {profile?.name || profile?.displayName || 'User'}
                  </p>
                </div>
              )}
            </AriaButton>
            <Popover
              placement="right top"
              className="w-64 rounded-[1.5rem] border border-border/80 bg-card/95 p-2 shadow-panel backdrop-blur-2xl"
            >
              <Menu
                aria-label="Account actions"
                className="space-y-1 outline-none"
                onAction={(key) => {
                  if (key === 'profile') {
                    navigate('/profile');
                    return;
                  }
                  if (key === 'logout') {
                    void handleLogout();
                  }
                }}
              >
                <MenuItem
                  id="profile"
                  className={({ isFocused }) =>
                    cn(
                      'flex cursor-default items-center gap-3 rounded-2xl px-3 py-3 outline-none transition-colors',
                      isFocused ? 'bg-accent/70 text-foreground' : 'text-foreground'
                    )
                  }
                >
                  <FaUser className="h-4 w-4" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Profile</p>
                    <p className="text-xs text-muted-foreground">Manage your account and settings</p>
                  </div>
                </MenuItem>
                <MenuItem
                  id="logout"
                  className={({ isFocused }) =>
                    cn(
                      'flex cursor-default items-center gap-3 rounded-2xl px-3 py-3 outline-none transition-colors',
                      isFocused ? 'bg-destructive/12 text-destructive' : 'text-destructive'
                    )
                  }
                >
                  <FaSignOutAlt className="h-4 w-4" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Logout</p>
                    <p className="text-xs text-muted-foreground">End the current session securely</p>
                  </div>
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile: Sheet (left) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-2xl border border-sidebar-border/80 bg-sidebar/90 text-sidebar-foreground shadow-card backdrop-blur-xl transition-colors hover:bg-sidebar-accent lg:hidden"
          aria-label="Open menu"
        >
          <FaBars className="h-4 w-4" />
        </button>
        <SheetContent side="left" className="w-sidebar border-sidebar-border/80 bg-sidebar/95 p-0">
          <div className="flex h-16 items-center border-b border-sidebar-border/80 px-4">
            <span className="font-semibold" style={in3dFontStyle}>
              <span className="text-sidebar-foreground">In3D</span>
              <span className="text-sidebar-primary">.ai</span>
              <TrademarkSymbol className="ml-0.5 inline" />
            </span>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden py-2">
            <NavContent
              forceExpanded
              onNavClick={(path) => {
                navigate(path);
                setIsMobileOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop: Icon sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border/80 bg-sidebar/92 backdrop-blur-2xl transition-[width] duration-300 ease-out lg:flex"
        style={{ width: sidebarWidth }}
      >
        <NavContent />
        {/* Rail: collapse toggle (shadcn-style) */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-sidebar-border/80 bg-sidebar shadow-card text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <FaChevronRight className="h-3 w-3" />
          ) : (
            <FaChevronLeft className="h-3 w-3" />
          )}
        </button>
      </aside>

      {/* Spacer */}
      <div className="hidden lg:block shrink-0 transition-[width] duration-200" style={{ width: sidebarWidth }} />
    </>
  );
};

export default Sidebar;
