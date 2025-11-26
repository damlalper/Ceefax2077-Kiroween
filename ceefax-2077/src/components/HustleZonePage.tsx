import ZonePage from './ZonePage'

export default function HustleZonePage() {
  return (
    <ZonePage
      zoneNumber={200}
      zoneName="HUSTLE"
      zoneDescription="Finance & Work - Markets, careers, and business intelligence"
      color="#00FFFF"
      items={[
        {
          page: 201,
          title: 'MARKET WATCH',
          description: 'Live stock prices and market indices'
        },
        {
          page: 202,
          title: 'CRYPTO TRACKER',
          description: 'Cryptocurrency prices and blockchain news'
        },
        {
          page: 203,
          title: 'CAREER BOARD',
          description: 'Job listings and career development resources'
        },
        {
          page: 204,
          title: 'BUSINESS NEWS',
          description: 'Corporate updates and economic analysis'
        }
      ]}
    />
  )
}
