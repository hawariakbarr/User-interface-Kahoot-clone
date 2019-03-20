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
    success: function (full_name) {
        for (var i = 0; i < full_name.length; i++) {
            // console.table(username)
            $('#user-list').append('<li>' + full_name[i].full_name + '</li>')
        }
    },
    error: function (error) {
        //error handling
    },
    complete: function () {

    }
})

function signUp() {
    //vanila js
    var username = document.getElementById('register-username').value
    var fullname = document.getElementById('register-fullname').value
    var password = document.getElementById('register-password').value
    var email = document.getElementById('register-email').value

    //jquery
    // var username = $('input#register-username').val()
    // var email = $('input#register-email').val()
    // var password = $('input#register-password').val()

    $.ajax({
        url: 'http://127.0.0.1:5000/register-user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            full_name: fullname,
            password: password,
            email: email
        }),

        success: function (response) {
            alert(response['message'])
            window.location.href = 'index.html'
        },
        error: function (error) {
            alert("Registration failed, username or email has been used")
        },
        complete: function () {

        }
    })
}

function signIn() {
    //vanila js
    // var username = document.getElementById('username-form').value
    // var password = document.getElementById('password-form').value

    //jquery
    var username = $('input#username-form').val()
    var password = $('input#password-form').val()

    $.ajax({
        url: 'http://127.0.0.1:5000/login-user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password
        }),

        success: function (response) {
            alert(response['message']) //200
            window.location.href = 'quizlist.html'


        },
        error: function (error) {
            alert("User or password is not found") //400
        },
        complete: function () {

        }
    })
}

function quiz_created() {
    //vanila js
    // var username = document.getElementById('username-form').value
    // var password = document.getElementById('password-form').value

    //jquery
    var userId = $('input#quiz-user').val()
    var quizCategory = $('input#quiz-category').val()
    var quizName = $('input#quiz-name').val()
    var quizDescription = $('input#quiz-description').val()

    $.ajax({
        url: 'http://127.0.0.1:5000/create-quiz',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            user_id: userId,
            quiz_category: quizCategory,
            quiz_name: quizName,
            quiz_desc: quizDescription
        }),

        success: function (response) {
            alert(response['message']) //200
            window.location.href = 'createquestion.html'


        },
        error: function (error) {
            alert("error") //400
        },
        complete: function () {

        }
    })
}


function add_question() {
    //vanila js
    // var username = document.getElementById('username-form').value
    // var password = document.getElementById('password-form').value

    //jquery
    var quizId = $('input#quiz-id').val()
    var questionId = $('input#question-id').val()
    var theQuestion = $('input#the-question').val()
    var opA = $('input#op-a').val()
    var opB = $('input#op-b').val()
    var opC = $('input#op-c').val()
    var opD = $('input#op-d').val()
    var corAnswer = $('input#cor-answer').val()

    $.ajax({
        url: 'http://127.0.0.1:5000/create-question',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            quiz_id: quizId,
            question_id: questionId,
            the_question: theQuestion,
            A: opA,
            B: opB,
            C: opC,
            D: opD,
            correct_answer:corAnswer
        }),

        success: function (response) {
            alert(response['message']) //200
            window.location.href = 'questionlist.html'


        },
        error: function (error) {
            alert("eror") //400
        },
        complete: function () {

        }
    })
}

$.ajax({
    url: "http://127.0.0.1:5000/get-all-quiz",
    method: "GET",
    // authorization: 'application/json',
    // ini untuk sesuatu yg membutuhkan data dari depan, biasanya post, tapi get juga kadang perlu. bisa 
    // data: []
    success: function (result) {
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
            var cards = `            
            <div class="card border-dark mb-3" style="max-width: 18rem; margin:20px" >
                <div class="card-header bg-dark border-white text-white">Category: ${result[i].quiz_category}</div> 
                <div  class="card-header bg-dark border-white text-white"><span style="padding-left: 0px">Creator: ${result[i].creator_quiz}</span></div>
                <div class="card-body text-white bg-dark">
                    <h5 class="card-title">${result[i].quiz_name}</h5>
                    <p class="card-text">${result[i].quiz_description}</p>
                    
                </div>
                <div class="card-footer bg-dark border-white text-white">
                <p class="card-text">Questions: ${result[i].question_list.length}</p>
                </div>
            </div>
            `;
            $('#quiz-name').append(cards)
            
        }
    },
    error: function (error) {
        //error handling
    },
    complete: function () {

    }
})

$.ajax({
    url: "http://127.0.0.1:5000/get-all-question",
    method: "GET",
    // authorization: 'application/json',
    // ini untuk sesuatu yg membutuhkan data dari depan, biasanya post, tapi get juga kadang perlu. bisa 
    // data: []
    success: function (result) {
        for (var i = 0; i < result.length; i++) {
            var questionList = `            
            <li class="list-group-item">${result[i].question}</li>
            `;
            $('#quest-list').append(questionList)
            // console.log(result[i]);
        }
    },
    error: function (error) {
        //error handling
    },
    complete: function () {

    }
})

// function questionById()
// var questionId = $('input#get-question-id').val()


// $.ajax({
//     url: "http://127.0.0.1:5000/get-question" +"/"+questionId,
//     method: "GET",
//     // authorization: 'application/json',
//     // ini untuk sesuatu yg membutuhkan data dari depan, biasanya post, tapi get juga kadang perlu. bisa 
//     // data: []
//     success: function (result) {
//         for (var i = 0; i < result.length; i++) {
//             var questionList = `            
//             <li class="list-group-item">${result[i].question}</li>
//             `;
//             $('#quest-list').append(questionList)
//             // console.log(result[i]);
//         }
//     },
//     error: function (error) {
//         //error handling
//     },
//     complete: function () {

//     }
// })
