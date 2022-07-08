var parent = document.getElementById('postContainer');

parent.addEventListener('click', event => {
    if (event.target.className == 'post') {
        displaySelectedPost(event.target.id);
        console.log(event.target.id);
    }
})

const displaySelectedPost = async (ID) => {

    console.log('ASDASD');
    console.log(ID);
  const response = await fetch('/api/users/loadSinglePost', {
        method: 'POST',
        body: JSON.stringify({ ID }),
        headers: { 'Content-Type': 'application/json' },
      });

    if (response.ok) {
    document.location.replace('/');
    } else {
    alert('Error');
    }
}



// selectPost.addEventListener('click', displaySelectedPost);