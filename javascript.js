$(document).ready(function(){
  var clear = function(ele){
    $(ele).remove();
  }
  var create_drags = function(){
  $('.drag').draggable();
  $('.drag2').draggable();
  $('.fun').droppable({
    drop: function(ev, ui) {
      var color = ui.draggable.attr("color")
      if (color === 'red'){
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo('.home1');
      }else{
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo('.home2');
      }
    }
  })
  $('.square').droppable({
  drop: function(ev, ui) {
      var clasname = $(this).children('div').attr('class').split(' ')[1]
      var color = ui.draggable.attr("color")
      if(clasname === "sp00" || clasname === "sp01" || clasname === "sp02" || clasname === "sp03" || clasname === "sp04" || clasname === "sp05" || clasname === "sp06" || clasname === "sp07"){
        if($('.'+clasname+'').parent().css('background-color') == "rgba(0, 0, 0, 0)"){
          var spotto = class_toanimateto(clasname);
          var spotfrom = $('.'+clasname+'').position();
          var spottop = $(spotto).position();
          var $todrag = $('<div class="draggabledroppable'+color+'"></div>')  
          $todrag.css({
            'left': spotfrom.left,
            'top': spotfrom.top
          })       
          $todrag.appendTo('.fun')         
          $todrag.animate({
              left: spottop.left,
              top: spottop.top
          }, 1000)
          setTimeout(function(){
            $(spotto).parent().css('background-color', color)
            clear('.draggabledroppable'+color+'')
          }, 900)
        }
      }
      if (color === 'red'){
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo('.home1');
      }else{
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo('.home2');
      }
      
  }})
};
  var create_bord = function(a, b){
    var $tabled = $('<table class="board"></table>')
    for(var ia = 0; ia <= a; ia++){
      var $cftr = $('<tr class="row'+ia+' se"></tr>');
      for(var ib = 0; ib <= b; ib++){
        var $cftd = $('<td class="sq'+ia+''+ib+'"><div class="square"><div class="spot sp'+ia+''+ib+'"></div></div></td>')
        $cftd.appendTo($cftr);
      }
      $cftr.appendTo($tabled);
    }
    $tabled.appendTo($('.fun'));
    create_drags();
  }
  create_bord(5, 6);

  $('.6x7').on("click", function(){
    clear('.board')
    create_bord(5, 6)
  });
  $('.4x4').on("click", function(){
    clear('.board')
    create_bord(3, 3)
  });
  $('.5x6').on("click", function(){
    clear('.board')
    create_bord(4, 5)
  });
  var class_toanimateto = function(classname){
    var start = true
    for(var iii = 0; iii <= 6; iii++){
      if (classname === 'sp0'+iii+''){
        for(var ii = 0; ii <= 8; ii++){
          if(start){
            if($('.sp'+ii+''+iii+'').parent().css('background-color') !== "rgba(0, 0, 0, 0)"){
              return "full"
            }
            start = false;
          }
          if($('.sp'+ii+''+iii+'').parent().css('background-color') !== "rgba(0, 0, 0, 0)"){
            var i = ii - 1
            return '.sp'+i+''+iii+''
          }
        }
      }
    }
  };
});
