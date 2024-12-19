'use client'

import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps'

const YaMap = () => {
  const placeMark = [51.69423907226746, 39.14697199999994]
  let mapCenter = [51.69423907226746, 39.14697199999994]

  return (
    <YMaps>
      <Map
        id="contacts-map"
        className="contacts-map__map absolute h-full w-full"
        defaultState={{ center: mapCenter, zoom: 17, controls: [] }}
      >
        <Placemark geometry={placeMark} />
      </Map>
    </YMaps>
  )
}

export default YaMap
