import React, { useEffect, useState } from 'react';
import '../styles/superstore.css';

const Superstore = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    fetch('/war/superstore')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const trimmedData = data.items.map((superstore: any) => ({
          name: superstore.name,
          description: superstore.description,
          armor_rating: superstore.armor_rating,
          speed: superstore.speed,
          stamina_regen: superstore.stamina_regen,
          passive: superstore.passive?.description || "No passive effect",
          type: superstore.slot
        }))
        console.log('Data fetched:', trimmedData);
        setData(trimmedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  return (
    <div className = 'store-grid'>
      <p className = 'store-grid-title'>Superstore Rotation</p>
      <p className = 'store-grid-body'>The table below displays the current rotation of all items currently in the superstore.  The table displays<br></br>
      the name of the item, the description along with its statistics, as well as the type of armor.</p>
      <table className = 'store-table'>
      <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Arm/Spd/Stm</th>
            <th>Passive</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((superstore, index) => (
            <tr key={index}>
              <td>{superstore.name}</td>
              <td>{superstore.description}</td>
              <td>{superstore.armor_rating}/{superstore.speed}/{superstore.stamina_regen}</td>
              <td>{superstore.passive}</td>
              <td>{superstore.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
    
export default Superstore