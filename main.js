const form = document.querySelector('form');
const posts = document.querySelector('#posts');
const input = document.querySelector('input');

// form event listener
form.addEventListener('submit', function (event) {
  event.preventDefault();
  posts.innerHTML = '';
  // console.log(input.value)
  if (input.value) {
    search(input.value);
  }
  input.value = '';
});

// fetch subreddit posts
function search (subreddit) {
fetch('https://www.reddit.com/r/' + subreddit + '.json')
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    // console.log(json.data.children);
    populatePosts(json.data.children);
  });
  form.classList.add('form--searched');
}

// populate and append subreddit posts to dom
function populatePosts (array) {
  // console.log(array);
  let data = [];
  // create an array of objects of elements to append later
  array.forEach(function (object) {
    data.push({
      data: object.data.title,
      element: 'h1'
    });

    if (object.data.url.includes('jpg')) {
      // console.log(data);
      data.push({
        data: object.data.preview.images[0].source.url,
        element: 'img'
      });
    } else {
      data.push({
        data: 'no image',
        element: 'div'
      })
    }
    // console.log(data);
    // append posts to dom
    createAndAppendElements(data, object.data.permalink);
    data = [];
  });
}

function createAndAppendElements (array, source) {
  // create wrapper for each post
  let a = document.createElement('a');
  a.href = 'https://www.reddit.com/' + source;

  // create post title and img
  array.forEach(function (object) {
    let element = document.createElement(object.element);
    if (object.element == 'img') {
      element.source = object.data;
    } else {
      element.textContent = object.data;
    }
    // append title and img to wrapper
    a.appendChild(element);
    // append wrapper to dom
    posts.appendChild(a);
  });
}