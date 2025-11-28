const shortenButton = document.querySelector('.shortener-form button')
const input = document.querySelector('.shortener-form input')
const resultsContainer = document.querySelector('.results')


function saveLink(original, short) {
  const links = JSON.parse(localStorage.getItem('links') || '[]');
  links.push({ original, short });
  localStorage.setItem('links', JSON.stringify(links));
}

function loadLinks() {
  const links = JSON.parse(localStorage.getItem('links') || '[]');

  links.forEach(({ original, short }) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-card';
    resultItem.innerHTML = `${original} => <a href="${short}" target="_blank">${short}</a>`;

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(short).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
      });
    });

    resultItem.appendChild(copyBtn);
    resultsContainer.appendChild(resultItem);
  });
}

document.addEventListener('DOMContentLoaded', loadLinks);


shortenButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const original = input.value.trim();
  if (!original) return;

  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 807d61f689cfe5d11236edc8d6471c7eb235dbe0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      long_url: original,
      domain: 'bit.ly'
    })
  });

  const data = await response.json();
  const realShortUrl = data.link; // Bitly’s shortened link [web:4][web:5][web:37]

  const resultItem = document.createElement('div');
  resultItem.className = 'result-card';
  resultItem.innerHTML = `${original} <a href="${realShortUrl}" target="_blank">${realShortUrl}</a>`;

  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(realShortUrl).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 2000);
    });
  });
  resultItem.appendChild(copyBtn);

  resultsContainer.appendChild(resultItem);
  saveLink(original, realShortUrl);
  input.value = '';
});

