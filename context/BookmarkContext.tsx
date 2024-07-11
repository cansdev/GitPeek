import React, { createContext, useState, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Bookmark {
    id: number;
    name: string;
    stars?: number;
    description: string;
}

interface BookmarkContextType {
    bookmarks: Bookmark[];
    addBookmark: (repo: Bookmark) => void;
    removeBookmark: (repoId: number) => void;
    clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

    const fetchBookmarks = async () => {
        try {
            const bookmarksString = await AsyncStorage.getItem('bookmarks');
            if (bookmarksString) {
                setBookmarks(JSON.parse(bookmarksString));
            }
        }
        catch(error) {
            console.error('Error fetching bookmarks: ', error);
        }
    };

    const addBookmark = async (repo: Bookmark) => {
        try {
            const updatedBookmarks = [...bookmarks, repo];
            setBookmarks(updatedBookmarks);
            await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        }

        catch(error) {
            console.error('Error fetching bookmarks: ', error);
        }
    };

    const removeBookmark = async (repoId: number) => {
        try {
            const updatedBookmarks = bookmarks.filter((item) => item.id !== repoId);
            setBookmarks(updatedBookmarks);
            await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        }

        catch(error) {
            console.error('Error fetching bookmarks: ', error);
        }
    };

    const clearBookmarks = async () => {
        try {
            setBookmarks([]);
            await AsyncStorage.removeItem('bookmarks');
        }
        catch(error) {
            console.error('Error fetching bookmarks: ', error);
        }
    };



    React.useEffect(() => {
        fetchBookmarks();
    }, []);

    return(
        <BookmarkContext.Provider value={{bookmarks, addBookmark, removeBookmark, clearBookmarks}}>
            {children}
        </BookmarkContext.Provider>
    );

};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if(!context) {
        throw new Error('use useBookmarks in a BookmarkProvider');
    }
    return context;
};