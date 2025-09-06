const apiKey = "AIzaSyAa5mJThKeXqIbcB_pBIE4jOlTw04Ej2fU";
const localStorageKey = "ytScriptVideos";

// Default videos object
const defaultVideos = {
  "FactBoltx": {
    video1: {
      title : "थाईलैंड की नचनिया डिश 😅",
      videoId : "tlnThD0Wbn0",
      date : "2025-07-27",
      script: "***************",
      hashtags:"*****************",
    },
    video2: {
      title: "Would You Climb Steps for Unforgettable View 👣",
      videoId: "q1-eYtJ1oxc",
      date: "2025-07-04",
      script: `आपकी टांगे भी ऐसे कांपने लगेगी अगर आपने इस आसमानी सीढ़ी पर चढ़ने की कोशिश की तो दर्सल यह चाईना में‌ बने डेनजीया पहाड़ की सीढ़ी है जो लगभग 90 डिग्री तक खड़ी है और यहां आपकी सेफ्टी का कोई खास ध्यान नहीं रखा जाता...`,
      hashtags: "*NO HASTAGS*"
    },
    video3: {
      title : "क्या शेर का बच्चा अंधा पैदा होता है 😱",
      videoId : "WXxXIyGKva4",
      date : "2025-07-09",
      script: "क्या आप जानते हो शेर का बच्चा अंधा होता है जब वो पैदा होता है...",
      hashtags: "#LionCub #SherKaBaccha #WildlifeFacts ...",
    },
    // बाकी videos को यहां शामिल करें उसी फॉर्मेट में...
    // video4, video5,...video13
  }
};

// 1️⃣ LocalStorage से videos लोड करें या default fallback
let videos = {};
const savedVideos = localStorage.getItem(localStorageKey);

if (savedVideos) {
  try {
    videos = JSON.parse(savedVideos);

    // defaultVideos से merge करें (missing videos भरने के लिए)
    for (const channel in defaultVideos) {
      if (!videos[channel]) videos[channel] = {};
      Object.assign(videos[channel], defaultVideos[channel]);
    }
  } catch (e) {
    console.error("Invalid JSON in localStorage, resetting to default:", e);
    videos = defaultVideos;
  }
} else {
  videos = defaultVideos;
}

// 2️⃣ Save merged or default videos to localStorage
localStorage.setItem(localStorageKey, JSON.stringify(videos));

  


function addNewVideo() {
  const name = document.getElementById('channel-name').value.trim();
  const title = document.getElementById('new-title').value.trim();
  const videoId = document.getElementById('new-id').value.trim();
  const date = document.getElementById('new-date').value.trim();
  const script = document.getElementById('new-script').value.trim();
  const hashtags = document.getElementById('new-hashtags').value.trim();

  if (!title || !videoId || !date || !script) {
     

    Swal.fire({
      icon: 'warning',
      title: 'Missing Fields',
      text: 'Please fill all required fields.',
      background: '#1e1e2f',
      color: '#fff'
    });
    return;
  }

  const videoKey = `video${Object.keys(videos[name]).length + 1}`;

  videos[name][videoKey] = {
    title,
    videoId,
    date,
    script,
    hashtags: hashtags === "" ? "*NO HASTAGS*" : hashtags
  };

   // ✅ Save updated videos to localStorage
  localStorage.setItem("ytScriptVideos", JSON.stringify(videos));

  const select = document.getElementById('video-select');
  const option = document.createElement('option');
  option.value = videoKey;
  option.textContent = title;
  select.appendChild(option);
  select.value = videoKey;

  Swal.fire({
    icon: 'success',
    title: 'Video Added!',
    text: 'Your video has been added successfully.',
    background: '#1e1e2f',
    color: '#fff'
  });

  showVideoDetails();
}
function deleteCurrentVideo() {
  const name = document.getElementById('channel-name').value.trim();
  const key = document.getElementById('video-select').value;

  Swal.fire({
    title: 'Are you sure?',
    text: "This video will be permanently deleted.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    background: '#1e1e2f',
    color: '#fff'
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete from object
      delete videos[name][key];

      // Save updated object
      localStorage.setItem("ytScriptVideos", JSON.stringify(videos));

      // Remove from dropdown
      const select = document.getElementById('video-select');
      const optionToRemove = select.querySelector(`option[value="${key}"]`);
      if (optionToRemove) optionToRemove.remove();

      // Reset UI
      if (select.options.length > 0) {
        select.selectedIndex = 0;
        showVideoDetails();  // Show next available video
      } else {
        document.getElementById('video-details').style.display = 'none';
      }

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your video has been deleted.',
        background: '#1e1e2f',
        color: '#fff'
      });
    }
  });
}

function loadChannel() {
const name = document.getElementById('channel-name').value.trim();
const actualName = Object.keys(videos).find(v => v.toLowerCase() === name.toLowerCase());
if (!actualName) {
  // INVALID CHANNEL
}

  const pass = document.getElementById('channel-password').value.trim();

  if (!name || !pass) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'PLEASE ENTER YOUR CHANNEL NAME AND PASSWORD',
      confirmButtonText: 'OK',
      background: '#1e1e2f',
      color: '#f0f0f5',
    });
    return;
  }

  if (!videos[name]) {
    Swal.fire({
      icon: 'error',
      title: 'INVALID CHANNEL NAME!',
      text: 'PLEASE ENTER A VALID CHANNEL NAME',
      confirmButtonText: 'OK',
      background: '#1e1e2f',
      color: '#f0f0f5',
    });
    return;
  }

  const channelPasswords = {
  "FactBoltx": "Sany2580",
  
};

