var n = 0;
var sorted = 0;

var griffindor = []; // 0
var slytherin = [];  // 1
var ravenclaw = [];  // 2
var hufflepuff = []; // 3

var house_pop = [0, 0, 0, 0];
var houseLeftOver = [0, 1, 2, 3];

var house_cap = 0;

document.getElementById("student-number-form").focus();

document.getElementById("student-number-form")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("student-number-button").click();
            document.getElementById("student-name-form").focus();

        }
    });

document.getElementById("student-name-form")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("student-name-button").click();
        }
    });

function setStudentNumber() {
    n = document.getElementById('student-number-form').value

    if (n <= 0 || n == '') return;

    house_cap = Math.floor(n / 4);

    document.getElementById('student_number_div').hidden = true;
    document.getElementById('number-of-student-text').innerHTML = "Number of student : " + n + " ( " + (n - sorted) + " remaining )";
    document.getElementById('number-of-student-text').hidden = false;
    document.getElementById('student_name_div').hidden = false;
}

function resetHouse() {
    house_pop = [0, 0, 0, 0];
    griffindor = [];
    slytherin = [];
    ravenclaw = [];
    hufflepuff = [];
    sorted = 0;
    houseLeftOver = [0, 1, 2, 3];

    document.getElementById('number-of-student-text').innerHTML = "Number of student : " + n + " ( " + (n - sorted) + " remaining )";
    document.getElementById('griffindor-box').innerHTML = '';
    document.getElementById('slytherin-box').innerHTML = '';
    document.getElementById('ravenclaw-box').innerHTML = '';
    document.getElementById('hufflepuff-box').innerHTML = '';
}

function sort() {
    if (sorted >= n) return;
    if (document.getElementById('student-name-form').value == '') return;
    let students = document.getElementById('student-name-form').value.split(",");
    if (students.length == 0) return;
    if (students.length > n - sorted) return;

    for (let index = 0; index < students.length; index++) {
        sortToHouse(students[index].trim());
    }

}

function sortToHouse(student) {
    if (student.length == 0) return;
    let houseToSort = [];
    for (let index = 0; index < house_pop.length; index++) {
        if (house_pop[index] < house_cap) {
            houseToSort.push(index);
        }
    }

    let house = houseToSort[Math.floor(Math.random() * houseToSort.length)];
    if (houseToSort.length == 0) {
        house = houseLeftOver[Math.floor(Math.random() * houseLeftOver.length)];
        houseLeftOver.splice(houseLeftOver.indexOf(house), 1);
    }
    house_pop[house]++;
    sorted++;
    switch (house) {
        case 0:
            griffindor.push(student);
            document.getElementById('griffindor-box').innerHTML += house_pop[0] + ') ' + student + '<br>';
            house_pop[0] > 1 ? document.getElementById('griffindor-student-count').innerHTML = house_pop[0] + ' students' : document.getElementById('griffindor-student-count').innerHTML = house_pop[0] + ' student';
            document.getElementById('griffindor-box').scrollTo(0, document.getElementById('griffindor-box').scrollHeight);
            break;
        case 1:
            slytherin.push(student)
            document.getElementById('slytherin-box').innerHTML += house_pop[1] + ') ' + student + '<br>';
            house_pop[1] > 1 ? document.getElementById('slytherin-student-count').innerHTML = house_pop[1] + ' students' : document.getElementById('slytherin-student-count').innerHTML = house_pop[1] + ' student';
            document.getElementById('slytherin-box').scrollTo(0, document.getElementById('slytherin-box').scrollHeight);
            break;
        case 2:
            ravenclaw.push(student)
            document.getElementById('ravenclaw-box').innerHTML += house_pop[2] + ') ' + student + '<br>';
            house_pop[2] > 1 ? document.getElementById('ravenclaw-student-count').innerHTML = house_pop[2] + ' students' : document.getElementById('ravenclaw-student-count').innerHTML = house_pop[2] + ' student';
            document.getElementById('ravenclaw-box').scrollTo(0, document.getElementById('ravenclaw-box').scrollHeight);
            break;
        case 3:
            hufflepuff.push(student)
            document.getElementById('hufflepuff-box').innerHTML += house_pop[3] + ') ' + student + '<br>';
            house_pop[3] > 1 ? document.getElementById('hufflepuff-student-count').innerHTML = house_pop[3] + ' students' : document.getElementById('hufflepuff-student-count').innerHTML = house_pop[3] + ' student';
            document.getElementById('hufflepuff-box').scrollTo(0, document.getElementById('hufflepuff-box').scrollHeight);
            break;
        default:
            break;
    }

    document.getElementById('number-of-student-text').innerHTML = "Number of student : " + n + " ( " + (n - sorted) + " remaining )";
    document.getElementById('student-name-form').value = '';

}
