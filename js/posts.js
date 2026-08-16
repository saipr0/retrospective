export async function fetchPosts() {
  return fetch('js/data/posts.json', { cache: 'no-cache' }).then(response => {
      if (!response.ok) {
        throw new Error(`Unable to load posts (${response.status})`);
      }

      return response.json();
  });
}
