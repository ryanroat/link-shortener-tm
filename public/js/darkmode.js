/* eslint-disable linebreak-style */
/*
based off https://dev.to/ekaterina_vu/dark-mode-with-one-line-of-code-4lkm
and https://www.youtube.com/watch?v=qimopjP6YoM
*/

const setDM = () => {
  const darkmodeOn = window.localStorage.getItem('darkmode');
  if (darkmodeOn === 'true') {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
  // console.log(darkmodeOn);
};

const toggleDM = () => {
  const darkmodeOn = window.localStorage.getItem('darkmode') === 'true' ? 'false' : 'true';
  window.localStorage.setItem('darkmode', darkmodeOn);
  setDM();
};

setDM();
const darkmode = document.querySelector('#darkmode');
// console.log(darkmode);
if (darkmode) {
  darkmode.addEventListener('click', () => {
    // document.documentElement.classList.toggle('dark-mode');
    toggleDM();
  });
}
