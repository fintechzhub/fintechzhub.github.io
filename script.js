
function toggleMenu(){
	const nav =
  document.getElementById("navlinks");
  if (nav) {
  nav.classList.toggle("active");
  }else{
  console.error("navlinks id not fount on this page ");
  }
}

