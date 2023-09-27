const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // Import the chalk library

const logFiles = [
  'Streaming_History_Audio_2022_1.json',
  'Streaming_History_Audio_2023_3.json',
  '2023.json',
  '2023_2.json',
  '2022_0.json'
];

// Function to read and parse a JSON file
function readJSONFile(filePath) {
  const fileContent = fs.readFileSync(filePath);
  return JSON.parse(fileContent);
}

// Function to calculate the average time spent listening in minutes
function calculateAverageTime(logs) {
    const totalListeningTimeMs = logs.reduce((total, log) => total + log.ms_played, 0);
    const totalHours = totalListeningTimeMs / (60 * 60 * 1000); // Convert milliseconds to hours
    return totalHours;
  }
  

// Function to find the top 20 albums, artists, and songs for each year
function findTopItems(logs) {
  const topAlbumsByYear = {};
  const topArtistsByYear = {};
  const topSongsByYear = {};

  logs.forEach((log) => {
    const year = log.ts.split('-')[0];

    // Top Albums
    const albumKey = `${log.master_metadata_album_album_name} - ${log.master_metadata_album_artist_name}`;
    if (!topAlbumsByYear[year]) {
      topAlbumsByYear[year] = new Map();
    }
    if (topAlbumsByYear[year].has(albumKey)) {
      topAlbumsByYear[year].set(albumKey, topAlbumsByYear[year].get(albumKey) + 1);
    } else {
      topAlbumsByYear[year].set(albumKey, 1);
    }

    // Top Artists
    const artistKey = log.master_metadata_album_artist_name;
    if (!topArtistsByYear[year]) {
      topArtistsByYear[year] = new Map();
    }
    if (topArtistsByYear[year].has(artistKey)) {
      topArtistsByYear[year].set(artistKey, topArtistsByYear[year].get(artistKey) + 1);
    } else {
      topArtistsByYear[year].set(artistKey, 1);
    }

    // Top Songs
    const songKey = `${log.master_metadata_track_name} - ${log.master_metadata_album_artist_name}`;
    if (!topSongsByYear[year]) {
      topSongsByYear[year] = new Map();
    }
    if (topSongsByYear[year].has(songKey)) {
      topSongsByYear[year].set(songKey, topSongsByYear[year].get(songKey) + 1);
    } else {
      topSongsByYear[year].set(songKey, 1);
    }
  });

  // Sort and get the top 20 for each year
  const top20ItemsByYear = {};
  for (const year in topAlbumsByYear) {
    const topAlbums = Array.from(topAlbumsByYear[year].entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([albumKey, count]) => ({
        album: albumKey,
        count: count,
      }));

    const topArtists = Array.from(topArtistsByYear[year].entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([artistKey, count]) => ({
        artist: artistKey,
        count: count,
      }));

    const topSongs = Array.from(topSongsByYear[year].entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([songKey, count]) => ({
        song: songKey,
        count: count,
      }));

    top20ItemsByYear[year] = {
      topAlbums: topAlbums,
      topArtists: topArtists,
      topSongs: topSongs,
    };
  }

  return top20ItemsByYear;
}

// Function to find the all-time top 6 albums, artists, and songs
function findAllTimeTopItems(logs) {
  const allTimeTopAlbums = new Map();
  const allTimeTopArtists = new Map();
  const allTimeTopSongs = new Map();

  logs.forEach((log) => {
    // All-Time Top Albums
    const albumKey = `${log.master_metadata_album_album_name} - ${log.master_metadata_album_artist_name}`;
    if (allTimeTopAlbums.has(albumKey)) {
      allTimeTopAlbums.set(albumKey, allTimeTopAlbums.get(albumKey) + 1);
    } else {
      allTimeTopAlbums.set(albumKey, 1);
    }

    // All-Time Top Artists
    const artistKey = log.master_metadata_album_artist_name;
    if (allTimeTopArtists.has(artistKey)) {
      allTimeTopArtists.set(artistKey, allTimeTopArtists.get(artistKey) + 1);
    } else {
      allTimeTopArtists.set(artistKey, 1);
    }

    // All-Time Top Songs
    const songKey = `${log.master_metadata_track_name} - ${log.master_metadata_album_artist_name}`;
    if (allTimeTopSongs.has(songKey)) {
      allTimeTopSongs.set(songKey, allTimeTopSongs.get(songKey) + 1);
    } else {
      allTimeTopSongs.set(songKey, 1);
    }
  });

  // Sort and get the top 6 for all-time
  const allTimeTopItems = {
    allTimeTopAlbums: Array.from(allTimeTopAlbums.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([albumKey, count]) => ({
        album: albumKey,
        count: count,
      })),
    allTimeTopArtists: Array.from(allTimeTopArtists.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([artistKey, count]) => ({
        artist: artistKey,
        count: count,
      })),
    allTimeTopSongs: Array.from(allTimeTopSongs.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([songKey, count]) => ({
        song: songKey,
        count: count,
      })),
  };

  return allTimeTopItems;
}

// Analyze all log files
function analyzeLogFiles() {
  const allLogs = [];

  logFiles.forEach((logFile) => {
    const filePath = path.join(__dirname, logFile);
    const logs = readJSONFile(filePath);
    allLogs.push(...logs);
  });

  const averageTimePerDay = calculateAverageTime(allLogs);
  const topItemsByYear = findTopItems(allLogs);
  const allTimeTopItems = findAllTimeTopItems(allLogs);

  // Display results
  console.log(chalk.green.bold('Total Hours Played:', averageTimePerDay.toFixed(2)));
  console.log();

  for (const year in topItemsByYear) {
    console.log(chalk.yellow.bold(`Top 20 Albums in ${year}:`));
    topItemsByYear[year].topAlbums.forEach((album, index) => {
      console.log(chalk.yellow(`${index + 1}. ${album.album} - Played ${album.count} times`));
    });
    console.log();

    console.log(chalk.blue.bold(`Top 20 Artists in ${year}:`));
    topItemsByYear[year].topArtists.forEach((artist, index) => {
      console.log(chalk.blue(`${index + 1}. ${artist.artist} - Played ${artist.count} times`));
    });
    console.log();

    console.log(chalk.magenta.bold(`Top 20 Songs in ${year}:`));
    topItemsByYear[year].topSongs.forEach((song, index) => {
      console.log(chalk.magenta(`${index + 1}. ${song.song} - Played ${song.count} times`));
    });
    console.log();
  }

  // Display all-time top 6
  console.log(chalk.red.bold('All-Time Top 6 Albums:'));
  allTimeTopItems.allTimeTopAlbums.forEach((album, index) => {
    console.log(chalk.red(`${index + 1}. ${album.album} - Played ${album.count} times`));
  });
  console.log();

  console.log(chalk.cyan.bold('All-Time Top 6 Artists:'));
  allTimeTopItems.allTimeTopArtists.forEach((artist, index) => {
    console.log(chalk.cyan(`${index + 1}. ${artist.artist} - Played ${artist.count} times`));
  });
  console.log();

  console.log(chalk.yellow.bold('All-Time Top 6 Songs:'));
  allTimeTopItems.allTimeTopSongs.forEach((song, index) => {
    console.log(chalk.yellow(`${index + 1}. ${song.song} - Played ${song.count} times`));
  });
}

analyzeLogFiles();
