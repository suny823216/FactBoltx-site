const apiKey = "AIzaSyAa5mJThKeXqIbcB_pBIE4jOlTw04Ej2fU";

const videos = {
  "FactsBoltx": {
   video1: {
      title: "तीन किलो का फल 😨",
      videoId: "saR_XrYYou4",
      date: "2025-07-30",
      script:`*******`,
      hashtags: "**********"
    },

  video2 : {
    title: "प्लेन की नाक में छुपा राज 😨",
    videoId: "Jrg1CQw8GDE",
    date: "2025-07-26",
    script: "*************",
    hashtags: "*********"
  
  },
  
  video3 : {
    title: "फ्लेमिंगो क्यों हैं गुलाबी 🤔",
    videoId: "C-_M5SNSWZc",
    date: "2025-07-25",
    script: "*************",
    hashtags: "*********"
  }
    
    // ⬅️ बाकी Inspire4Ever के videos यहीं डालो
  

  
  }
};



function loadChannel() {
  const name = document.getElementById('channel-name').value.trim();
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
  "FactsBoltx": "sany95",
  
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

  if (channelName === "FactsBoltx") {
    channelId = "UCh8GsXvif0i5ez9T9s4ZxGQ";  // Replace with actual ID
  } else if (channelName === "Improve4Ever") {
    channelId = "UCh8GsXvif0i5ez9T9s4ZxGQ"; // 🔁 यहाँ Improve4Ever का channelId भरो
  } else {
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

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300); // Keyboard open hone ke thoda baad
    });
});
