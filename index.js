//dragging and dropping functions
//setting prevent default to stop page from reloading
function allowDrop(event) {
  event.preventDefault();
}

//function which allows drag
//1. set the drag ghost image as a 192 x 192 res image
//2. edit the image src to point to the image you want to be the ghost
//3. setting the data which will be dragged
//4. setting the drag image
function drag(event) {
  let img = new Image(192, 192);
  img.src = 'media\\happy192.png';
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dataTransfer.setDragImage(img, 96, 96);
}

//what happens on drop:
//1. data is the element getting dragged
//2. data parent is the parent node of the element getting dragged
//3. target is the current target first element child
//4. if there is a target, then:
//// replace the child of the target with the data
////append a new child to teh parent containing the target
//5. if there is not target, just append the data as a child
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
  //file info is the file name
  //file input is the id attached to the relevant input
  let fileinfo = filelist.files[0].name;
  let fileinput = filelist.id;

  //hacky way of setting each audiosource and result to the correct file input id
  let audiosource = '';
  let result = '';
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

  //calling the function above
  audioSourceAndResultFinder();

  //getting the correct result id and appending the name to the innerhtml
  document.getElementById(result).innerHTML = fileinfo;
  //getting the correct audiosource element and settings its src to be a URL object created by
  //reference to the file at the correct file input
  document
    .getElementById(audiosource)
    .setAttribute(
      'src',
      URL.createObjectURL(document.getElementById(fileinput).files[0])
    );
}

//playing all files in order
const playAll = async () => {
  //for loop which gets the audiosource order by checking the position of the box numbers and appending
  //their relevant audio source to the end of the order array.
  //for example if box 1 contains audiosource 5, then audiosource5 will be pushed on to the array to be played first
  let order = [];
  for (let i = 1; i <= 6; i++) {
    let data = document.getElementById(`box${i}`).children;
    order.push(`audiosource${data[0].id.slice(4)}`);
  }

  //a function wrapped in a promise which will "scrub through" a track by playing some of the start
  //and some of the end
  const getAudioPromise = (element) =>
    new Promise((resolve) => {
      //creating the audio "file"
      let audio = document.getElementById(element);

      //a timeout function which is used below, triggered (once) with an event listener to:
      //1. pause the track,
      //2. set the current time to a time near the end of the track
      //3. play the track and let it run to the end
      const timeOutFunction = () => {
        setTimeout(() => {
          audio.pause();
          audio.currentTime = audioEnd;
          audio.play();
        }, audioChunk * 1.5 * 100); //giving the start some more playtime
      };

      //checks if the box has an audio file attached, if the src = the below it will just skil that box
      if (audio.src === 'http://:0/') {
        resolve();
      } else {
        //if there is something in the src, then:
        //1. create a chunk of audio time representing about 1/4 of the track
        //2. create the end timepoint which is just less than the end of the last 1/4 of the track
        //3. add an event listener which resolves the promise on the track ending
        //4. add an event listener which calls the timeoutfunction once on play
        //5. plays the audio
        audioChunk = audio.duration / 4;
        audioEnd = audioChunk * 3.5;
        console.log(audioChunk, audioEnd);
        audio.addEventListener('ended', resolve);
        audio.addEventListener('play', timeOutFunction(), { once: true });
        audio.play();
      }
    });

  //a for loop which calls the gets audionpromisefunction which will scrub through each track
  //important that it awaits each function call so that tracks don't all start playing at once
  for (let i = 0; i <= 5; i++) {
    await getAudioPromise(order[i]);
  }

  console.log(`end of loop`);
};

//stopping all playback
const stopAll = () => {
  //collect up all audio tags
  let sounds = document.getElementsByTagName('audio');
  //for each audio tag, hit pause
  for (i = 0; i < sounds.length; i++) {
    sounds[i].pause();
  }
};
