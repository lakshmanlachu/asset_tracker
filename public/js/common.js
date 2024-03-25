document.addEventListener('DOMContentLoaded', function () {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
    if (user) {
        var addIssue = document.getElementById('addIssue');
        var returnIssue = document.getElementById('returnIssue');
        var scrapIssue = document.getElementById('scrapIssue');
        if (addIssue)
            addIssue.addEventListener('submit', function (event) {
                event.preventDefault();

                const asset_id = document.getElementById('assetId').value;
                const employee_id = document.getElementById('employeeId').value;

                const requestBody = {
                    asset_id: asset_id,
                    employee_id: employee_id
                };
                fetch('/transaction/issue', {
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
                    window.location.href = '/home';
                }).catch(error => {
                    console.error('Error adding category:', error);
                });
            });
        if (returnIssue)
            returnIssue.addEventListener('submit', function (event) {
                event.preventDefault();

                const asset_id = document.getElementById('assetId').value;
                const employee_id = document.getElementById('employeeId').value;
                const reason = document.getElementById('reason').value;

                const requestBody = {
                    asset_id: asset_id,
                    employee_id: employee_id,
                    reason: reason,
                };
                fetch('/transaction/return', {
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
                    window.location.href = '/home';
                }).catch(error => {
                    console.error('Error adding category:', error);
                });
            });
        if (scrapIssue)
            scrapIssue.addEventListener('submit', function (event) {
                event.preventDefault();
                console.log('aaaa');

                const asset_id = document.getElementById('assetId').value;
                const reason = document.getElementById('reason').value;

                const requestBody = {
                    asset_id: asset_id,
                    reason: reason,
                };
                fetch('/transaction/scrap', {
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
                    window.location.href = '/home';
                }).catch(error => {
                    console.error('Error adding category:', error);
                });
            });
    } else {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
});