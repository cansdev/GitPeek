import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSession } from './AuthContext';

export interface Bookmark {
  id?: string; // Optional if backend handles auto-increment
  repository_id: string;
  userId: string; // Optional, if needed
  stars?: number;
  description: string;
  name: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (repo: Bookmark) => Promise<void>;
  removeBookmark: (repoId: string) => Promise<void>;
  clearBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { userId } = useSession();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (!userId) return;
  
        const response = await fetch(`http://localhost:8080/bookmarks/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
  
    if (userId) { // Only fetch bookmarks if userId exists
      fetchBookmarks();
    }
  }, [userId]);

  const addBookmark = async (repo: Bookmark) => {
    try {
      console.log("Adding bookmark for userId: ", userId);
      const response = await fetch('http://localhost:8080/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, 
          repositoryId: repo.repository_id,
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
      const response = await fetch(`http://localhost:8080/bookmarks/${userId}/${repoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }
  
      const updatedBookmarks = bookmarks.filter((item) => item.repository_id !== repoId);
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
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks }}>
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
