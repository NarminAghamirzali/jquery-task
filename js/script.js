$(function(){
    $(document).ajaxStart(function(){
    $('#wait').css('display', 'block');
  });
  $(document).ajaxComplete(function(){
    $('#wait').css('display', 'none');
  });
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts`,
    success: function(posts){
      $.ajax({
        url: `https://jsonplaceholder.typicode.com/comments`,
        success: function(comments){
          for(let i=0; i<5; i++){
            let filteredComments = comments.filter((comment)=> comment.postId === posts[i].id);
            $('#table-body').append(`<tr>
            <td>${posts[i].id}</td>
            <td>${posts[i].title}</td>
            <td maxLength="30">${posts[i].body}</td>
            <td class="wait">
            <p>${filteredComments[0].body}</p><p>${filteredComments[1].body}</p><p>${filteredComments[2].body}</p>
            </td>        
          </tr>`)
          }
          $('tr td:nth-child(3)').addClass('content');
        }
      });
    }
  });

});