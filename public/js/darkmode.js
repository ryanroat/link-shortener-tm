/*
based off https://dev.to/ekaterina_vu/dark-mode-with-one-line-of-code-4lkm
and https://www.youtube.com/watch?v=qimopjP6YoM
*/

const darkmode = document.querySelector('#darkmode');
darkmode.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
});
