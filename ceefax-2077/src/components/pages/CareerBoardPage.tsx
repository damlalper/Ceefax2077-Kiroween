export default function CareerBoardPage() {
  const jobs = [
    {
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Inc.',
      location: 'Remote',
      salary: '$120-180k',
      tags: ['REMOTE', 'SENIOR', 'URGENT'],
      posted: '2h ago'
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Labs',
      location: 'Hybrid - SF',
      salary: '$90-140k',
      tags: ['HYBRID', 'MID-LEVEL'],
      posted: '5h ago'
    },
    {
      title: 'Data Scientist',
      company: 'AI Solutions',
      location: 'On-site - NYC',
      salary: '$110-160k',
      tags: ['ONSITE', 'SENIOR', 'AI/ML'],
      posted: '1d ago'
    },
  ]

  const skills = ['AI/ML', 'Quantum', 'Blockchain', 'Cybersec', 'Cloud']

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-cyan">
        <span className="double-height text-black">P203 CAREER BOARD</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-cyan">
        <p className="text-cyan text-base">💼 LATEST OPPORTUNITIES • UPDATED DAILY</p>
      </div>

      {/* Hot Skills */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🔥 HOT SKILLS 2077:</p>
        <div className="flex gap-2 flex-wrap">
          {skills.map((skill, i) => (
            <span key={i} className="bg-yellow text-black px-3 py-1 text-sm font-bold">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">💼 FEATURED JOBS:</p>
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <div key={i} className="border-2 border-cyan p-3 bg-cyan/5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-white text-lg font-bold">{job.title}</p>
                  <p className="text-cyan text-base">{job.company}</p>
                </div>
                <div className="bg-green text-black px-3 py-1 font-bold text-lg">
                  {job.salary}
                </div>
              </div>
              
              <div className="flex gap-2 mb-2 flex-wrap">
                {job.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className={`px-2 py-1 text-xs font-bold ${
                      tag === 'REMOTE' ? 'bg-green text-black' :
                      tag === 'URGENT' ? 'bg-red text-white animate-pulse' :
                      'bg-cyan text-black'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-white">📍 {job.location}</span>
                <span className="text-white/70">Posted: {job.posted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Guide */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">💰 SALARY INSIGHTS:</p>
        <div className="border border-cyan p-2 bg-black/50 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-white">Software Engineer:</span>
            <span className="text-green">$95k-$180k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Product Manager:</span>
            <span className="text-green">$110k-$200k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">DevOps Engineer:</span>
            <span className="text-green">$100k-$170k</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white">Data Analyst:</span>
            <span className="text-green">$70k-$130k</span>
          </div>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-cyan">
        <span className="text-black">CAREER BOARD - YOUR NEXT OPPORTUNITY AWAITS</span>
      </div>
    </div>
  )
}
