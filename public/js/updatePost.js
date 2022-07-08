var updateButton = document.getElementById('updateButton');

const updatePost = async () => {

    const updatedPost = document.getElementById('postUpdate').value;
    const postID = updateButton.getAttribute("data-postID");

    console.log(updatedPost);
    console.log(postID);
  
        const response = await fetch('/api/users/update/' + postID, {
                method: 'PUT',
                body: JSON.stringify({ updatedPost }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
            alert('Error');
            }
}

updateButton.addEventListener('click', updatePost);