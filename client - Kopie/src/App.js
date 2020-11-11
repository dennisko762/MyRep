import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import "./App.css";
import LogEntryForm from "./LogEntryForm";
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52.520008,
    longitude: 13.404954,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    console.log(e);
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  //TODO do some stuff function

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/travellogger/ckhcfmot61fct19mczrxd7a82"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            className="marker"
            latitude={entry.latitude}
            longitude={entry.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
          >
            <div
              onMouseOver={() =>
                setShowPopup({
                  ...showPopup,
                  [entry._id]: true,
                })
              }
              onMouseLeave={() => setShowPopup(false)}
            >
              <img
                key={entry._id}
                className="marker"
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
              ></img>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              className="popup"
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              anchor="top"
            >
              <div>{entry.title}</div>
              {entry.image && (
                <img className="picture" alt={entry.title}>
                  {entry.image}
                </img>
              )}
              <p>{entry.comments}</p>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}

      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
          >
            <div>
              <img
                className="red-marker"
                src="https://www.iconsdb.com/icons/preview/red/map-marker-2-xxl.png"
                alt=""
              ></img>
            </div>
          </Marker>

          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <h3>Add your new location here</h3>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocation}
              >
                {" "}
              </LogEntryForm>
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};
export default App;
