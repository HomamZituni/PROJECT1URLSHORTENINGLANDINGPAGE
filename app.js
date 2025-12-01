













const shortenButton = document.querySelector('.shortener-form button')
const input = document.querySelector('.shortener-form input')
const resultsContainer = document.querySelector('.results')
const errorMessage = document.querySelector('.error-message');


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
  if (!original) {
    errorMessage.textContent = 'Please add a link';
    input.classList.add('error');
    return;
  }

   try {
    new URL(original);
  } catch {
    errorMessage.textContent = 'Please enter the full https URL';
    input.classList.add('error');
    return;
  }


  errorMessage.textContent = '';
  input.classList.remove('error');


  

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
  if (!response.ok) {
  console.log('Bitly error:', data);
  return;
}
  const realShortUrl = data.link; 

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

