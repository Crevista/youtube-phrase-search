'use client'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-primary-600">
              YouTube Search
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Free Plan: 5 searches left this month
            </span>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Upgrade
            </button>
            <button className="text-gray-600 hover:text-gray-800 px-3 py-2 text-sm">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
