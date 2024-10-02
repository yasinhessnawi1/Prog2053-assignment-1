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

/*
    This function will create the posts and display them in the post container.
    It will create a new row for every 3 posts.

    @param {array} data - The data to display in the posts.
*/
function createPosts(data) {
    let rowContainer = null; // This is the container for the posts
    let postCount = 0; // This is the count of the posts

    // Loop through the data and create the posts
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
        // create the post element
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.id = post.id;
        // styling the post element (I could have done this with css but this is a quick solution and i wanted to try something new)
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
        // append the post element to the row container
        rowContainer.appendChild(postElement);
        // increment the post count
        postCount++;
    });

    // add event listener for user reach the bottom of the page
    const scrollListener = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            displayPosts();
            removeEventListener('scroll', scrollListener);
        }
    };
    // add the event listener for the scroll listener
    window.addEventListener('scroll', scrollListener);
}

