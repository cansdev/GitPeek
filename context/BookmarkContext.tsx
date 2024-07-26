import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from './AuthContext';

export interface Bookmark {
  name: string;
  id?: string; 
  repositoryId: string;
  userId: string; 
  stars?: number;
  description: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (repo: Bookmark) => Promise<void>;
  removeBookmark: (repoId: string) => Promise<void>;
  clearBookmarks: () => Promise<void>;
  fetchBookmarks: () => Promise<void>; 
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { userId } = useSession();

  const fetchBookmarks = useCallback(async () => {
    try {
      if (!userId) return;

      const response = await fetch(`http://localhost:8080/bookmarks/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }
      const data = await response.json();
      console.log('Fetched bookmarks:', data);
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId, fetchBookmarks]);

  const addBookmark = async (repo: Bookmark) => {
    try {
      console.log("Adding bookmark for userId:", userId);
      console.log("Bookmark data:", repo); 
  
      const response = await fetch('http://localhost:8080/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          repositoryId: repo.repositoryId,
          stars: repo.stars,
          description: repo.description,
          name: repo.name,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add bookmark');
      }
  
      const data = await response.json();
      setBookmarks(prevBookmarks => [...prevBookmarks, data]);
      await AsyncStorage.setItem(`bookmarks/${userId}`, JSON.stringify([...bookmarks, data]));
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };
  

  const removeBookmark = async (repoId: string) => {
    try {
      console.log("Removing bookmark with repoId:", repoId);
      const response = await fetch(`http://localhost:8080/bookmarks/${userId}/${repoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }

      const updatedBookmarks = bookmarks.filter((item) => item.repositoryId !== repoId);
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem(`bookmarks/${userId}`, JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const clearBookmarks = async () => {
    try {
      setBookmarks([]);
      await AsyncStorage.removeItem(`bookmarks/${userId}`);
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks, fetchBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
