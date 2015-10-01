$(document).ready(function() {
  var descriptions = ["A Calm Forest", "A Rocky Canyon", "A Green Garden", "A Purple Sunset", "A Cool Valley", "A Fresh Spring"];
  $('#description p').text(descriptions[0]);
  function interval() {
    var regexp = /\d/;
    var currentIndex = regexp.exec($('#mainImage').css('background-image').substr(-12, 11))[0];
    transition(currentIndex, Math.max((++currentIndex % 7), 1));
  }
  var myInterval = setInterval(function() {
    interval();
  }, 3000);
  function sliderResponse(oldIndex, newIndex, direction) {
    var t = $('.fullScreen')[0];
    var newElement = $('<div id="clone" class="fullScreen"> </div>').css('background-image', 'url(assets/image_' + oldIndex + '.jpg)');
    $('#mainImage').after(newElement);
    $('#mainImage').css('background-image', 'url(assets/image_' + newIndex + '.jpg)');
    if (direction == "left") {
      $('#mainImage').css("right", "-" + $('#mainImage').width() + "px");
      $(newElement).stop(true,false).animate({'left':'-'+ $('#mainImage').width() +'px'},500, function() {
        $(this).remove();
      });
      $('#mainImage').stop(true,false).animate({'right':'-0px'},500);
    }
    else {
      $('#mainImage').css("left", "-" + $('#mainImage').width() + "px");
      $(newElement).stop(true,false).animate({'left':$('#mainImage').width() +'px'},500, function() {
        $(this).remove();
      });
      $('#mainImage').stop(true,false).animate({'left':'-0px'},500);
    }
    switchActivity(oldIndex, newIndex);
  }
  var activeComponent = $(".active");
  $('button').click(function() {
    var regexp = /\d/;
    var currentIndex = regexp.exec($('#mainImage').css('background-image').substr(-12, 11))[0];
    var newIndex = $(this).text();
    if (currentIndex != newIndex) {
      switchActivity(currentIndex, newIndex);
      clearInterval(myInterval);
      sliderResponse(currentIndex, newIndex, currentIndex < newIndex ? "right" : "left");
      myInterval = setInterval(function() {
        interval();
      }, 3000);
      //transition(currentIndex, newIndex);
    }
  });
  $('div input').click(function() {
    var regexp = /\d/;
    var currentIndex = regexp.exec($('#mainImage').css('background-image').substr(-12, 11))[0];
    var direction = $(this).parent().attr('id').split('-')[1];
    clearInterval(myInterval);
    if (direction == "forward") {
      sliderResponse(currentIndex, Math.max((++currentIndex % 7), 1), "right")
    }
    else if (direction == "back") {
      sliderResponse(currentIndex, (--currentIndex == 0 ? 6 : currentIndex), "left");
    }
    myInterval = setInterval(function() {
      interval();
    }, 3000);
  });
  function transition(oldIndex, newIndex) {
    switchActivity(oldIndex, newIndex);
    var newElement = $('<div id="clone" class="fullScreen"> </div>').css('background-image', 'url(assets/image_' + oldIndex + '.jpg)');
    $('#mainImage').css('background-image', 'url(assets/image_' + newIndex + '.jpg)');
    $('#mainImage').append(newElement);
    $('#clone').fadeOut(500, function() {
      $(this).remove();
    });
  };
  function switchActivity(oldIndex, newIndex) {
    $('#description p').text(descriptions[newIndex - 1]);
    var currentImage = $('button')[oldIndex - 1];
    $(currentImage).removeClass('active');
    var newImage = $('button')[newIndex - 1];
    $(newImage).addClass('active');
  }
});
