'use client'

// START: Preserve spaces to avoid auto-sorting
import 'leaflet/dist/leaflet.css'

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'

import 'leaflet-defaulticon-compatibility'
// END: Preserve spaces to avoid auto-sorting
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import Markers from './Marker'
import 'leaflet-control-geocoder/dist/Control.Geocoder.js'
import { Button } from '../ui/button'
import useMapStore from '@/state/zustand/map-store'

export default function Map(props: any) {
    const { toggle } = props

    const [draggable, setDraggable] = useState(true)
    const [center, setCenter] = useState({
        lat: 16.8165376,
        lng: 96.1282048,
    });
    const {location,setLocation} = useMapStore();
    const [position, setPosition] = useState(center)
    const markerRef = useRef<any>(null)
    const mapRef = useRef<any>()
    const [bbox, setBbox] = useState([])

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current

                if (marker != null) {
                    setPosition(marker.getLatLng())
                    setCenter(marker.getLatLng())
                }
            },
        }),
        [],
    )

    const handleClick = ()=>{
      setLocation(position);
      toggle();
    }

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <div>
            <div>
                <MapContainer
                    ref={mapRef}
                    preferCanvas={true}
                    center={center}
                    zoom={11}
                    scrollWheelZoom={true}
                    style={{ height: '300px', width: '`100px`' }}
                >
                    <TileLayer
                        attribution=""
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Markers
                        draggable={draggable}
                        eventHandlers={eventHandlers}
                        position={position}
                        markerRef={markerRef}
                        toggleDraggable={toggleDraggable}
                    />
                </MapContainer>
            </div>
            <div className='flex  gap-5 justify-end mt-5'>
                <Button
                    className={` font-normal w-[100px] `}
                    variant={'outline'}
                    onClick={toggle}
                >
                    Cancel
                </Button>

                <Button
                    className={`font-normal w-[100px] `}
                    variant={'primary'}
                    onClick={handleClick}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
