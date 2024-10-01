/*
    This is the main page for the posts page. It will display all the posts that are available.
 */

// Get the post container element of the posts
const postContainer = document.querySelector('.post-container');

// calls the displayPosts function when the DOM is loaded (when the page is loaded)
document.addEventListener('DOMContentLoaded', displayPosts);



// This function will display all the posts that are available

function displayPosts() {
    if (!postContainer) {
        console.error('Post container not found');
        return;
    }
    // Use AJAX to retrieve the data (this code is from the internet)(https://www.geeksforgeeks.org/how-to-make-ajax-call-from-javascript/)
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            createPosts(data);
        } else {
            console.error('Error:', xhr.status);
        }
    };
    xhr.onerror = function () {
        console.error('Request error');
    };
    xhr.send();
}

function createPosts(data) {
    postContainer.innerHTML = ''; // Clear existing content
    let rowContainer = null;
    let postCount = 0;

    data.forEach(post => {
        if (postCount % 3 === 0) {
            // Create a new row for every 3 posts
            rowContainer = document.createElement('div');
            rowContainer.className = 'post-row';
            rowContainer.style.display = 'flex';
            rowContainer.style.justifyContent = 'space-between';
            rowContainer.style.marginBottom = '20px';
            postContainer.appendChild(rowContainer);
        }

        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.id = post.id;
        postElement.style.width = '30%';
        postElement.style.border = '1px solid #ddd';
        postElement.style.borderRadius = '8px';
        postElement.style.padding = '15px';
        postElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        postElement.style.textAlign = 'center';
        postElement.innerHTML = `
            <h2 style="font-size: 18px; margin-bottom: 10px;">${post.title}</h2>
            <p style="font-size: 14px;">${post.body}</p>
        `;
        rowContainer.appendChild(postElement);

        postCount++;
    });
}

