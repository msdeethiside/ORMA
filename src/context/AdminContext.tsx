import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase/firebase';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';

const STORAGE_AUTH_KEY = 'orma_admin_session';
const ADMIN_PIN = '1994';
const SITE_CONTENT_DOC_PATH = 'site_content/live';

interface AdminContextType {
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  content: Record<string, string>;
  pendingChanges: Record<string, string>;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  isLoadingFromDb: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
  updateContent: (key: string, value: string) => void;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
  resetToDefaults: () => Promise<void>;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  activeImageModal: { key: string; currentSrc: string } | null;
  openImageModal: (key: string, currentSrc: string) => void;
  closeImageModal: () => void;
  applyImageSwap: (key: string, newSrc: string) => void;
  savedToast: boolean;
  saveError: string | null;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [persistedContent, setPersistedContent] = useState<Record<string, string>>(DEFAULT_SITE_CONTENT);
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [activeImageModal, setActiveImageModal] = useState<{ key: string; currentSrc: string } | null>(null);
  const [savedToast, setSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isLoadingFromDb, setIsLoadingFromDb] = useState(true);

  // 1. Cloud Firestore Realtime Sync:
  // On page load, fetch content key-value mapping from Firestore so all public visitors immediately see latest live edits.
  useEffect(() => {
    const liveDocRef = doc(db, 'site_content', 'live');

    const unsubscribe = onSnapshot(
      liveDocRef,
      (snapshot) => {
        setIsLoadingFromDb(false);
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && typeof data.content === 'object' && data.content !== null) {
            setPersistedContent({
              ...DEFAULT_SITE_CONTENT,
              ...(data.content as Record<string, string>),
            });
          }
        }
      },
      (error) => {
        setIsLoadingFromDb(false);
        console.warn('Realtime listener fallback to default content:', error.message);
        try {
          handleFirestoreError(error, OperationType.GET, SITE_CONTENT_DOC_PATH);
        } catch (e) {
          console.error('Firestore Error caught:', e);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Route Check for /admin-1994 and Admin Session
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const isAdminRoute =
        path.includes('admin-1994') ||
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

    // Redirect cleanly without breaking subpath repository deployments
    if (window.location.pathname.includes('admin-1994') || window.location.hash.includes('admin-1994')) {
      const cleanPath = window.location.pathname.replace(/\/admin-1994.*$/i, '') || '/';
      window.history.pushState(null, '', cleanPath + '#/');
    }
  };

  const updateContent = (key: string, value: string) => {
    setPendingChanges((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 3. Batch-save all modified keys directly to cloud Firestore
  const saveChanges = async () => {
    if (Object.keys(pendingChanges).length === 0) return;

    setIsSaving(true);
    setSaveError(null);

    const updated = {
      ...persistedContent,
      ...pendingChanges,
    };

    try {
      const liveDocRef = doc(db, 'site_content', 'live');
      await setDoc(
        liveDocRef,
        {
          content: updated,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin-1994',
        },
        { merge: true }
      );

      setPersistedContent(updated);
      setPendingChanges({});
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3500);
    } catch (error) {
      console.error('Failed to batch-save content to Firestore:', error);
      setSaveError('Failed to save to cloud database. Please retry.');
      try {
        handleFirestoreError(error, OperationType.WRITE, SITE_CONTENT_DOC_PATH);
      } catch (e) {
        // Logged structured error
      }
    } finally {
      setIsSaving(false);
    }
  };

  const discardChanges = () => {
    setPendingChanges({});
  };

  const resetToDefaults = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      const liveDocRef = doc(db, 'site_content', 'live');
      await setDoc(
        liveDocRef,
        {
          content: DEFAULT_SITE_CONTENT,
          updatedAt: new Date().toISOString(),
          updatedBy: 'admin-reset',
        },
        { merge: true }
      );

      setPersistedContent(DEFAULT_SITE_CONTENT);
      setPendingChanges({});
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3500);
    } catch (error) {
      console.error('Failed to reset content in Firestore:', error);
      setSaveError('Failed to reset in cloud database.');
      try {
        handleFirestoreError(error, OperationType.WRITE, SITE_CONTENT_DOC_PATH);
      } catch (e) {
        // Logged structured error
      }
    } finally {
      setIsSaving(false);
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
        isSaving,
        isLoadingFromDb,
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
        saveError,
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
