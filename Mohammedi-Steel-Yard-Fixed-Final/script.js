addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("hide"),2100));const b=document.getElementById("toggle"),d=document.getElementById("details");b.onclick=()=>{d.classList.toggle("open");b.parentElement.classList.toggle("open")};
document.querySelectorAll('a[href^="https://www.google.com/maps/"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const url = this.href;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) window.location.href = url;
  });
});
