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

  let audiosource = '';
  let result = '';
  let fileinput = filelist.id;

  const audioSourceAndResultFinder = () => {
    if (filelist.id === 'fileinput1') {
      audiosource = 'audiosource1';
      result = 'result1';
    } else if (filelist.id === 'fileinput2') {
      audiosource = 'audiosource2';
      result = 'result2';
    } else if (filelist.id === 'fileinput3') {
      audiosource = 'audiosource3';
      result = 'result3';
    } else if (filelist.id === 'fileinput4') {
      audiosource = 'audiosource4';
      result = 'result4';
    } else if (filelist.id === 'fileinput5') {
      audiosource = 'audiosource5';
      result = 'result5';
    } else if (filelist.id === 'fileinput6') {
      audiosource = 'audiosource6';
      result = 'result6';
    } else {
      return;
    }
  };

  audioSourceAndResultFinder();

  document.getElementById(result).innerHTML = fileinfo;
  document
    .getElementById(audiosource)
    .setAttribute(
      'src',
      URL.createObjectURL(document.getElementById(fileinput).files[0])
    );
}

//playing all files in order
const playAll = async () => {
  let order = [];
  for (let i = 1; i <= 6; i++) {
    let data = document.getElementById(`box${i}`).children;
    order.push(`audiosource${data[0].id.slice(4)}`);
  }

  const getAudioPromise = (element) =>
    new Promise((resolve) => {
      let audio = document.getElementById(element);
      audio.addEventListener('ended', resolve);
      audio.play();
    });

  for (let i = 0; i <= 5; i++) {
    await getAudioPromise(order[i]);
  }
};
