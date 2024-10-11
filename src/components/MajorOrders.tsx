import React, { useEffect, useState } from 'react';
import '../styles/majorOrders.css'

const MajorOrders = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data...');
    fetch('/war/orders')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched:', data);
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  return (
    <div className='majorOrders'>
      <p className="majorOrders-title">Major Orders</p>
      <p className = "majorOrders-body">The below text displays the major orders.  The box displays a description of the task as well <br></br>
      as the reward obtained after completion.</p>
      {data.length === 0 ? (
        <p className = "majorOrders-title">No major orders available at this time.</p>
      ) : (
        data.map((order, index) => (
          <div key={index} className="order">
            <h2>{order.setting.overrideTitle}</h2>
            <p><strong>Description:</strong> {order.setting.overrideBrief}</p>
            <p><strong>Reward:</strong> {order.setting.reward.amount} points</p>
          </div>
        ))
      )}
    </div>
  );
};

    
export default MajorOrders