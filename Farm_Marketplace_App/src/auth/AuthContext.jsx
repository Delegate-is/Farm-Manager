import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// You might need to import your Supabase client here if you're using it
// import { supabase } from '../supabaseClient'; // Example if you have supabaseClient.js

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Example: This effect would check for an authenticated user on mount
  // If you are using Supabase, you'd listen to auth state changes here
  useEffect(() => {
    // Simulate checking for a user (e.g., from local storage or an API call)
    const checkUser = async () => {
      // In a real app, you'd get the user from Supabase or your backend
      // For now, let's assume no user initially for proper login flow
      // const { data: { user } } = await supabase.auth.getUser();
      // setUser(user);
      setLoading(false);
    };

    checkUser();

    // If using Supabase, you might listen to auth events
    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     setUser(session?.user || null);
    //     setLoading(false);
    //   }
    // );

    // return () => {
    //   authListener?.unsubscribe();
    // };
  }, []);

  // Placeholder for login function (to be implemented with Supabase)
  const login = async (email, password) => {
    try {
      setLoading(true);
      // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // if (error) throw error;
      // setUser(data.user);
      // Simulate success for now
      console.log('Simulated login for:', email);
      setUser({ id: '123', email: email }); // A dummy user object
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Placeholder for register function (to be implemented with Supabase)
  const register = async (email, password) => {
    try {
      setLoading(true);
      // const { data, error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;
      // setUser(data.user); // User might need to confirm email first, depending on settings
      // Simulate success for now
      console.log('Simulated registration for:', email);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Placeholder for logout function (to be implemented with Supabase)
  const logout = async () => {
    try {
      setLoading(true);
      // const { error } = await supabase.auth.signOut();
      // if (error) throw error;
      setUser(null);
      setLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error.message);
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children once loading is complete */}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};