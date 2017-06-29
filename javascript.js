$(document).ready(function(){


  var clear = function(ele){
    $(ele).remove();
  }

  var go = true;



  var create_drags = function(){
  $('.drag').draggable();
  $('.fun').droppable({
    drop: function(ev, ui) {
      if (go){
        go = false
        $(ui.draggable).detach().css({top: 0,left: 0}).appendTo('.home');
        go = true
      }
    }
  })



  $('.square').droppable({
  drop: function(ev, ui) {
    if(go){
      go = false;
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
            winner();
            clear('.drag'+color+'')
            swap_color(ui.draggable);
          }, 900)
        }
      }
      go = true;
    }
    
    $(ui.draggable).detach().css({top: 0,left: 0}).appendTo('.home');
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
  create_bord(3, 3);

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
  var swap_color = function(draging){
    if(draging.attr('color') === 'red'){
      clear($('.dragred'))
      var $new = $('<div class="drag dragblue" color="blue"></div>')
      $new.appendTo('.home')
    }else{
      clear($('.dragblue'))
      var $new = $('<div class="drag dragred" color="red"></div>')
      $new.appendTo('.home')
    }
    create_drags();
  }

  

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

  var allEqual = function(s1, s2, s3, s4){
    var p1 = s1.parent().css('background-color');
    var p2 = s2.parent().css('background-color');
    var p3 = s3.parent().css('background-color');
    var p4 = s4.parent().css('background-color');
    if(p1 == "rgb(0, 0, 255)"){
      if (p1 === p2 && p3 === p4 && p2 === p3){
        return [true, 'blue']
      }else{
        return [false, 'no']
      }
    }else if(p1 == "rgb(255, 0, 0)"){
      if (p1 === p2 && p3 === p4 && p2 === p3){
        return [true, 'red']
      }else{
        return [false, 'no']
      }
    }else{
      return [false, 'no']
    }
  }

  var winner = function(){
    var rows = [[$('.sp00'), $('.sp01'), $('.sp02'), $('.sp03')], [$('.sp01'), $('.sp02'), $('.sp03'), $('.sp04')], [$('.sp02'), $('.sp03'), $('.sp04'), $('.sp05')], [$('.sp03'), $('.sp04'), $('.sp05'), $('.sp06')], [$('.sp10'), $('.sp11'), $('.sp12'), $('.sp13')], [$('.sp11'), $('.sp12'), $('.sp13'), $('.sp14')], [$('.sp12'), $('.sp13'), $('.sp14'), $('.sp15')], [$('.sp13'), $('.sp14'), $('.sp15'), $('.sp16')], [$('.sp20'), $('.sp21'), $('.sp22'), $('.sp23')], [$('.sp21'), $('.sp22'), $('.sp23'), $('.sp24')], [$('.sp22'), $('.sp23'), $('.sp24'), $('.sp25')], [$('.sp23'), $('.sp24'), $('.sp25'), $('.sp26')], [$('.sp30'), $('.sp31'), $('.sp32'), $('.sp33')], [$('.sp31'), $('.sp32'), $('.sp33'), $('.sp34')], [$('.sp32'), $('.sp33'), $('.sp34'), $('.sp35')], [$('.sp33'), $('.sp34'), $('.sp35'), $('.sp36')], [$('.sp40'), $('.sp41'), $('.sp42'), $('.sp43')], [$('.sp41'), $('.sp42'), $('.sp43'), $('.sp44')], [$('.sp42'), $('.sp43'), $('.sp44'), $('.sp45')], [$('.sp43'), $('.sp44'), $('.sp45'), $('.sp46')], [$('.sp50'), $('.sp51'), $('.sp52'), $('.sp53')], [$('.sp51'), $('.sp52'), $('.sp53'), $('.sp54')], [$('.sp52'), $('.sp53'), $('.sp54'), $('.sp55')], [$('.sp53'), $('.sp54'), $('.sp55'), $('.sp56')], [$('.sp00'), $('.sp10'), $('.sp20'), $('.sp30')], [$('.sp10'), $('.sp20'), $('.sp30'), $('.sp40')], [$('.sp20'), $('.sp30'), $('.sp40'), $('.sp50')], [$('.sp01'), $('.sp11'), $('.sp21'), $('.sp31')], [$('.sp11'), $('.sp21'), $('.sp31'), $('.sp41')], [$('.sp21'), $('.sp31'), $('.sp41'), $('.sp51')], [$('.sp02'), $('.sp12'), $('.sp22'), $('.sp32')], [$('.sp12'), $('.sp22'), $('.sp32'), $('.sp42')], [$('.sp22'), $('.sp32'), $('.sp42'), $('.sp52')], [$('.sp03'), $('.sp13'), $('.sp23'), $('.sp33')], [$('.sp13'), $('.sp23'), $('.sp33'), $('.sp43')], [$('.sp23'), $('.sp33'), $('.sp43'), $('.sp53')], [$('.sp04'), $('.sp14'), $('.sp24'), $('.sp34')], [$('.sp14'), $('.sp24'), $('.sp34'), $('.sp44')], [$('.sp24'), $('.sp34'), $('.sp44'), $('.sp54')], [$('.sp05'), $('.sp15'), $('.sp25'), $('.sp35')], [$('.sp15'), $('.sp25'), $('.sp35'), $('.sp45')], [$('.sp25'), $('.sp35'), $('.sp45'), $('.sp55')], [$('.sp06'), $('.sp16'), $('.sp26'), $('.sp36')], [$('.sp16'), $('.sp26'), $('.sp36'), $('.sp46')], [$('.sp26'), $('.sp36'), $('.sp46'), $('.sp56')], [$('.sp03'), $('.sp12'), $('.sp21'), $('.sp30')], [$('.sp04'), $('.sp13'), $('.sp22'), $('.sp31')], [$('.sp13'), $('.sp22'), $('.sp31'), $('.sp40')], [$('.sp05'), $('.sp14'), $('.sp23'), $('.sp32')], [$('.sp14'), $('.sp23'), $('.sp32'), $('.sp41')], [$('.sp23'), $('.sp32'), $('.sp41'), $('.sp50')], [$('.sp24'), $('.sp33'), $('.sp42'), $('.sp51')], [$('.sp15'), $('.sp24'), $('.sp33'), $('.sp42')], [$('.sp06'), $('.sp15'), $('.sp24'), $('.sp33')], [$('.sp25'), $('.sp34'), $('.sp43'), $('.sp52')], [$('.sp16'),$('.sp25'), $('.sp34'), $('.sp43')], [$('.sp26'), $('.sp35'), $('.sp44'), $('.sp53')], [$('.sp20'), $('.sp31'),$('.sp42'), $('.sp53')],[$('.sp10'), $('.sp21'), $('.sp32'), $('.sp43')],[$('.sp22'),$('.sp33'), $('.sp44'), $('.sp55')],[$('.sp01'),$('.sp12'),$('.sp23'),$('.sp34')],[$('.sp02'),$('.sp13'),$('.sp24'),$('.sp35')], [$('.sp03'), $('.sp14'), $('.sp25'), $('.sp36')],[$('.sp21'),$('.sp32'),$('.sp43'),$('.sp54')],[$('.sp11'),$('.sp22'),$('.sp33'),$('.sp44')],[$('.sp12'),$('.sp23'),$('.sp34'),$('.sp45')],[$('.sp13'),$('.sp24'),$('.sp35'),$('.sp46')],[$('.sp00'), $('.sp11'),$('.sp22'),$('.sp33')],[$('.sp23'),$('.sp34'),$('.sp45'),$('.sp56')]];
    for(var x = 0; x < rows.length; x++){
      var row = rows[x]
      if(allEqual(row[0], row[1], row[2], row[3])[0]){
        var color = allEqual(row[0], row[1], row[2], row[3])[1]
        alert(color + " is the winner")
      }
    }
  }
});
