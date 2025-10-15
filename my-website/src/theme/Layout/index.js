import React, { useEffect } from 'react';
import Layout from '@theme-original/Layout';

export default function LayoutWrapper(props) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.setAttribute('id', 'fXyudBAyx8F-J0QDSikdR'); // ✅ your Chatbase unique ID
    script.setAttribute('domain', 'www.chatbase.co');
    document.body.appendChild(script);
  }, []);

  return <Layout {...props} />;
}
