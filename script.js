
function toggleMenu(){
	const nav =
  document.getElementById("navlinks");
  if (nav) {
  nav.classList.toggle("active");
  }else{
  console.error("navlinks id not fount on this page ");
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

