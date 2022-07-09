var newCommentBtn = document.getElementById('newCommentSubmit');

const newComment = async (event) => {
  event.preventDefault();

  const comment = document.getElementById('comment').value;
  const userID = document.getElementById('data').getAttribute("data-userID");
  const postID = document.getElementById('data').getAttribute("data-postID");


  console.log(userID);

  console.log(postID);
  
  if(comment) {
    const response = await fetch('/api/users/newComment', {
            method: 'POST',
            body: JSON.stringify({ comment, userID, postID }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/post/' + postID);
        } else {
        alert('Error');
        }
  }
}

newCommentBtn.addEventListener('click', newComment);