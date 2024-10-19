import { GamepadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'






export default function Markers(props:any){
    const [positionG, setPositionG] = useState(null)
    const {draggable,eventHandlers,position,markerRef,toggleDraggable} = props;
    

    
    

    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e:any) {
        console.log({location:e})
        setPositionG(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    map.flyTo(position);
    

    return position === null ? null : (
        <div  onMouseOver={toggleDraggable}>
           <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={position}
                ref={markerRef}
            >
                <Popup  minWidth={90}>
                    <span >
                        {draggable
                            ? 'Marker is draggable'
                            : 'Click here to make marker draggable'}
                    </span>
                </Popup>
            </Marker>  
        </div>
    )
}