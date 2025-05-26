'use client'

interface SearchResult {
  title: string
  url: string
  timestamp: string
  channel: string
  snippet: string
}

interface SearchResultsProps {
  results: SearchResult[]
  loading: boolean
}

export default function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="mt-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching videos...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Search Results ({results.length})
      </h2>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <ResultCard key={index} result={result} />
        ))}
      </div>
      
      {results.length === 2 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-center">
            <strong>Free plan:</strong> Only showing 2 results. 
            <button className="ml-2 text-blue-600 hover:text-blue-800 underline">
              Upgrade to see all results
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

function ResultCard({ result }: { result: SearchResult }) {
  const formatTimestamp = (timestamp: string) => {
    const seconds = parseInt(timestamp)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
            {result.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Channel: {result.channel}
          </p>
          
          {result.snippet && (
            <p className="text-gray-700 mb-4 line-clamp-3">
              "{result.snippet}"
            </p>
          )}
          
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {formatTimestamp(result.timestamp)}
            </span>
            
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
