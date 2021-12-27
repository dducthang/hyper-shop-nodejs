$(".pages").on("click", ".page-link", function () {
  const page = this.text;
  if (page === "...") return;
  $.ajax({
    url: "http://localhost:4000/api/users",
    type: "GET",
    data: {
      page,
      // pagelimit: 2,
    },
    dataType: "json",
    success: function (data) {
      const { users, page, lastPage } = data;
      console.log(data);
      //xử lí data gửi về
      let userList = "";
      let userBox;
      users.forEach((user) => {
        userBox = getUserBox(user);
        userList += userBox;
      });
      const pagesNumber = getPagesNumber(lastPage, page); //paging number ở dưới
      //xử lí data gửi về
      $(".user-list").html(userList);
      $(".pages").html(pagesNumber);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
function getUserBox(user) {
  return `<div class="user-box">
  <div class="user-info">
    <div class="user-email" width>
      <span>${user.email}</span>
    </div>
    <div class="user-description">${user.name}</div>
  </div>
  <div class="actions">
    <a href="/users/${user._id}">
      <button class="btn btn-default btn-sm btn-primary">
        <i class="fa fa-pencil" style="margin-right: 5px"></i>Detail
      </button>
    </a>
    <button class="btn btn-danger btn-sm">
      <i class="fas fa-times" style="margin-right: 5px"></i>Block
    </button>
  </div>
</div>
<div class="divide"></div>
`;
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
