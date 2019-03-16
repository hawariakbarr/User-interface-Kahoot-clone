// // request get data
// var kahoot = new XMLHttpRequest();
// kahoot.open("GET", "http://127.0.0.1:5000/get-all-users", true)
// kahoot.send()
// kahoot.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status < 400) {
//         var username = JSON.parse(this.response)

//         console.table(username)

//         for (var i = 0; i < username.length; i++) {
//             username[i]
//             // var node = document.createElement('li')
//             // var textnode = document.createTextNode(username[i].username)
//             // node.appendChild(textnode)
//             // node.classList.add("nav-item")
//             // document.getElementById('user-list').appendChild(node)

//             $('#user-list').append('<li>' + username[i].username + '</li>')
//         }
//     }
// }

// jquery ajax  ====== xml http request
$.ajax({
    url: "http://127.0.0.1:5000/get-all-users",
    method: "GET",
    // ini untuk sesuatu yg membutuhkan data dari depan, biasanya post, tapi get juga kadang perlu. bisa 
    // data: []
    success: function (username) {
        for (var i = 0; i < username.length; i++) {
            console.table(username)
            $('#user-list').append('<li>' + username[i].username + '</li>')
        }
    },
    error: function (error) {
        //error handling
    },
    complete: function () {

    }
})

function login() {
    //vanila js
    var username = document.getElementById('username-form').value
    var password = document.getElementById('password-form').value

    //jquery
    // var username = $('input#username-form').val()
    // var password = $('input#password-form').val()

    $.ajax({
        url: 'http://127.0.0.1:5000/login-user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),

        success: function (response) {
            alert(response['message'])
            window.location.href = 'quizlist.html'
        },
        error: function (error) {
            alert("User or password is not found")
        },
        complete: function () {

        }
    })
}


$.ajax({
    url: "http://127.0.0.1:5000/get-all-quiz",
    method: "GET",
    // ini untuk sesuatu yg membutuhkan data dari depan, biasanya post, tapi get juga kadang perlu. bisa 
    // data: []
    success: function (result) {
        for (var i = 0; i < result.length; i++) {
            var cards =
                `
                

                
                <div class="col-4 mb-2 ">
                    <div class="card text-white bg-dark text" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${result[i].quiz_name}</h5>
                            <p class="card-text">${result[i].quiz_description}</p>
                            <a href="#" class="btn btn-primary"></a>
                        </div>
                    </div>
                </div>
                
            `
            $('#quiz-name').append(cards)
            // console.log(quiz);


        }
    },
    error: function (error) {
        //error handling
    },
    complete: function () {

    }
})