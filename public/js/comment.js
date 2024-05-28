const content = document.getElementById('comment-textarea').value.trim();
  const pathSegments = window.location.pathname.split('/');
  const postId = pathSegments[pathSegments.length - 1];

  
  
  const newCommentHandler = async (event) => {
  event.preventDefault();

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
  } else {
    console.error(`Error: ${response.status}`);
  }
};

document
  .getElementById('comment-form')
  .addEventListener('submit', newCommentHandler);
