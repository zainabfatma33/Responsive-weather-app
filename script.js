const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const resultCard = document.getElementById('result');
const cityName = document.getElementById('city-name');
const desc = document.getElementById('desc');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const errorEl = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  errorEl.textContent = '';
  resultCard.classList.add('hidden');

  try {
    const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      const err = await res.json();
      errorEl.textContent = err.error || 'Could not fetch weather';
      return;
    }
    const data = await res.json();
    cityName.textContent = `${data.city}, ${data.country || ''}`;
    desc.textContent = capitalize(data.description || '');
    temp.textContent = `${Math.round(data.temp)}°C`;
    humidity.textContent = data.humidity ?? '—';
    wind.textContent = data.wind_speed ?? '—';
    if (data.icon) {
      icon.src = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
      icon.alt = data.description || 'weather icon';
    } else {
      icon.src = '';
      icon.alt = '';
    }
    resultCard.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    errorEl.textContent = 'Network error. Try again.';
  }
});

function capitalize(s){
  if (!s) return '';
  return s.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}
