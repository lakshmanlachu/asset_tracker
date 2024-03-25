document.addEventListener('DOMContentLoaded', function () {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
    if (user) {
        var addEmployeeForm = document.getElementById('addEmployeeForm');
        var editEmployeeForm = document.getElementById('editEmployeeForm');
        if (addEmployeeForm)
            addEmployeeForm.addEventListener('submit', function (event) {
                event.preventDefault();
                console.log('ppppppppppp');
                const name = document.getElementById('name').value;
                const department = document.getElementById('department').value;
                const email = document.getElementById('email').value;

                const requestBody = {
                    name: name,
                    department: department,
                    email: email
                };

                fetch('/employee/addform', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // return response.json();
                }).then(data => {
                    toastr.success('Add successful!');
                    window.location.href = '/employee/list';
                }).catch(error => {
                    console.error('Error adding employee:', error);
                });
            });
        if (editEmployeeForm)
            editEmployeeForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const url = window.location.href;
                const id = url.substring(url.lastIndexOf('/') + 1);
                const name = document.getElementById('name').value;
                const department = document.getElementById('department').value;
                const email = document.getElementById('email').value;
                const is_active = document.getElementById('is_active').value;

                const requestBody = {
                    name: name,
                    department: department,
                    email: email,
                    is_active: is_active
                };
                console.log('aaallllalalal');
                fetch(`/employee/editform/${id}`, {
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
                        toastr.success('Employee updated successfully!');
                        window.location.href = '/employee/list';
                    })
                    .catch(error => {
                        console.error('Error updating employee:', error);
                    });
            });
    } else {
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

});
function deleteEmployee(employeeId) {
    if (confirm('Are you sure you want to delete this category?')) {
        fetch(`/employee/delete/${employeeId}`, {
            method: 'POST'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Employee deleted successfully');
                    window.location.href = '/employee/list';
                } else {
                    throw new Error('Failed to delete employee');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
function toggleEmployeeStatus(employeeId) {
    fetch(`/employee/toggle-status/${employeeId}`)
        .then(response => {
            if (response.ok) {
                console.log('Employee status toggled successfully');
                window.location.href = '/employee/list';
            } else {
                throw new Error('Failed to toggle employee status');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}