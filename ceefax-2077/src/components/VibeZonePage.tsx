import ZonePage from './ZonePage'

export default function VibeZonePage() {
  return (
    <ZonePage
      zoneNumber={500}
      zoneName="VIBE"
      zoneDescription="Lifestyle & Wellness - Health, fitness, and personal growth"
      color="#FF00FF"
      items={[
        {
          page: 501,
          title: 'WELLNESS TIPS',
          description: 'Daily health advice and fitness routines'
        },
        {
          page: 502,
          title: 'NUTRITION GUIDE',
          description: 'Meal plans and dietary recommendations'
        },
        {
          page: 503,
          title: 'MINDFULNESS',
          description: 'Meditation techniques and mental health resources'
        },
        {
          page: 504,
          title: 'LIFESTYLE NEWS',
          description: 'Trends in wellness and personal development'
        }
      ]}
    />
  )
}
