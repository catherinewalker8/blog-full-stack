let token = localStorage.getItem("authToken");

function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert(data.errors[0].message);
      } else {
        alert("User registered successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  fetch("http://localhost:3001/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Save the token in the local storage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        token = data.token;

        alert("User Logged In successfully");

        fetchCategories();

        // Fetch the posts list
        fetchPosts();

        // Hide the auth container and show the app container as we're now logged in
        document.getElementById("auth-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function logout() {
  fetch("http://localhost:3001/api/users/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  }).then(() => {
    // Clear the token from the local storage as we're now logged out
    localStorage.removeItem("authToken");
    token = null;
    document.getElementById("auth-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
  });
}

function fetchCategories() {
    fetch("http://localhost:3001/api/categories")
    .then(res => res.json())
    .then(categories => {
        const filterSelect = document.getElementById("category-filter");
        const postSelect = document.getElementById("post-category");
        
        filterSelect.innerHTML = '<option value="">All</option>';
        postSelect.innerHTML = '<option value="">Select Category</option>';

        categories.forEach(cat =>{
            const filterOption = document.createElement("option");
            filterOption.value = cat.id;
            filterOption.textContent = cat.category_name;
            filterSelect.appendChild(filterOption);

            const postOption = document.createElement("option");
            postOption.value = cat.id;
            postOption.textContent = cat.category_name;
            postSelect.appendChild(postOption);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchPosts() {
  let url = "/api/posts";
  const categoryId = document.getElementById("category-filter").value;
  if (categoryId) url += `?categoryId=${categoryId}`;

  fetch(url, { method: "GET", headers: { Authorization: `Bearer ${token}` } })
    .then(res => res.json())
    .then(posts => {
      const postsContainer = document.getElementById("posts");
      postsContainer.innerHTML = "";
      posts.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <small>By: ${post.postedBy} on ${new Date(post.createdOn).toLocaleString()}</small>
          <p>Category: ${post.category ? post.category.category_name : 'N/A'}</p>
        `;
        postsContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.log("Error fetching posts:", error);
      alert("Failed to load posts");
    });
}

function createPost() {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  const categoryId = document.getElementById("post-category").value;

 if (!title || !content || !categoryName) {
    alert("Please fill in title, content, and category.");
    return;
  }

  fetch("http://localhost:3001/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, categoryId}),
  })
    .then((res) => res.json())
    .then(() => {
        alert("Post created successfully");
        document.getElementById("post-title").value = "";
        document.getElementById("post-content").value = "";
        document.getElementById("post-category").value = "";
      fetchPosts();
    });
}