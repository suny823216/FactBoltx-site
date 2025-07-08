const apiKey = "AIzaSyAa5mJThKeXqIbcB_pBIE4jOlTw04Ej2fU";

const videos = {
   "Improve4Ever": {
    video1: {
      title: "Eating China's Weirdest PAPAD 😱",
      videoId: "uyMYls6iSm0",
      date: "2025-07-05",
      script: `यह जो पापड़ आप देख रहे हैं चीनी लोग बहुत दीवाने हैं क्योंकि इनको बनाने का तरीका इतना जबरदस्त है कि सुनके आपके मुंह में पानी आ जाएगा दरअसल जब किसी फ्रेश वाटर वाली लगी हुई काई को निकाल कर उसे कई बार धोया जाता है तो उसके अंदर से मिट्टी और इंप्योरिटी वगैरा साफ हो जाती है जो भी साफ काई को धूप में गोल सेप बनाकर सुखाया जाता है तो इसमें एक अलग ही कुरकुरा पन आ जाता है दो-तीन दिनों तक यह हरि काई धूप में सूखती रहती है और जब यह एक बार अच्छे से सूख जाती है तो फिर इस तेल में तलकर इसके पापड़ बना लिए जाते हैं जो की टेस्टी और पोषण से भरपूर होते हैं तो बताओ किस खिलाओगे ये पापड़`,
      hashtags: "*NO HASTAGS*"
    },
     video2: {
      title: "Would You Climb Steps for Unforgettable View 👣",
      videoId: "q1-eYtJ1oxc",
      date: "2025-07-04",
      script: `आपकी टांगे भी ऐसे कांपने लगेगी अगर आपने इस आसमानी सीढ़ी पर चढ़ने की कोशिश की तो दर्सल यह चाईना में‌ बने डेनजीया पहाड़ की सीढ़ी है जो लगभग 90 डिग्री तक खड़ी है और यहां आपकी सेफ्टी का कोई खास ध्यान नहीं रखा जाता जरा सी गलती होने पर जन्नत जाना पक्का है इसलिए तो इसे जन्नतिया सिढ़ी कहते हैं हालांकि लोकल्स इधर बड़े आराम से चढ़  जाते हैं और इधर झाड़ू भी लगा देते हैं लेकिन आप इस पर मत जाना क्योंकि चढ़ाने से ज्यादा यहां से उतारना मुश्किल है`,
      hashtags: "*NO HASTAGS*"
    },
     video3: {
      title: "कील नहीं, कम्फर्ट चाहिए – घोड़े का स्टाइल स्टेटमेंट",
      videoId: "kWK2hL2h90E",
      date: "2025-07-03",
      script: `एक घोड़े को बहुत दर्द होता है अगर कल थूकते वक्त वह गलती से ज्यादा अंदर चली जाए इसीलिए घोड़े के साथ ऐसा ना हो आजकल कुछ लोग घोड़े को जूते पनान रहे हैं जो अलग-अलग कलर में आते हैं साथी इसमें कील ठोकने की जरूरत भी नहीं पड़ती जहां लोहे की नाल की गली सतहो पर स्लिप होने के चांस होते हैं वही जूते पहनने वाला घोड़ा हर सतह पर मजे से चल लेता है उसे जूते में कंफर्ट महसूस होता है इतना ही नहीं घोड़ी के लिए तो स्पेशल पिंक कलर के जूते भी आते हैं देखते ही दीवानी हो जाएगी घोड़ी जूते की`,
      hashtags: "*NO HASTAGS*"
    },
  }
  };
    // ⬅️ बाकी Inspire4Ever के videos यहीं डालो
  

  
  




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
  "Improve4Ever": "suny123",
  
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

  if (channelName === "Improve4Ever") {
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

  

  
