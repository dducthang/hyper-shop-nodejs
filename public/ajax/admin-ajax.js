$(".pages").on("click", ".page-link", function () {
  const page = this.text;
  if (page === "...") return;
  $.ajax({
    url: "http://localhost:4000/api/users",
    type: "GET",
    data: {
      page,
      isAdmin: 1,
      // pagelimit: 2,
    },
    dataType: "json",
    success: function (data) {
      const { users, page, lastPage } = data;
      console.log(data);
      //xử lí data gửi về
      let userList = "";
      let userBox;
      let i = 1;
      users.forEach((user) => {
        userBox = getUserBox(user, i++);
        userList += userBox;
      });
      const pagesNumber = getPagesNumber(lastPage, page); //paging number ở dưới
      //xử lí data gửi về
      $("table tbody").html(userList);
      $(".pages").html(pagesNumber);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
function getUserBox(user, number) {
  return `<tr>
          <th scope="row">${number}</th>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
          ${
            !user.isLock
              ? `<button id="${user._id}" class="btn btn-danger btn-sm AcctionOnUserBtn">Block</button>`
              : `<button id="${user._id}" class="btn btn-success btn-sm AcctionOnUserBtn">Unblock</button>`
          }
        
            </td>      
          <td>
        <a class="btn btn-primary" href="/users/${user._id}">
            Details
        </a>
            </td>
        </tr>
        <% } %>
        
        <script>
        for (let btn of document.getElementsByClassName("AcctionOnUserBtn")) {
          btn.addEventListener("click", ActionOnUserHandler);
        }
        </script>
        `;
}

//khóa mở người dùng
for (let btn of document.getElementsByClassName("AcctionOnUserBtn")) {
  btn.addEventListener("click", ActionOnUserHandler);
}
function ActionOnUserHandler(e) {
  e.preventDefault();

  //đổi trạng thái nút block hoặc unblock
  $(this).text() === "Block" ? $(this).text("Unblock") : $(this).text("Block");
  $.ajax({
    url: "http://localhost:4000/api/users",
    type: "POST",
    data: {
      userId: $(this).attr("id"),
    },
    dataType: "json",
    success: function (data) {
      console.log(data.msg);
    },
    error: function (error) {
      console.log(error);
    },
  });
}
function getPagesNumber(lastPage, page) {
  let res = `
        <nav
          aria-label="Page navigation example"
          class="d-flex justify-content-center"
        >`;
  if (lastPage > 0) {
    res += `<ul class="pagination"><li class="page-item custom-hover"><a class="page-link">First</a></li>`;
    let i = Number(page) > 5 ? Number(page) - 4 : 1;
    if (i !== 1) {
      res += `<li class="page-item custom-hover"><a class="page-link">...</a></li>`;
    }
    for (; i <= Number(page) + 4 && i <= lastPage; i++) {
      if (i == page) {
        res += `<li class="page-item custom-hover active"><a class="page-link">${i}</a></li>`;
      } else {
        res += `<li class="page-item custom-hover"><a class="page-link">${i}</a></li>`;
      }
      if (i == Number(page) + 4 && i < lastPage) {
        res += `<li class="page-item custom-hover"><a class="page-link">...</a></li>`;
      }
    }
    res += `<li class="page-item custom-hover">
          <a class="page-link">Last</a>
        </li>`;
    res += `</ul>`;
  }

  res += `</nav>`;
  return res;
}
