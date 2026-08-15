let postsPromise;

export function fetchPosts() {
  if (!postsPromise) {
    postsPromise = fetch('js/data/posts.json').then(response => {
      if (!response.ok) {
        throw new Error(`Unable to load posts (${response.status})`);
      }

      return response.json();
    });
  }

  return postsPromise;
}
