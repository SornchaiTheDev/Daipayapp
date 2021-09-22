import React from 'react';
import UserContext from './pages/User';
import Navigation from './Navigation';

function App() {
  return (
    <UserContext>
      <Navigation />
    </UserContext>
  );
}

export default App;
