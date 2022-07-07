var newPostBtn = document.getElementById('newPostBtn');

const renderNewPost = async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/renderNewPost', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });

    if (response.ok) {
    document.location.replace('/dashboard');
    } else {
    alert('Error');
    }
}

newPostBtn.addEventListener('click', renderNewPost);