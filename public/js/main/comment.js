function handler(event) {
  var target = $(event.target);
  if(target.is("span") || target.is("img")) {
    var getId = target.parent().attr("class");
    var reqId = getId.split(" ")[1];
    let count = 0;
    var fn = function(result) {
      if(result.noComment) {
          $('.modal-title').text("현재 댓글이 존재하지 않습니다 ㅠ__ㅠ");
          $('.modal-body').append(`
            <div class="comment-wrap">
              <div class="comment-img">
                <img src="/public/images/kakaofriends/4.jpg" width="58px" height="50px" alt="">
              </div>
              <div class="comment-text">
                <span class="in-block comment-name">첫 댓글을 달아주세요!</span>
              </div>
            </div>
          `)
          return;
      }
      $('.modal-title').text("더 자세히 보려면 링크를 클릭하세요!");
      // $('.comment-link').on('click', function() {
      //   window.location.href = ''
      // });
      let length = result.length;
      for(let i=0; i<length-1; i++) {
          let imageNum = Math.floor((Math.random() * 13) + 1);
          $('.modal-body').append(`
            <div class="comment-wrap">
              <div class="comment-img">
                <img src="/public/images/kakaofriends/${imageNum}.jpg" width="58px" height="50px" alt="">
              </div>
              <div class="comment-text">
                <span class="in-block comment-name">${result[i].name}</span>
                <span class="in-block comment-msg">${result[i].message.replace(/\n/g, '<br>')}</span>
                <span class="in-block comment-time">${moment(result[i].created_time).format('LLL')}</span>
              </div>
            </div>
          `);
      }
      //이전 댓글 보기
      if(result[length-1].morecomment) {
        $('.modal-body').append(`<div class="comment-update-wrap">
            <div class="comment-update-img">
              <img class="update-icon" src="/public/images/update.jpg" width="38px" height="38px" alt="">
            </div>
            <div class="comment-update-left">
              <h5 class="comment-update-text">이전 댓글</h5>
            </div>
          </div>`);

        $('.comment-update-wrap').on('click', function(e) {
          $('.update-icon').css('display', 'none');
          $('.comment-update-img').append(`
              <div class="comment-loader">
              </div>
            `);
          $('.comment-update-text').text('잠시만요..');
          $('.comment-update-text').css('color', '#3498db');
          $('.comment-update-text').css('margin-left', '53px');
          $('.comment-update-text').css('font-size', '18px');
          $('.comment-update-text').css('font-weight', '500');

          setTimeout(function() {
            $('.comment-update-wrap').fadeOut("slow");
            AJAX.reqcomments("https://syuproject.herokuapp.com/comment/facebook", ++count, reqId, fn);
          }, 1200);
        });
      }
    }
    AJAX.reqcomments("https://syuproject.herokuapp.com/comment/facebook", count, reqId, fn);
  }
}

// 모달 사라질 때 댓글 비우기
$("#exampleModalLong").on('hidden.bs.modal', function(e) {
  $('.modal-body').empty();
});
