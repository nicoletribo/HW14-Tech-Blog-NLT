const sendNewPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelect('#new-post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-type': 'application/json',
        }
      }),
      if (response.ok) {
        document.location.replace('/dashboard');
  
      } else {
        alert('Failed to create post.');
      }
    }
  };
  
  document.querySelector('#new-post-submit').addEventListener('click', sendNewPost);