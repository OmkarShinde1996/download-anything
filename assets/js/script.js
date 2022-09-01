const fileInput = document.querySelector('input'),
downloadButton = document.querySelector('button')


downloadButton.addEventListener('click',e => {
    e.preventDefault(); //preventing form from submitting
    downloadButton.innerText = 'Downloading file...'
    fetchFile(fileInput.value)
})

function fetchFile(url){
    //fetching file and returning response as blob
    fetch(url).then(res => res.blob()).then(file => {
        //URL.createObjectUrl creates a url of passed object
        let tempUrl = URL.createObjectURL(file)
        let aTag = document.createElement('a')
        aTag.href = tempUrl //passing temp url as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '') //passing filename as download value of <a> tag
        document.body.appendChild(aTag)//adding <a> tag inside body
        aTag.click() //clicking <a> tag to download the file
        aTag.remove() //removing <a> tag once file downloaded
        URL.revokeObjectURL(tempUrl)
        downloadButton.innerText = 'Download Now'
    }).catch(() => {
        //catch method will call if any error comes during downloading
        downloadButton.innerText = 'Download Now'
        alert('Failed to download file!')
    })
}