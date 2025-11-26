import ZonePage from './ZonePage'

export default function NomadZonePage() {
  return (
    <ZonePage
      zoneNumber={700}
      zoneName="NOMAD"
      zoneDescription="Consumer & Social - Shopping, trends, and community"
      color="#FFFF00"
      items={[
        {
          page: 701,
          title: 'SHOPPING DEALS',
          description: 'Best prices and discount codes'
        },
        {
          page: 702,
          title: 'PRODUCT REVIEWS',
          description: 'Consumer ratings and buying guides'
        },
        {
          page: 703,
          title: 'SOCIAL TRENDS',
          description: 'Viral content and trending topics'
        },
        {
          page: 704,
          title: 'COMMUNITY BOARD',
          description: 'Local events and social gatherings'
        }
      ]}
    />
  )
}