if (pass !== channelPasswords[name]) {
  Swal.fire({
    icon: 'error',
    title: 'WRONG PASSWORD!',
    text: 'PLEASE ENTER RIGHT PASSWORD',
    confirmButtonText: 'OK',
    background: '#1e1e2f',
    color: '#f0f0f5',
  });
  return;
}


  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('main-container').style.display = 'flex';

  loadSubscriberCount(name);

  const select = document.getElementById('video-select');
  select.innerHTML = "";
  const data = videos[name];
  for (const key in data) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = data[key].title;
    select.appendChild(option);
  }

  document.getElementById('video-select-container').style.display = 'block';
  showVideoDetails();
}

function splitGraphemes(str) {
  return [...str.normalize('NFC')];
}

function showLoading() {
  document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading-spinner').style.display = 'none';
}

function showVideoDetails() {
  showLoading();

  const name = document.getElementById('channel-name').value.trim();
  const key = document.getElementById('video-select').value;
  const video = videos[name][key];
  const id = video.videoId;

  document.getElementById('video-details').style.display = 'none';
  document.getElementById('video-title').innerText = "";
  document.getElementById('video-script').innerHTML = "";

  let chars = splitGraphemes(video.script);
  let i = 0;

  function typeText() {
    if (i < chars.length) {
      document.getElementById('video-script').innerHTML += chars[i];
      i++;
      setTimeout(typeText, 25);
    } else {
      document.getElementById('copy-script-btn').style.display = 'inline-block';
    }
  }

  document.getElementById('video-title').innerText = video.title;
  document.getElementById('video-link').href = `https://youtube.com/shorts/${id}`;
  document.getElementById('video-thumb').src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  document.getElementById('video-watch').innerText = `📅 ${video.date}`;
  document.getElementById('video-hashtags').innerText = video.hashtags;

  typeText();

  fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${id}&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const stats = data.items[0].statistics;
        document.getElementById('video-views').innerText = `👁 ${formatNum(stats.viewCount)} Views`;
        document.getElementById('video-likes').innerText = `❤️ ${formatNum(stats.likeCount)} Likes`;

        const snippet = data.items[0].snippet;
        const publishedAt = new Date(snippet.publishedAt);
        const options = {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: 'numeric', minute: '2-digit', hour12: true
        };
        const formattedTime = publishedAt.toLocaleString('en-US', options);
        document.getElementById('video-upload-time').innerText = `🕒 Upload: ${formattedTime}`;
      } else {
        document.getElementById('video-views').innerText = "👁 Unknown Views";
        document.getElementById('video-likes').innerText = "❤️ Unknown Likes";
      }
      hideLoading();
      document.getElementById('video-details').style.display = 'block';
    })
    .catch(() => {
      document.getElementById('video-views').innerText = "👁 Unknown Views";
      document.getElementById('video-likes').innerText = "❤️ Unknown Likes";
      hideLoading();
      document.getElementById('video-details').style.display = 'block';
    });
}

function formatNum(n) {
  n = Number(n);
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n;
}

function copyScript() {
  const scriptText = document.getElementById('video-script').textContent;
  navigator.clipboard.writeText(scriptText)
    .then(() => console.log('Script copied successfully!'))
    .catch(err => console.error("Copy failed:", err));
}


function copyHashtags() {
  const hashtags = document.getElementById('video-hashtags').innerText;
  navigator.clipboard.writeText(hashtags).then(() => {
    alert("Hashtags copied!");
  });
}

function shareWhatsApp() {
  const hashtags = encodeURIComponent(document.getElementById('video-hashtags').innerText);
  const url = encodeURIComponent(document.getElementById('video-link').href);
  const message = `देखो ये वीडियो: ${url}\n\n${hashtags}`;
  window.open(`https://wa.me/?text=${message}`, '_blank');
}

function shareTwitter() {
  const hashtagsRaw = document.getElementById('video-hashtags').innerText;
  const hashtags = encodeURIComponent(hashtagsRaw.replace(/#/g, '').replace(/\s+/g, '').replace(/,/g, ''));
  const url = encodeURIComponent(document.getElementById('video-link').href);
  const text = encodeURIComponent('ये वीडियो देखो!');
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`, '_blank');
}

function loadSubscriberCount(channelName) {
  let channelId;

  if (channelName === "FactBoltx") {
    channelId = "UCh8GsXvif0i5ez9T9s4ZxGQ";  // ✅ सही channel ID
  }
  // Future: else if (channelName === "Inspire4Ever") { channelId = "..." }

  if (!channelId) {
    document.getElementById('channel-subs').innerText = "Subscribers: Unknown";
    return;
  }

 fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const subs = data.items[0].statistics.subscriberCount;
        document.getElementById('channel-subs').innerText = `Subscribers: ${formatNum(subs)}`;
      } else {
        document.getElementById('channel-subs').innerText = "Subscribers: Unknown";
      }
    })
    .catch(() => {
      document.getElementById('channel-subs').innerText = "Subscribers: Unknown";
    });
}