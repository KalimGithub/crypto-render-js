const table = document.getElementsByTagName("table")[0];
const tbody = document.getElementsByTagName("tbody")[0];



async function fetchData() {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to render data in cards
async function renderData() {
  const data = await fetchData();

  if (!data) {
    return;
  }

  data.forEach((item) => {

    const row = document.createElement("tr");

    const id = document.createElement("td");
    const img = document.createElement('img');
    img.src = item.image;
    const span =  document.createElement('span');
    span.append(img);
    id.appendChild(span);
    id.innerHTML += item.id;
    id.classList.add('item-logo');

    const symbol = document.createElement("td");
    symbol.innerText = (item.symbol).toUpperCase();


    const current_prize = document.createElement("td")
    current_prize.innerHTML = `$${item.current_price}`;

    const valuation = document.createElement("td")
    valuation.innerHTML= `$${item.fully_diluted_valuation}`;
    
    const percent = document.createElement("td")
   let x = item.ath_change_percentage.toFixed(2);
    percent.innerHTML = `${x}%`;
    percent.classList.add='percent-text';
    percent > 0
      ? (percent.style.color = "rgb(32, 222, 32)")
      : (percent.style.color = "red");
    

    const cap = document.createElement("td")
    cap.innerHTML = `$${item.market_cap}`;

    row.append(id, symbol, current_prize,valuation, percent, cap);
    tbody.appendChild(row);
  });
}

renderData();