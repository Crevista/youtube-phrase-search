'use client'

import { useState } from 'react'

interface SearchFormProps {
  onSearch: (query: string, channelId?: string, options?: SearchOptions) => void
  loading: boolean
}

interface SearchOptions {
  language?: string
  includeAutoSubs?: boolean
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState('')
  const [channelId, setChannelId] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [language, setLanguage] = useState('en')
  const [includeAutoSubs, setIncludeAutoSubs] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), channelId.trim() || undefined, {
        language,
        includeAutoSubs
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
            Search phrase
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter the phrase you want to find..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="channelId" className="block text-sm font-medium text-gray-700 mb-2">
            Channel ID (optional)
          </label>
          <input
            type="text"
            id="channelId"
            value={channelId}
            onChange={(e) => setChannelId(e.target.value)}
            placeholder="Filter by specific YouTube channel..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
            disabled={loading}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium"
          >
            {showAdvanced ? '▼' : '▶'} Advanced options
          </button>
        </div>

        {showAdvanced && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  disabled={loading}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                  <option value="ru">Russian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeAutoSubs"
                  checked={includeAutoSubs}
                  onChange={(e) => setIncludeAutoSubs(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="includeAutoSubs" className="ml-2 block text-sm text-gray-700">
                  Include auto-generated subtitles
                </label>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            'Search Videos'
          )}
        </button>
      </form>
    </div>
  )
}
