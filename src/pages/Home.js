import React from 'react';
import Map from '../components/Map';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-800">Welcome to Neighborhood Explorer</h1>
        <p className="text-center text-gray-700 mt-2">
          Discover insights about different neighborhoods through our interactive map.
        </p>
      </header>
      
      <section>
        <Map />
      </section>
      
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-blue-800">About This App</h2>
        <p className="text-gray-700 mt-4">
          Neighborhood Explorer is an interactive tool that allows you to explore and discover detailed information about various neighborhoods.
          By leveraging user-generated data and visual insights, we provide a unique perspective on what each neighborhood has to offer.
        </p>
      </section>
      
      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2024 Neighborhood Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
