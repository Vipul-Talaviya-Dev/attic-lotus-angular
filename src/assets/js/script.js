$(document).ready(function() {
  var field = $('.question__question');
  //alert(field);
  $('.question__question').click(function() {
    //console.log('clicked')
    $(".question__title").addClass('question__title--inactive');
  });
  $('.question__question').blur(function() {
    $('.question__question').each(function() {
      var val = $('.question__question').val();
      $('.question__title').removeClass("question__title--inactive", val.length == 0)
      // console.log(val.length)
    })
  });

  $(".menu-icon").on("click", function() {
    $("nav ul").toggleClass("showing");
  });

  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function() {
    $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
  });

  // Toggle plus minus icon on show hide of collapse element
  $(".collapse").on('show.bs.collapse', function() {
    $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
  }).on('hide.bs.collapse', function() {
    $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
  });
});
