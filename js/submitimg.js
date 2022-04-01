const formElem = document.querySelector("#formElem");
formElem.onsubmit = async (e) => {
    e.preventDefault();
    let res = await fetch('/post', {
        method: 'POST',
        body: new FormData(formElem)
    });
    console.log(await res.text());
};