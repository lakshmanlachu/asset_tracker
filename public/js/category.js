document.addEventListener('DOMContentLoaded', function () {
   
    var addCategoryForm = document.getElementById('addCategoryForm');
    var editCategoryForm = document.getElementById('editCategoryForm');
    if (addCategoryForm)
        addCategoryForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;

            const requestBody = {
                name: name,
                description: description,
            };

            fetch('/category/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }).then(response => {
                console.log(response, 'response');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // return response.json();
            }).then(data => {
                toastr.success('Add successful!');
                window.location.href = '/category/list';
            }).catch(error => {
                console.error('Error adding category:', error);
            });
        });
    if (editCategoryForm)
        editCategoryForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const url = window.location.href;
            const id = url.substring(url.lastIndexOf('/') + 1);
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;

            const requestBody = {
                name: name,
                description: description,
            };

            fetch(`/category/editform/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }).then(response => {
                console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
                .then(data => {
                    toastr.success('category updated successfully!');
                    window.location.href = '/category/list';
                })
                .catch(error => {
                    console.error('Error updating category:', error);
                });
        });

});