
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


document.addEventListener('DOMContentLoaded', function() {
    
    // --- Universal Function to Sync Slider & Text Box ---
    function syncInputs(slider, text, callback) {
        slider.addEventListener('input', function() {
            text.value = slider.value;
            callback();
        });
        text.addEventListener('input', function() {
            slider.value = text.value;
            callback();
        });
    }

    // ================= EMI CALCULATOR =================
    const loanSlider = document.getElementById('loan-amount');
    const loanText = document.getElementById('loan-amount-text');
    const rateSlider = document.getElementById('interest-rate');
    const rateText = document.getElementById('interest-rate-text');
    const yearSlider = document.getElementById('loan-years');
    const yearText = document.getElementById('loan-years-text');

    const out_emi = document.getElementById('monthly-emi');
    const out_totalInt = document.getElementById('total-interest');
    const chart_loan = document.getElementById('loan-chart');

    function calcEMI() {
        let P = parseFloat(loanText.value);
        let r = parseFloat(rateText.value) / 12 / 100;
        let n = parseFloat(yearText.value) * 12;

        if(P > 0 && r > 0 && n > 0) {
            let emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            if (!isFinite(emi)) emi = 0;
            
            let totalPay = emi * n;
            let totalInt = totalPay - P;

            out_emi.innerText = "₹ " + Math.round(emi).toLocaleString('en-IN');
            out_totalInt.innerText = "₹ " + Math.round(totalInt).toLocaleString('en-IN');
            
            let intPer = (totalInt / totalPay) * 100;
            chart_loan.style.background = `conic-gradient(#38bdf8 0% ${100-intPer}%, #fbbf24 ${100-intPer}% 100%)`;
        }
    }
    // Sync EMI Inputs
    syncInputs(loanSlider, loanText, calcEMI);
    syncInputs(rateSlider, rateText, calcEMI);
    syncInputs(yearSlider, yearText, calcEMI);


    // ================= FD CALCULATOR =================
    const fdSlider = document.getElementById('fd-amount');
    const fdText = document.getElementById('fd-amount-text');
    const fdRateSlider = document.getElementById('fd-rate');
    const fdRateText = document.getElementById('fd-rate-text');
    const fdYearSlider = document.getElementById('fd-years');
    const fdYearText = document.getElementById('fd-years-text');

    const out_fd_mat = document.getElementById('fd-maturity');
    const out_fd_int = document.getElementById('fd-interest');
    const chart_fd = document.getElementById('fd-chart');

    function calcFD() {
        let P = parseFloat(fdText.value);
        let r = parseFloat(fdRateText.value);
        let t = parseFloat(fdYearText.value);

        if(P > 0 && r > 0 && t > 0) {
            // Quarterly Compounding Formula
            let A = P * Math.pow((1 + r / 400), (4 * t));
            let totalInt = A - P;

            out_fd_mat.innerText = "₹ " + Math.round(A).toLocaleString('en-IN');
            out_fd_int.innerText = "₹ " + Math.round(totalInt).toLocaleString('en-IN');

            let intPer = (totalInt / A) * 100;
            chart_fd.style.background = `conic-gradient(#4ade80 0% ${100-intPer}%, #fbbf24 ${100-intPer}% 100%)`;
        }
    }
    // Sync FD Inputs
    syncInputs(fdSlider, fdText, calcFD);
    syncInputs(fdRateSlider, fdRateText, calcFD);
    syncInputs(fdYearSlider, fdYearText, calcFD);


    // ================= RD CALCULATOR =================
    const rdSlider = document.getElementById('rd-amount');
    const rdText = document.getElementById('rd-amount-text');
    const rdRateSlider = document.getElementById('rd-rate');
    const rdRateText = document.getElementById('rd-rate-text');
    const rdYearSlider = document.getElementById('rd-years');
    const rdYearText = document.getElementById('rd-years-text');

    const out_rd_mat = document.getElementById('rd-maturity');
    const out_rd_int = document.getElementById('rd-interest');
    const chart_rd = document.getElementById('rd-chart');

    function calcRD() {
        let P = parseFloat(rdText.value);
        let r = parseFloat(rdRateText.value);
        let t = parseFloat(rdYearText.value);
        let totalMonths = t * 12;

        if(P > 0 && r > 0 && t > 0) {
            let totalMaturity = 0;
            // Monthly Deposit + Quarterly Compounding Logic
            for (let i = 0; i < totalMonths; i++) {
                let monthsRemaining = totalMonths - i;
                let interestPart = P * Math.pow((1 + r/400), (4 * monthsRemaining / 12));
                totalMaturity += interestPart;
            }

            let totalInvested = P * totalMonths;
            let totalInt = totalMaturity - totalInvested;

            out_rd_mat.innerText = "₹ " + Math.round(totalMaturity).toLocaleString('en-IN');
            out_rd_int.innerText = "₹ " + Math.round(totalInt).toLocaleString('en-IN');

            let intPer = (totalInt / totalMaturity) * 100;
            chart_rd.style.background = `conic-gradient(#f472b6 0% ${100-intPer}%, #fbbf24 ${100-intPer}% 100%)`;
        }
    }
    // Sync RD Inputs
    syncInputs(rdSlider, rdText, calcRD);
    syncInputs(rdRateSlider, rdRateText, calcRD);
    syncInputs(rdYearSlider, rdYearText, calcRD);

    // Initial Calculation Run
    calcEMI();
    calcFD();
    calcRD();
});




