const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

async function convert() {
  const fileInput = document.getElementById('uploader');
  const file = fileInput.files[0];
  document.getElementById('status').innerText = "Loading FFmpeg...";
  await ffmpeg.load();

  ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));
  await ffmpeg.run('-i', 'input.mp4', 'output.mp3');
  const data = ffmpeg.FS('readFile', 'output.mp3');

  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mpeg' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'converted.mp3';
  link.innerText = 'Download MP3';
  document.getElementById('status').innerHTML = '';
  document.getElementById('status').appendChild(link);
}
