// // rfce
// import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { Layer } from 'leaflet';


// const Dashboard = () => {
//   return <div>
//     <MapContainer 
//       className='h-[100vh]'
//       center={[12, 100]}
//       zoom={7}
//       >
//         <LayersControl>
//         <LayersControl.BaseLayer name ="OSM" checked>
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//         </LayersControl.BaseLayer>
//     </LayersControl>



//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[13.5, 101]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//       <Marker position={[13, 100]}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   </div>;
// };
// export default Dashboard;


import React from "react";
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  // ข้อมูล Pokémon
  const pokemons = [
    {
      id: 1,
      name: "Bulbasaur",
      position: [13.5, 101],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 2,
      name: "Charmander",
      position: [13, 100],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      id: 3,
      name: "Squirtle",
      position: [12.5, 99],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: 3,
      name: "Squirtle",
      position: [17.5, 99],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: 3,
      name: "Squirtle",
      position: [18.5, 99],
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
  ];

  return (
    <div>
      <MapContainer
        className="h-[100vh]"
        center={[12, 100]}
        zoom={7}
      >
        {/* Base Layer */}
        <LayersControl>
          <LayersControl.BaseLayer name="OSM" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Markers for Pokémon */}
        {pokemons.map((pokemon) => (
          <Marker key={pokemon.id} position={pokemon.position}>
            <Popup>
              <div>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.image} alt={pokemon.name} width="50" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;

