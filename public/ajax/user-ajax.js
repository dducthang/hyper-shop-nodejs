$(function () {
  $.ajax({
    url: "http://localhost:4000/api/users",
    type: "GET",
    data: {
      page: 2,
      pagelimit: 2,
    },
    dataType: "json",
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.log(error);
    },
  });
});
