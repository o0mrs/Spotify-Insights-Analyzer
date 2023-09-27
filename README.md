# Spotify Extended Streaming Log Analyzer

## Overview

Analyze your extended Spotify streaming history logs to gain insights into your top played songs, albums, and artists, as well as your average listening time per day. This tool processes Spotify streaming logs and provides valuable statistics to help you understand your music listening habits.

### Features

- Calculate your top 20 songs, albums, and artists for each year.
- Determine your all-time top 6 songs, albums, and artists.
- Calculate the average listening time per day.
- Calculate the total hours played.

### Requirements

- Node.js

## Usage

1. **Clone this repository:**

   ```bash
   git clone https://github.com/yourusername/spotify-extended-log-analyzer.git
   ```
2. **Navigate to the project directory:**
```shell
  cd spotify-extended-log-analyzer
  ```
3. **Place your Spotify extended streaming history log files (in JSON format) in the same directory as the script. Make sure to name them appropriately, e.g., Streaming_History_Audio_2022_1.json, Streaming_History_Audio_2023_3.json, etc.**

Install the required dependencies:
   ```shell
  npm install
  ```
Run the script:
 ```shell
node analyze.js
```
View the generated statistics in the console.

Note: Extended streaming history data may take up to 30 days to be available from Spotify.

# Sample Output
Here's a sample output of the script:
# Top 20 Songs, Albums, and Artists for 2022:

**Top 20 Songs:**
1. Song A - Artist A (Play Count: 100)
2. Song B - Artist B (Play Count: 90)
...
20. Song T - Artist T (Play Count: 10)

**Top 20 Albums:**
1. Album X - Artist X (Play Count: 50)
2. Album Y - Artist Y (Play Count: 45)
...
20. Album M - Artist M (Play Count: 5)

**Top 20 Artists:**
1. Artist P (Play Count: 150)
2. Artist Q (Play Count: 140)
...
20. Artist Z (Play Count: 20)

Total Hours Played: 400 hours
This script provides valuable insights into your Spotify listening history, helping you discover your favorite songs, albums, and artists for each year and all-time.

Enjoy analyzing your Spotify listening habits!

# Keywords:
Spotify, Streaming History, Node.js, JavaScript, Music Analysis, Data Analysis, Top Albums, Top Artists, Top Songs, Extended Streaming History, Spotify Data, Spotify API, Music Streaming, Song Analysis, Album Analysis, Artist Analysis.
