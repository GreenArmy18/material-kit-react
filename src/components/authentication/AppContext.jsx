import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  let mySubscription = null;
  const [user, setUser] = useState();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const [lastName, setLastName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const profiles = supabase
    .from('profiles')
    .on('*', (payload) => {
      console.log('Change received!', payload);
    })
    .subscribe();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    const data = async () => {
      setError('');
      if (!mySubscription) {
        mySubscription = supabase
          .from('profiles')
          .on('*', (payload) => {})
          .subscribe();
        console.log('onAuthStateChange', data);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    };

    return () => {
      mySubscription?.unsubscribe();
      console.log('Remove supabase subscription by useEffect unmount');
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        profiles
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
