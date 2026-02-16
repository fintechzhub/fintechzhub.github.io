
function toggleMenu(){
	const nav =
  document.getElementById("navlinks");
  
  if (nav.classList.contains("active"))
  {nav.classList.remove ("active");
  } else {
  nav.classList.add("active")
  } 
  }

function reveal() {
    var reveals = document.querySelectorAll('.card');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('show');
        }
    }
}
window.addEventListener('scroll', reveal);
window.onload = reveal;



// ================= EMI CALCULATOR (MONTHS) =================
function calcEMI() {
    let P = parseFloat(document.getElementById('loan-amount-text').value);
    let r = parseFloat(document.getElementById('interest-rate-text').value) / 12 / 100;
    let n = parseFloat(document.getElementById('loan-months-text').value); // Direct Months

    if (P > 0 && r > 0 && n > 0) {
        let emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        let totalPay = emi * n;
        let totalInt = totalPay - P;

        document.getElementById('monthly-emi').innerText = "₹ " + Math.round(emi).toLocaleString('en-IN');
        document.getElementById('total-interest').innerText = "₹ " + Math.round(totalInt).toLocaleString('en-IN');
        document.getElementById('emi-result').style.display = "block";

        let intPer = (totalInt / totalPay) * 100;
        document.getElementById('loan-chart').style.background = `conic-gradient(#38bdf8 0% ${100-intPer}%, #fbbf24 ${100-intPer}% 100%)`;
    } else {
        alert("कृपया सही जानकारी भरें!");
    }
}

// ================= FD CALCULATOR (MONTHS) =================
function calcFD() {
    let P = parseFloat(document.getElementById('fd-amount-text').value);
    let r = parseFloat(document.getElementById('fd-rate-text').value);
    let months = parseFloat(document.getElementById('fd-months-text').value);
    let t = months / 12; // Time in years for the bank formula

    if (P > 0 && r > 0 && months > 0) {
        let A = P * Math.pow((1 + r / 400), (4 * t)); // Quarterly Compounding
        let totalInt = A - P;

        document.getElementById('fd-maturity').innerText = "₹ " + Math.round(A).toLocaleString('en-IN');
        document.getElementById('fd-interest').innerText = "₹ " + Math.round(totalInt).toLocaleString('en-IN');
        document.getElementById('fd-result').style.display = "block";

        let intPer = (totalInt / A) * 100;
        document.getElementById('fd-chart').style.background = `conic-gradient(#4ade80 0% ${100-intPer}%, #fbbf24 ${100-intPer}% 100%)`;
    } else {
        alert("कृपया सही जानकारी भरें!");
    }
}

// ================= RD CALCULATOR (MONTHS) =================
function calcRD() {
    let P = parseFloat(document.getElementById('rd-amount-text').value);
    let r = parseFloat(document.getElementById('rd-rate-text').value);
    let n = parseFloat(document.getElementById('rd-months-text').value);

    if (P > 0 && r > 0 && n > 0) {
        let maturityAmount = 0;
        for (let i = 0; i < n; i++) {
            let monthsRemaining = n - i;
            let interest = P * Math.pow((1 + r / 400), (4 * monthsRemaining / 12));
            maturityAmount += interest;
        }

        let totalInvested = P * n;
        let totalInt = maturityAmount - totalInvested;

        document.getElementById('rd-maturity').innerText = "₹ " + Math.round(maturityAmount).toLocaleString('en-IN');
        document.getElementById('rd-interest').innerText = "₹ " + Math.round(totalInt).toLocaleString('en-IN');
        document.getElementById('rd-result').style.display = "block";

        let intPer = (totalInt / maturityAmount) * 100;
        document.getElementById('rd-chart').style.background = `conic-gradient(#f472b6 0% ${100-intPer}%, #fbbf24 ${100-intPer}% 100%)`;
    } else {
        alert("कृपया सही जानकारी भरें!");
    }
}