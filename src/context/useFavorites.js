import { useContext } from 'react';
import FavoritesContext from './FavoritesContext';

// Separated from FavoritesContext.jsx so that file only exports a component
// (required for React Fast Refresh / HMR to work correctly).
export const useFavorites = () => useContext(FavoritesContext);
