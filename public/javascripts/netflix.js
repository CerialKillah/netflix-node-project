$(document).ready(function () {
  $.getJSON("/programs/fetch_all_category", function (response) {
    //alert(JSON.stringify(response.data))
    response.data.map((item) => {
      $("#categoryid").append(
        $("<option>").text(item.categoryname).val(item.categoryid)
      );
    });
  });

  $("#categoryid").change(function () {
    $.getJSON(
      "/programs/fetch_all_subcategory",
      { categoryid: $("#categoryid").val() },
      function (response) {
        //alert(JSON.stringify(response.data))
        $("#subcategoryid").empty();
        $("#subcategoryid").append($("<option>").text("Select Subcategory"));
        response.data.map((item) => {
          $("#subcategoryid").append(
            $("<option>").text(item.subcategoryname).val(item.subcategoryid)
          );
        });
      }
    );
  });

  $("#poster").change(function (event) {
    var file = URL.createObjectURL(event.target.files[0]);
    $("#posterPreview").attr("src", file);
  });

  $("#video").change(function (event) {
    var file = event.target.files[0];
    if (file) {
      var fileURL = URL.createObjectURL(file);
      $("#videoPreview").attr("src", fileURL);

      // Display file info
      var fileSize = (file.size / (1024 * 1024)).toFixed(2);
      $("#videoInfo").html(
        '<i class="fas fa-file-video me-1"></i>' +
          file.name +
          " (" +
          fileSize +
          " MB)"
      );
    }
  });

  // Reset form functionality
  $('button[type="reset"]').click(function () {
    $("#posterPreview").attr("src", "/images/default-poster.png");
    $("#videoPreview").attr("poster", "/videos/video poster.png");
    $("#videoInfo").html("");
  });
});

