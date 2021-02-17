//dragging and dropping functions
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
  event.preventDefault();
  let data = document.getElementById(event.dataTransfer.getData('text'));
  let dataParent = data.parentNode;
  let target = event.currentTarget.firstElementChild;

  if (target) {
    event.currentTarget.replaceChild(data, target);
    dataParent.appendChild(target);
  } else {
    event.currentTarget.appendChild(data, target);
  }
}

//playing file from local storage
function fileSelected(filelist) {
  var fileinfo = filelist.files[0].name;
  // '</p>' +
  // '<p>File size: ' +
  // filelist.files[0].size +
  // '</p>' +
  // '<p>File type: ' +
  // filelist.files[0].type +

  document.getElementById('result').innerHTML = fileinfo;
  document
    .getElementById('audiosource')
    .setAttribute(
      'src',
      URL.createObjectURL(document.getElementsByTagName('input')[0].files[0])
    );
}
