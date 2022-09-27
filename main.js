var courseName = document.getElementById("CourseName");
var courseCategory = document.getElementById("CourseCategory");
var coursePrice = document.getElementById("CoursePrice");
var courseDescription = document.getElementById("CourseDescription");
var addbtn = document.getElementById("click");
//where to output data
var data = document.getElementById("data");
var currentId;
//array of objects
var courses;
if (localStorage.getItem("coursesList") == null) {
  courses = [];
} else {
  courses = JSON.parse(localStorage.getItem("coursesList"));
  displayData();
}

addbtn.onclick = function () {
  if (addbtn.innerHTML == 'Add Course') {
    addCourse();
  } else {
    updateCourse();
    addbtn.innerHTML = 'Add Course'
  }

  displayData();
  clear();
};

function addCourse() {
  var course = {
    name: courseName.value,
    cat: courseCategory.value,
    price: coursePrice.value,
    desc: courseDescription.value,
  };

  courses.push(course);
  // to transfer array of object to string
  localStorage.setItem("coursesList", JSON.stringify(courses));
}

function displayData() {
  var result = " ";
  for (var i = 0; i < courses.length; i++) {
    result += `<tr>
      <td>${i}</td>
      <td>${courses[i].name}</td>
      <td>${courses[i].cat}</td>
      <td>${courses[i].price}</td>
      <td>${courses[i].desc}</td>
      <td> <button onclick="getCourseData(${i})" class="btn btn-outline-info">update</button>
            <button onclick="deleteCourse(${i})" class="btn btn-outline-danger">delete</button>
      </td>
      </tr>
      `;
    data.innerHTML = result;
  }
}
function clear() {
  courseName.value = "";
  courseCategory.value = "";
  coursePrice.value = "";
  courseDescription.value = "";
}

function deleteCourse(id) {
  courses.splice(id, 1);
  localStorage.setItem("coursesList", JSON.stringify(courses));
  displayData();
}

//deleteall
deleteBtn.onclick = function () {
  localStorage.removeItem("coursesList");
  course = [];
  data.innerHTML = " ";
};

//onkeyup
//onkeydown

//onkeypress // ما بتشتغل ع كل ازرار الكيبورد

function search(e) {
  var result = " ";
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].name.toLowerCase().includes(e.toLowerCase())) {
      console.log(courses[i]);
      result += `<tr>
    <td>${i}</td>
    <td>${courses[i].name}</td>
    <td>${courses[i].cat}</td>
    <td>${courses[i].price}</td>
    <td>${courses[i].desc}</td>
    <td> <button class="btn btn-outline-info">update</button>
          <button onclick="deleteCourse(${i})"class="btn btn-outline-danger">delete</button>
    </td>
    </tr>
    `;
      data.innerHTML = result;
    }
  }
}

function getCourseData(id) {
  var course = courses[id];
  courseName.value = course.name;
  courseCategory.value = course.cat;
  coursePrice.value = course.price;
  courseDescription.value = course.desc;
  addbtn.innerHTML = "Update Course";
  currentId = id;
}

function updateCourse() {
  var course = {
    name: courseName.value,
    cat: courseCategory.value,
    price: coursePrice.value,
    desc: courseDescription.value,
  };
  courses[currentId].name=course.name;
  courses[currentId].cat=course.cat;
  courses[currentId].price=course.price;
  courses[currentId].desc=course.desc;
  localStorage.setItem("coursesList", JSON.stringify(courses));
}
