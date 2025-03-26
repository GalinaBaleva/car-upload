const form = document.forms.fileUpload
form.addEventListener('submit', onSubmit)


async function onSubmit(e) {
    e.preventDefault()
    const { fileInput, fileid } = form.elements

    const file = fileInput.files[0]

    const id = fileid.value

    const resp = await fetch('/cars/' + id, { method: 'POST', body: file })
    // console.log(resp.headers.get('location'))
    if (resp.status === 200) {
        const carId = await resp.json()
        form.reset()
        
        window.location.href = `/cars/${carId}`
    }

}
