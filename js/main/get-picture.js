let hasPicture = function(picture, link, source) {
  let pictureEl = ""
  if(source) {
    return "";
  }
  if(typeof picture === 'string') {
    pictureEl = `
      <div class='picture-wrap'>
        <a class='picture-link' href='${link}' target='_blank'>
          <img class='picture-custom' src='${picture}' width='100%' alt=''>
        </a>
      </div>
    `;
  }
  return pictureEl;
}
