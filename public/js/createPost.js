var newPostSubmit = document.getElementById('newPostSubmit');

const createNewPost = async (event) => {
    event.preventDefault();

    var title = document.querySelector('#title').value;
    var comment = document.querySelector('#comment').value;
    
    const response = await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify({ title, comment }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
    alert('Error creating new post');
    }
}

newPostSubmit.addEventListener('click', createNewPost);