import React, { useEffect } from 'react';
import Map from '../components/Map';

const Home = () => {
  useEffect(() => {
    document.title = 'Neighborhood Explorer';
    const description =
      'Explore neighborhoods through interactive maps with drawing tools, markers, and more.';
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* <section>
        <Map />
      </section> */}
      
      <header className="mt-8">
      <h1 className="text-4xl font-bold text-center text-blue-800">Welcome to the Burbz</h1>
        <p className="text-center text-gray-700 mt-2">
          See what is up with Burbz.
        </p>
      </header>

      <section>
        <Map />
      </section>
      
      {/* New section for export/import actions */}
      <section className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-blue-800">Export/Import Drawn Regions</h2>
        <p className="text-gray-700 mt-4">
          Exporting and importing drawn regions is coming soon. We are working on the tools to
          save and restore your map drawings.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-blue opacity-60 cursor-not-allowed"
            disabled
          >
            Export Drawn Regions
          </button>
          <button className="btn btn-gray mt-4 opacity-60 cursor-not-allowed" disabled>
            Import Drawn Regions
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-blue-800">About This App</h2>
        <p className="text-gray-700 mt-4">
          Burbz is an interactive tool that allows you to explore and discover detailed information about various neighborhoods.
          By leveraging user-generated data and visual insights, we provide a unique perspective on what each neighborhood has to offer.
        </p>
      </section>

      <footer className="mt-16 text-center text-gray-600">
        <p>&copy; 2024 Burbz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
