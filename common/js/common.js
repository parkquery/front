$(function(){

  /* PC MAIN-MENU */
  $(".menu-dep1 > li").on("mouseenter", function(){
    if($(window).width() > "1024"){
      $(".nav-menu-wrap").addClass("open");
    }
  });
  $(".nav-menu").on("mouseleave", function(){
    if($(window).width() > "1024"){
      $(".nav-menu-wrap").removeClass("open");
    }
  });

  if ($(window).width() <= 1024) {
    menuHeight();
  }

  var _dim = "<div class=\"dim\" onclick=\"menuClose();\"></div>";
  var dim = $(".dim");

  /* MOBILE MAIN-MENU */
  $(".btn-menu-open").on("click", function(){
    if (!$(".dim").length) { $("body").prepend(_dim); }
    $("body").on('touchmove', function(e) { e.preventDefault(); }); //스크롤 방지
    $(".nav-menu-wrap").addClass("open");
    menuHeight();
  });

  $(".btn-menu-close").on("click", function(){
    menuClose();
  });

  /* 리사이징이 끝난 후 실행 */
  $(window).resize(function(){
    if(this.resizeTO) {
      clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
      $(this).trigger('resizeEnd');
    }, 300);
  });
  $(window).on('resizeEnd', function() {
    if ($(window).width() <= 1024) {
      // $(".nav-menu-wrap").removeClass("open");
      // $(".dim").remove();
      // $("body").off('touchmove'); //스크롤 방지 해제
      menuHeight();
      $(".col-group-b").hide(); //대상국담당 조직현황 상세정보 숨기기
      if(iscroll === null){ iscroll = new iScroll("gnb"); }
    } else if ($(window).width() > 1024){
      $(".nav-menu-wrap").removeClass("open");
      $(".nav-menu-wrap, #gnb").removeAttr("style");
      $(".dim").remove();
      $("body").off('touchmove'); //스크롤 방지 해제
      $(".col-group-b").show(); //대상국담당 조직현황 상세정보 복구
      if (iscroll !== null) { iscroll.destroy(); }
      iscroll = null;
    }
  });

  /* 해외시장정보 > 대상국담당 조직현황 모바일 */
  $(".col-group-a").on("click", function(){
    if($(window).width() <= "1024"){
      $(".col-group-b").stop().slideUp(200);
      $(this).next().stop().slideDown(200);
    }
  });

});

/* 모바일 메뉴 높이 */
function menuHeight(){
  var menu_h = $(window).height()-112;
  $("#gnb").height(menu_h);
  window.setTimeout(function() {iscroll.refresh();},300);
}

/* 메뉴 닫기 */
function menuClose(){
  $("body").off('touchmove'); //스크롤 방지 해제
  $(".nav-menu-wrap").removeClass("open");
  $(".dim").remove();
}

/* 레프트 메뉴 활성화 */
function asideHighlight(dep1){
  $(".aside-list").find("li").eq(dep1-1).addClass("on");
}

/* 지도 레이어팝업 닫기 */
function mapLayerClose(){
  $(".map").removeClass("active").attr("data-continent","none");
  $(".map-mark").removeClass("on");
  $(".map-layer").hide();
  $(".map-mask").remove();
}

/* 브라우저 주소창 */
if(navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod') || navigator.userAgent.match('iPad') || navigator.userAgent.match('Windows CE') || navigator.userAgent.match('Symbian') || navigator.userAgent.match('BlackBerry') || navigator.userAgent.match('Android') || navigator.userAgent.match('LG') || navigator.userAgent.match('MOT')|| navigator.userAgent.match('SAMSUNG'))
{
	window.addEventListener('load', function(){setTimeout(scrollTo, 0, 0, 1);}, false);
}

function loaded(){
	iscroll = new iScroll("gnb");
}

//카테고리 스크롤 (안드로이드 버전별)
var phone = navigator.userAgent.match('534.30');
if(phone) {
  $("head").append('<script src="/www/common/js/iscroll5.js"></script>');
  var iscroll;
  document.addEventListener('DOMContentLoaded', function () { setTimeout(Android_brower534, 200); }, false);
} else {
  $("head").append('<script src="/www/common/js/iscroll.js"></script>');
  if ($(window).width() <= 1024) {
    var iscroll;
    document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
  } else {
    iscroll = null;
  }
}

//안드로이드 기본 하위 브라우저 적용 함수
function Android_brower534 () {
    iscroll = new IScroll('#gnb', { mouseWheel: false });
}
