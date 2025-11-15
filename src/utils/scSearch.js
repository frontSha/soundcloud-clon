const { fetchData } = require("./api");

export const globalSearch = async (query) => {
    if (!query) return [];

    const [tracksRes, playlistsRes, usersRes] = await Promise.all([
      searchTracks(query),
      searchPlaylists(query),
      searchUsers(query)
    ])

    const allResults = [
      ...tracksRes?.collection ?? [],
      ...playlistsRes?.collection ?? [],
      ...usersRes?.collection ?? []
    ]

    return allResults;
  }

  // Búsqueda por endpoint
  const searchTracks = (query) => {
    fetchData(`/tracks?q=${query}&access=playable&limit=5&linked_partitioning=true`);
  }

  const searchPlaylists = (query) => {
    fetchData(`/playlists?q=${query}&access=playable&show_tracks=true&limit=5&offset=0&linked_partitioning=true`)
  }

  const searchUsers = (query) => {
    fetchData(`/users?q=${query}&limit=5&offset=0&linked_partitioning=true`);
  }