import ZonePage from './ZonePage'

export default function GlobalZonePage() {
  return (
    <ZonePage
      zoneNumber={100}
      zoneName="GLOBAL"
      zoneDescription="News & Information - Breaking stories from around the world"
      color="#00FFFF"
      items={[
        {
          page: 101,
          title: 'DEVOPS MONITOR',
          description: 'Real-time system health and performance metrics'
        },
        {
          page: 102,
          title: 'WORLD NEWS',
          description: 'Latest international headlines and updates'
        },
        {
          page: 103,
          title: 'TECH NEWS',
          description: 'Technology industry news and innovations'
        },
        {
          page: 104,
          title: 'BREAKING ALERTS',
          description: 'Urgent news notifications and emergency broadcasts'
        }
      ]}
    />
  )
}
