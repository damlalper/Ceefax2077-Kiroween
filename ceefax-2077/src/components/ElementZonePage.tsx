import ZonePage from './ZonePage'

export default function ElementZonePage() {
  return (
    <ZonePage
      zoneNumber={400}
      zoneName="ELEMENT"
      zoneDescription="Environment & Travel - Weather, climate, and destinations"
      color="#00FF00"
      items={[
        {
          page: 401,
          title: 'WEATHER FORECAST',
          description: '7-day weather predictions for major cities'
        },
        {
          page: 402,
          title: 'CLIMATE ALERTS',
          description: 'Environmental warnings and air quality index'
        },
        {
          page: 403,
          title: 'TRAVEL GUIDE',
          description: 'Destination recommendations and travel tips'
        },
        {
          page: 404,
          title: 'FLIGHT STATUS',
          description: 'Airport delays and flight tracking'
        }
      ]}
    />
  )
}
