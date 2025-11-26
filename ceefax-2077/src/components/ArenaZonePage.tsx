import ZonePage from './ZonePage'

export default function ArenaZonePage() {
  return (
    <ZonePage
      zoneNumber={300}
      zoneName="ARENA"
      zoneDescription="Sports & Competition - Scores, stats, and athletic events"
      color="#00FF00"
      items={[
        {
          page: 301,
          title: 'LIVE SCORES',
          description: 'Real-time sports scores and match updates'
        },
        {
          page: 302,
          title: 'LEAGUE TABLES',
          description: 'Current standings across all major leagues'
        },
        {
          page: 303,
          title: 'ESPORTS',
          description: 'Competitive gaming tournaments and rankings'
        },
        {
          page: 304,
          title: 'SPORTS NEWS',
          description: 'Latest sports headlines and player transfers'
        }
      ]}
    />
  )
}
