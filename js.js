let btnRecord = document.querySelector('button[name="btn-record"]');
let btnDownload = document.querySelector('button[name="btn-download"]');
let video = document.querySelector('#video');
btnDownload.disabled = true;
btnRecord.addEventListener('click',async()=>{
    //create media recorder
    let stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
    });
    let mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm"});
    let chunks = [];
    //handle stop event, make the Blod captured
    mediaRecorder.onstop = (e)=>{
        //cread blod
        let blod = new Blob(chunks, {'type': chunks[0].type});
        //create url(src attribute) for tag video
        let url = window.URL.createObjectURL(blod);
        video.src = url;
    }
    //handle data event, pass data(Blod) to stop event when recorder stop
    mediaRecorder.ondataavailable = (e)=>{
        chunks.push(e.data);
    }
    //handle error event
    mediaRecorder.onerror = (e)=>{
        alert(e.error);
    }
    mediaRecorder.start();
    btnDownload.disabled=false;
})
//add download event
btnDownload.addEventListener('click',()=>{
    let a = document.createElement('a');
    a.download= 'RecordVideo';
    a.href=video.src;
    a.click();
})