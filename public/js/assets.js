document.addEventListener('DOMContentLoaded', function () {


    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
    if (user) {
        var addAssetForm = document.getElementById('addAssetForm');
        var editassetForm = document.getElementById('editassetForm');
        if (addAssetForm)
            addAssetForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const formData = new FormData(addAssetForm);
                const jsonData = {};

                for (const [key, value] of formData.entries()) {
                    jsonData[key] = value;
                }
                fetch('/assets/addform', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                }).then(response => {
                    console.log(response, 'response');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // return response.json();
                }).then(data => {
                    toastr.success('Add successful!');
                    window.location.href = '/assets/list';
                }).catch(error => {
                    console.error('Error adding asset:', error);
                });
            });
        if (editassetForm)
            editassetForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const url = window.location.href;
                const id = url.substring(url.lastIndexOf('/') + 1);
                const formData = new FormData(editAssetForm);
                const jsonData = {};

                for (const [key, value] of formData.entries()) {
                    jsonData[key] = value;
                }


                fetch(`/assets/editform/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                }).then(response => {
                    console.log(response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                    .then(data => {
                        toastr.success('asset updated successfully!');
                        window.location.href = '/assets/list';
                    })
                    .catch(error => {
                        console.error('Error updating asset:', error);
                    });
            });

    } else {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
});
function convertToLowercase(input) {
    input.value = input.value.toLowerCase();
}
function deleteAssets(assetsId) {
    if (confirm('Are you sure you want to delete this category?')) {
        fetch('/assets/delete/' + assetsId, {
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Category deleted successfully');
                    location.reload();
                } else {
                    throw new Error('Failed to delete category');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}