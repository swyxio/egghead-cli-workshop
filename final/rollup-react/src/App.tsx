import React from 'react';
import Card from './components/Card';
import Hero from './components/Hero';
import EmailForm from './components/EmailForm';

export default function App() {
  const [toggle, setToggle] = React.useState(true);

  return (
    <div className="App markdown px-6 xl:px-12 w-full max-w-3xl mx-auto lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4">
      <Hero setToggle={setToggle} />
      {toggle ? <Card /> : <EmailForm />}
    </div>
  );
}
