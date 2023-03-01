var n = 0;
var sorted = 0;

const houses = ['griffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];

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

    houses.forEach(house => {
        document.getElementById(house + '-box').innerHTML = '';
        document.getElementById(house + '-student-count').innerHTML = '0 student';
    });
}

async function sort() {
    if (sorted >= n) return;
    if (document.getElementById('student-name-form').value == '') return;
    let students = document.getElementById('student-name-form').value.split(",");
    if (students.length == 0) return;
    if (students.length > n - sorted) return;

    document.getElementById('student-name-form').disabled = true;
    for (let index = 0; index < students.length; index++) {
        sortToHouse(students[index].trim());
        await new Promise(r => setTimeout(r, 250));
        if (sorted == 0) {
            document.getElementById('student-name-form').disabled = false;
            break;
        }
    }
    document.getElementById('student-name-form').disabled = false;

}

function playAnimation(element) {
    element.classList.add("blink");
    setTimeout(function () {
        element.classList.remove("blink");
    }, 200);
}

function playEffect(element) {
    element.hidden = false;
    setTimeout(function () {
        element.hidden = true;
    }, 1000);

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
            break;
        case 1:
            slytherin.push(student)
            break;
        case 2:
            ravenclaw.push(student)
            break;
        case 3:
            hufflepuff.push(student)
            break;
        default:
            break;
    }
    document.getElementById(houses[house] + '-box').innerHTML += house_pop[house] + ') ' + student + '<br>';
    house_pop[house] > 1 ? document.getElementById(houses[house] + '-student-count').innerHTML = house_pop[house] + ' students' : document.getElementById(houses[house] + '-student-count').innerHTML = house_pop[house] + ' student';
    document.getElementById(houses[house] + '-box').scrollTo(0, document.getElementById(houses[house] + '-box').scrollHeight);
    playEffect(document.getElementById(houses[house] + '-effect'));
    playAnimation(document.getElementById(houses[house] + '-div'));

    document.getElementById('number-of-student-text').innerHTML = "Number of student : " + n + " ( " + (n - sorted) + " remaining )";
    document.getElementById('student-name-form').value = '';

}
