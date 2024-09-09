import React from 'react';
import Map from '../components/Map';
import { Helmet } from 'react-helmet'; // Add for dynamic document head

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Dynamic document head for SEO */}
      <Helmet>
        <title>Neighborhood Explorer</title>
        <meta name="description" content="Explore neighborhoods through interactive maps with drawing tools, markers, and more." />
      </Helmet>
      
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
          Use the buttons below to export your drawn regions as a JSON file or import them back to the map.
        </p>
        <div className="mt-4">
          <button
            className="btn btn-blue"
            onClick={() => document.querySelector('.map-container button:first-child').click()} // Triggers the export button in Map component
          >
            Export Drawn Regions
          </button>
          <input
            type="file"
            className="btn btn-gray mt-4"
            onChange={(event) => document.querySelector('.map-container input').dispatchEvent(new Event('change', { bubbles: true }))} // Triggers the import file input in Map component
          />
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
