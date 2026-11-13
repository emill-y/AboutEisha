// What I'm listening to. Edit freely: each track links to a Spotify search,
// or set `url` to a direct Spotify/Apple Music link.
export const playlistName = "on repeat · fall '26"

export const tracks = [
  { artist: 'Noah Kahan', title: 'Stick Season', length: '3:02' },
  { artist: 'Noah Kahan', title: 'Northern Attitude', length: '3:46' },
  { artist: 'Noah Kahan', title: 'Dial Drunk', length: '3:20' },
  { artist: 'Noah Kahan', title: 'She Calls Me Back', length: '3:12' },
  { artist: 'Noah Kahan', title: 'Homesick', length: '3:38' },
  { artist: 'Zach Bryan', title: 'Something in the Orange', length: '3:48' },
  { artist: 'Kacey Musgraves', title: 'Slow Burn', length: '4:06' },
]

export const trackUrl = (t) =>
  t.url || `https://open.spotify.com/search/${encodeURIComponent(`${t.artist} ${t.title}`)}`
