import * as youtubeSearch from "youtube-search-without-api-key";
import { exec } from "child_process";

const songTitles = ["Rage Against The Machine: Bulls On Parade"];

songTitles.forEach(async (songTitle) => {
  const videos = await youtubeSearch.search(`${songTitle} lyrics HQ`);
  if (!videos.length) {
    console.error(`Could not find a video for: ${songTitle}`);
  }
  const { videoId } = videos[0].id;
  downloadSong(videoId);
});

async function downloadSong(videoId) {
  const shellCommand = `cd ./songs && yt-dlp -f 'ba' -x --audio-format m4a https://www.youtube.com/watch?v=${videoId} -o '%(title)s.%(ext)s'`;

  return new Promise((resolve, reject) => {
    exec(shellCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        reject(stderr);
      }

      resolve(stdout);
    });
  });
}
