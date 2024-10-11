import React, { useEffect, useState, useRef } from 'react';
import '../styles/planets.css';
import Chart from 'chart.js/auto';

const Planets = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const planetURL = '/war/planets';
    console.log('Fetching data...');
    fetch(planetURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const trimmedData = data.map((planets: { name: string; faction: string; health: number; maxHealth: number; players: number }) => ({
          name: planets.name,
          faction: planets.faction,
          health: planets.health,
          maxHealth: planets.maxHealth,
          players: planets.players,
        }));
        console.log('Data fetched:', data);
        setData(trimmedData);
        createChart(trimmedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
      });
  }, []);

  const createChart = (planetData: any[]) => {
    const planetNames = planetData.map((planet: any) => planet.name);
    const planetPlayers = planetData.map((planet: any) => planet.players);

  if(chartRef.current) {
    new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: planetNames,
        datasets: [
          {
            label: 'Players',
            data: planetPlayers,
            backgroundColor: 'yellow',
            borderRadius: 6,
            borderColor: '#191938'
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            }
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }
};

  return (
    <div className="liberation-grid">
      <p className='liberation-grid-paragraph-title'>Helldivers: Major Planets and Progression</p>
      <p className='liberation-grid-paragraph-body'>The table displays the name of the planet and the faction it belongs to, its current and max health<br></br>
        as well as the total amount of players currently on the planet.</p>
      <table className="planets-table">
        <thead>
          <tr>
            <th>PLANETS</th>
            <th>FACTION</th>
            <th>HEALTH</th>
            <th>MAX HEALTH</th>
            <th>PLAYERS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((planet, index) => (
            <tr key={index}>
              <td>{planet.name}</td>
              <td>{planet.faction}</td>
              <td>{planet.health}</td>
              <td>{planet.maxHealth}</td>
              <td>{planet.players}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='liberation-grid-paragraph-table'>The chart below depicts a more cleaner description of the total players that are<br></br>
      on each planet.</p>
      <canvas ref={chartRef} width="200" height="200"></canvas>
    </div>
  );
};

export default Planets;
