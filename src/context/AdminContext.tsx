import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';

const STORAGE_CONTENT_KEY = 'orma_site_content';
const STORAGE_AUTH_KEY = 'orma_admin_session';
const ADMIN_PIN = '1994';

interface AdminContextType {
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  content: Record<string, string>;
  pendingChanges: Record<string, string>;
  hasUnsavedChanges: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  updateContent: (key: string, value: string) => void;
  saveChanges: () => void;
  discardChanges: () => void;
  resetToDefaults: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  activeImageModal: { key: string; currentSrc: string } | null;
  openImageModal: (key: string, currentSrc: string) => void;
  closeImageModal: () => void;
  applyImageSwap: (key: string, newSrc: string) => void;
  savedToast: boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [persistedContent, setPersistedContent] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CONTENT_KEY);
      if (stored) {
        return { ...DEFAULT_SITE_CONTENT, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Error reading persisted content:', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [activeImageModal, setActiveImageModal] = useState<{ key: string; currentSrc: string } | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  // Check URL route /admin-1994 on mount and popstate
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isAdminRoute =
        path === '/admin-1994' ||
        path.startsWith('/admin-1994') ||
        hash === '#/admin-1994' ||
        hash === '#admin-1994' ||
        hash.includes('admin-1994');

      const hasSession = localStorage.getItem(STORAGE_AUTH_KEY) === 'true';

      if (isAdminRoute) {
        if (hasSession) {
          setIsAdmin(true);
        } else {
          setIsAuthModalOpen(true);
        }
      } else if (hasSession) {
        setIsAdmin(true);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const login = (pin: string): boolean => {
    if (pin.trim() === ADMIN_PIN) {
      localStorage.setItem(STORAGE_AUTH_KEY, 'true');
      setIsAdmin(true);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_AUTH_KEY);
    setIsAdmin(false);
    setPendingChanges({});
    setIsAuthModalOpen(false);

    // Redirect back to /
    if (window.location.pathname.includes('admin-1994') || window.location.hash.includes('admin-1994')) {
      window.history.pushState(null, '', '/');
    }
  };


  const updateContent = (key: string, value: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveChanges = () => {
    const updated = {
      ...persistedContent,
      ...pendingChanges,
    };
    try {
      localStorage.setItem(STORAGE_CONTENT_KEY, JSON.stringify(updated));
      setPersistedContent(updated);
      setPendingChanges({});
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const discardChanges = () => {
    setPendingChanges({});
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_CONTENT_KEY);
      setPersistedContent(DEFAULT_SITE_CONTENT);
      setPendingChanges({});
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch (e) {
      console.error('Failed to reset to defaults:', e);
    }
  };

  const openImageModal = (key: string, currentSrc: string) => {
    setActiveImageModal({ key, currentSrc });
  };

  const closeImageModal = () => {
    setActiveImageModal(null);
  };

  const applyImageSwap = (key: string, newSrc: string) => {
    updateContent(key, newSrc);
    closeImageModal();
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Merged content
  const content = {
    ...persistedContent,
    ...pendingChanges,
  };

  const hasUnsavedChanges = Object.keys(pendingChanges).length > 0;

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isAuthModalOpen,
        content,
        pendingChanges,
        hasUnsavedChanges,
        login,
        logout,
        updateContent,
        saveChanges,
        discardChanges,
        resetToDefaults,
        openAuthModal,
        closeAuthModal,
        activeImageModal,
        openImageModal,
        closeImageModal,
        applyImageSwap,
        savedToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
