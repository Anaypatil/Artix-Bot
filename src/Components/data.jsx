import React, { useEffect, useState } from 'react';

const YourComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.csv') // Update this path to your CSV file
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Fetch as text since it's a CSV file
      })
      .then(csvText => {
        const rows = csvText.split('\n'); // Split into rows
        const headers = rows[0].split(','); // Extract headers
        const json = rows.slice(1).map(row => {
          const values = row.split(','); // Split values
          let obj = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim(); // Create JSON object
          });
          return obj;
        });
        setData(json); // Set data in state
      })
      .catch(error => console.error('Error fetching dataset:', error));
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item['Museum Name']}</h2>
          <p><strong>City:</strong> {item.City}</p>
          <p><strong>Address:</strong> {item.Address}</p>
          <p><strong>Opening Hours:</strong> {item['Opening Hours']}</p>
          <p><strong>Show Name:</strong> {item['Show Name']}</p>
          <p><strong>Show Time:</strong> {item['Show Time']}</p>
          <p><strong>Description:</strong> {item.Description}</p>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
