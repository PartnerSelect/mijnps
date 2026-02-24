export function scrollToItem(id) {
  let pos = document.getElementById(id).offsetTop;
  window.scrollTo({ top: pos - 50, behavior: 'smooth' });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
