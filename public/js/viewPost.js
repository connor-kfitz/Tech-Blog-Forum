var parent = document.getElementById('postContainer');

parent.addEventListener('click', event => {
    if (event.target.className == 'post') {
        displaySelectedPost(event.target.id);
        console.log(event.target.id);
    }
})

const displaySelectedPost = async (ID) => {

  console.log(ID)

  const response = await fetch('/post/' + ID, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

    if (response.ok) {
    document.location.replace('/post/'+ID);
    } else {
    alert('TEST Error');
    }
}
