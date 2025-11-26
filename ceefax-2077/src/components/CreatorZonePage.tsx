import ZonePage from './ZonePage'

export default function CreatorZonePage() {
  return (
    <ZonePage
      zoneNumber={600}
      zoneName="CREATOR"
      zoneDescription="Media & Content - Art, music, and creative industries"
      color="#FF00FF"
      items={[
        {
          page: 601,
          title: 'MUSIC CHARTS',
          description: 'Top songs and album releases'
        },
        {
          page: 602,
          title: 'MOVIE REVIEWS',
          description: 'Film ratings and cinema listings'
        },
        {
          page: 603,
          title: 'ART GALLERY',
          description: 'Digital exhibitions and artist spotlights'
        },
        {
          page: 604,
          title: 'CREATOR TOOLS',
          description: 'Resources for content creators and artists'
        }
      ]}
    />
  )
}
