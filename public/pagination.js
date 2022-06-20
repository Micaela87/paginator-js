const pageDataDiv = document.getElementById('page-data');
const pagesDiv = document.getElementById('pages');

const getAllUsers = async() => {

    try {

        let response = await fetch('http://localhost:3000/users');

        if (response.ok) {

            let responseToJson = await response.json();
            
            if (responseToJson.data.length) {

                let dataLength = responseToJson.data.length;
                let limit = 10;
                let ulElement = document.createElement('ul');
                let page = 0;

                for (let i = 0; i < dataLength; i += limit) {

                    page++;

                    let liElement = document.createElement('li');
                    liElement.setAttribute('data-page', page);
                    liElement.innerHTML = page;
                    ulElement.appendChild(liElement);

                    liElement.addEventListener('click', async function() {

                        let pageNumber = liElement.getAttribute('data-page');

                        try {

                            let response = await fetch('http://localhost:3000/users/' + pageNumber + '/' + limit);

                            if (response.ok) {
                                console.log(await response.json());
                            }

                        } catch(err) {
                            console.log(err);
                        }

                    });

                }

                pagesDiv.appendChild(ulElement);

            }
            
        }

    } catch(err) {
        console.log(err);
    }
}

getAllUsers();