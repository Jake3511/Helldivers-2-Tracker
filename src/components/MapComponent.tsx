import React from 'react';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import L from 'leaflet';
import '../styles/mapComponent.css';
import 'leaflet/dist/leaflet.css';

function MapComponent() {
//  const bounds: L.LatLngBoundsExpression = [[0, 0], [500, 500]];

  return (
    <div className = "MapContainer-div">
        <p className = "MapContainer-title">Super Earth Command</p>
        <p className = "MapContainer-body">
          Hello patriots, welcome to Super Earth Command, your central hub of information for spreading democracy!  This site contains <br>
        </br>all the information a helldiver needs to spread democracy.  In the top right, there are three buttons, one for the major orders, superstore, and current<br>
        </br>active planets.  Each one of these will take you to a new page that will display the information relative to the button you clicked.  The Planets button<br>
        </br>will display a table of the current active planets, what enemy faction inhabits it, how many players are there, and the total health of the given planet.<br> 
        </br>Below a chart displaying a planet's name and player count can be found to provide a visual representation of some of the above chart information.  Next we<br>
        </br>have the major orders button, which will take you to a page that displays all the major orders released from high command.  If no orders are released, the<br>
        </br>page will display a default message, indicating that no major orders are available at the given time.  Lastly, the Superstore button will take you to a page <br>
        </br>that displays all the current stock for the superstore, as well as some general information about the item, like name, buffs, stats, and type of armor all<br>
        </br>in a table.  Thank you all for your patranoge and God Bless Super Earth.
        </p>
    </div>
  );
}

export default MapComponent;
