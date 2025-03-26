const form = document.forms.fileUpload
form.addEventListener('submit', onSubmit)


async function onSubmit(e) {
    e.preventDefault()
    const { fileInput, fileid } = form.elements
    console.log(fileInput.files)
    const file = fileInput.files[0]

    const { name, size, type } = file
    console.log({ name, size, type })

    const id = fileid.value

    const resp = await fetch('/cars/' + id, { method: 'POST', body: file })
    // console.log(resp.headers.get('location'))
    if (resp.status === 201) {
        console.log(await resp.json())
        form.reset()

        window.location.href = resp.url
    }

}
