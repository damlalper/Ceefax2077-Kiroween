import ZonePage from './ZonePage'

export default function PlayZonePage() {
  return (
    <ZonePage
      zoneNumber={800}
      zoneName="PLAY"
      zoneDescription="Entertainment & Games - Gaming, streaming, and fun"
      color="#FFFF00"
      items={[
        {
          page: 801,
          title: 'GAME RELEASES',
          description: 'New game launches and updates'
        },
        {
          page: 802,
          title: 'STREAMING GUIDE',
          description: 'What to watch on Netflix, Disney+, and more'
        },
        {
          page: 803,
          title: 'GAME REVIEWS',
          description: 'Professional game ratings and walkthroughs'
        },
        {
          page: 804,
          title: 'RETRO ARCADE',
          description: 'Classic games and nostalgia content'
        }
      ]}
    />
  )
}
