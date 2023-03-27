document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.querySelector('#github-form');
    const searchBox = document.querySelector('#search');
    const userList = document.querySelector('#user-list')
    const reposList = document.querySelector('#repos-list')

    const getUsersRepos = async e => {
      // if (e.target)
      const user = e.target.parentElement;
      const username = user.querySelector('.username').textContent;
      const url = `https://api.github.com/users/${username}/repos`
      const data = await (await fetch(url)).json();
      console.log(data);
      data.forEach((repo) => {
        const {name, url, description} = repo;
        const li = document.createElement('li');
        li.classList.add("repo");
        const html = `
          <h3 class="repo-name">${name}</h3>
          <p class="description">${description}</p>
          <a href="${url}" class="github-url"><i class="fa fa-github" style="font-size:24px"></i></a>
        `
        li.innerHTML = html;
        reposList.appendChild(li);
      })
    }

    const displayUsers = data => {
      console.log(data);
      data.items.forEach(user => {
        const {
          login: username, 
          html_url: githubLink, 
          avatar_url: avatar
        } = user;
        console.log(username, githubLink, avatar);
        const li = document.createElement('li');
        li.classList.add("user");
        const html = `
          <img src="${avatar}" alt="" class="avatar">
          <h2 class="username">${username}</h2>
          <a href="${githubLink}" class="github-link"><i class="fa fa-github" style="font-size:48px;color:red"></i></a>
        `
        li.innerHTML = html;
        userList.appendChild(li);
      })

    }

    const searchGithubUsers = async e => {
      e.preventDefault();
      const user = searchBox.value;
      const url = `https://api.github.com/search/users?q=${user}`
      const data = await (await fetch(url)).json();
      displayUsers(data);
    };

    githubForm.addEventListener('submit', searchGithubUsers)
    userList.addEventListener('click', getUsersRepos)


  })