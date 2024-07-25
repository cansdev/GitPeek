import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSession } from './AuthContext'; 

interface Bookmark {
  id: number;
  name: string;
  stars?: number;
  description: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (repo: Bookmark) => Promise<void>;
  removeBookmark: (repoId: number) => Promise<void>;
  clearBookmarks: () => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const { userId } = useSession(); 
  

  useEffect(() => {
    fetchBookmarks();
  }, [userId]); 

  const fetchBookmarks = async () => {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:8080/bookmarks/${userId}`); 
        setBookmarks(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const addBookmark = async (repo: Bookmark) => {
    try {
      const response = await axios.post('http://localhost:8080/bookmarks', {
        userId: userId, 
        repositoryId: repo.id,
        stars: repo.stars,
        description: repo.description
      });
      setBookmarks([...bookmarks, repo]);
      await AsyncStorage.setItem('bookmarks', JSON.stringify([...bookmarks, repo]));
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const removeBookmark = async (repoId: number) => {
    try {
      await axios.delete(`http://localhost:8080/bookmarks/${userId}/${repoId}`); 
      const updatedBookmarks = bookmarks.filter((item) => item.id !== repoId);
      setBookmarks(updatedBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const clearBookmarks = async () => {
    try {
      setBookmarks([]);
      await AsyncStorage.removeItem('bookmarks');
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
    }
  };

  return (
    <BookmarkContext.Provider value={{bookmarks, addBookmark, removeBookmark, clearBookmarks}}>
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
