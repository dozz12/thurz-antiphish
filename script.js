const backendURL = "http://localhost:5000"; // ganti sesuai servermu

async function cekLink() {
  const url = document.getElementById("urlInput").value;
  const res = await fetch(`${backendURL}/check-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  const data = await res.json();
  document.getElementById("cekResult").textContent = data.result;
}

async function laporLink() {
  const url = document.getElementById("reportUrl").value;
  const description = document.getElementById("reportDesc").value;
  const email = document.getElementById("reportEmail").value;

  const res = await fetch(`${backendURL}/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, description, email })
  });
  const data = await res.json();
  document.getElementById("laporResult").textContent = data.message;
}
