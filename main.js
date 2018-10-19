fetch('https://www.reddit.com/r/leagueoflegends.json')
  .then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json);
    console.log(json.data.children);
    return json.data.children;
  });