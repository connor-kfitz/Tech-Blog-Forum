var deleteButton = document.getElementById('deleteButton');

const deletePost = async () => {

    const postID = deleteButton.getAttribute("data-postID");
    const userID = deleteButton.getAttribute("data-userID");
    console.log(postID);
    console.log(userID);
  
        const response = await fetch('/api/users/delete/' + postID, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            // document.location.replace('/dashboard/post/' + userID);
            } else {
            alert('Error');
            }
}

deleteButton.addEventListener('click', deletePost);