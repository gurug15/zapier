import { useState, useEffect } from 'react';


const isAuthentic = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return Boolean(token);
  }
  return false;
};

export const useAuth = (redirectUrl: string = '/') => {

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
      const auth = isAuthentic();
      setIsAuthenticated(auth);
      setIsLoading(false);
  
   
  }, [redirectUrl]);

  return { isLoading, isAuthenticated };
};