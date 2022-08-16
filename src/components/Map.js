import React, { useState, useMemo, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { db } from '../firebase-config'
import { addDoc, collection, getDocs } from 'firebase/firestore';


const options = {
    disableDefaultUI: true,
    draggableCursor: 'copy',
}


export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey : process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['visualization']
    });

    if(!isLoaded) return <div>Loading...</div>
    return (   
        <Places />
    )
}

function Places() {
    const center = useMemo(() => ({ lat: 32.88, lng: -117.23 }), []);
    const [markers, setMarkers] = React.useState([])

    const [markerOn, setMarkerOn] = useState(true)    

    // mark potential submission
    const [newSubmission, setnewSubmission]  = useState({})

    // firebase collection
    const spotsCollectionRef = collection(db, "spottings")

    // api read 
    useEffect(() => {
        const getSpottings = async () => {
            const data = await getDocs(spotsCollectionRef)
            setMarkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getSpottings() 
    },);

    // new markers 
    const [newLat, setNewLat] = useState(0);
    const [newLng, setNewLng] = useState(0);
    const [newTime, setNewTime] = useState(new Date());

    // api write new marker 
    const createMarker = async () => {
        await addDoc(spotsCollectionRef, {lat: newLat, lng:newLng, time: newTime})
    }

    console.log(markers)

    return (
        <div>
            <button 
                className="marker-submit"
                onClick={() => {
                    setMarkers(preMarkers => [...preMarkers, {
                        lat: newLat,
                        lng: newLng,
                        time: newTime,
                    }])
                    createMarker()
                    setMarkerOn(false)
                }}
                >
                    Submit
            </button>

            

            <GoogleMap
                        
                zoom={15}
                center={center}
                mapContainerClassName="map"
                options={options}
                onClick ={(event) => {
                    setNewLat(event.latLng.lat())
                    setNewLng(event.latLng.lng())
                    setNewTime(new Date())
                    setMarkerOn(true)
                    setnewSubmission({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        time: new Date(),
                    })
                }}
            >
                {markers.map((marker) =>
                    <Marker 
                        key={marker.time}
                        position={{lat:marker.lat, lng: marker.lng}}
                        icon = {{
                            url: require("../images/raccoon.png"), 
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(35, 35),

                        }}
                    />
                )}

                
                {markerOn && <Marker 
                    key={newSubmission.time}
                    position={{lat:newSubmission.lat, lng: newSubmission.lng}}
                    icon = {{
                        url: require("../images/pin.png"), 
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                        scaledSize: new window.google.maps.Size(35, 35),

                    }}
                />}

               

            </GoogleMap>
        </div>
    );
}


  