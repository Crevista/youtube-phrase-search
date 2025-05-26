import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query, channelId, options } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const filmotApiKey = process.env.RAPIDAPI_KEY
    if (!filmotApiKey) {
      console.error('RAPIDAPI_KEY not found in environment variables')
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      )
    }

    const filmotUrl = 'https://filmot-tube-metadata-archive.p.rapidapi.com/getsearchsubtitles'
    const params = new URLSearchParams({
      query: `"${query}"`,
      ...(channelId && { channelID: channelId }),
      lang: options?.language || 'en',
      searchManualSubs: '1',
      ...(options?.includeAutoSubs && { searchAutoSubs: '1' }),
      sortField: 'relevance',
      sortOrder: 'desc'
    })

    const response = await fetch(`${filmotUrl}?${params}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': filmotApiKey,
        'X-RapidAPI-Host': 'filmot-tube-metadata-archive.p.rapidapi.com'
      }
    })

    if (!response.ok) {
      console.error('Filmot API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Search service unavailable' },
        { status: 503 }
      )
    }

    const data = await response.json()
    const transformedResults = transformFilmotResults(data)
    const limitedResults = transformedResults.slice(0, 2)

    return NextResponse.json({
      results: limitedResults,
      total: transformedResults.length,
      limited: transformedResults.length > 2
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function transformFilmotResults(filmotData: any) {
  if (!filmotData || !Array.isArray(filmotData)) {
    return []
  }

  return filmotData.map((item: any) => ({
    title: item.title || 'Untitled Video',
    url: `https://youtube.com/watch?v=${item.videoId}&t=${Math.floor(item.start)}s`,
    timestamp: Math.floor(item.start)?.toString() || '0',
    channel: item.channelTitle || 'Unknown Channel',
    snippet: item.text || ''
  }))
}
