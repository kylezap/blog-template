const pathSegments = window.location.pathname.split('/');
const postId = pathSegments[pathSegments.length - 1];

const newCommentHandler = async (event) => {
  event.preventDefault();
  const content = document.getElementById('comment-textarea').value;
  console.log(content, postId);

  const response = await fetch(`/api/blog/${postId}/comment`, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    document.location.replace('/blog/' + postId);
  } else {
    console.error(`Error: ${response.status}`);
  }
};

const populateComments = async () => {
  const response = await fetch(`/api/blog/${postId}/comment`);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const commentContainer = document.getElementById('comment-container');
    data.comments.forEach((comment) => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.innerHTML = `
        <div class="comment-content">
          ${comment.content}
        </div>
        <div class="comment-author">
          - ${comment.user.username}
        </div>
      `;
      commentContainer.appendChild(commentDiv);
    });
  } else {
    console.error(`Error: ${response.status}`);
  }

}

document
  .getElementById('comment-form')
  .addEventListener('submit', newCommentHandler);

  // populateComments();