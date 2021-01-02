const update = document.querySelector('#update-button');


update.addEventListener('click', _ => {
    fetch(`/users/2`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Newman',
            email: 'jpeterman@seinfeld.com'
        })
    })
})