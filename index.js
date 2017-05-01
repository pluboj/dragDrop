/** BUCKET LIST **/
function bucketList(opts){
  var container = this.container = opts.container || null;
  var rows = this.rows = opts.rows || ['row'];
  var selector = this.selector = opts.selector || '';
  var titleSelector = this.titleSelector = opts.titleSelector || new Function();
  var title = this.title = opts.title || null;
  
  
  var bucketList = $('<table class="bucket-list" />');
  
  if(title){
    bucketList.append(
      $('<tr/>').append(
        $('<th colspan="2">').html(title)
      )
    );
  }
  
  var dragList = $('<td colspan="2" class="drag-list droppable" style="position:relative" />');
  $(bucketList).append(
    $('<tr>').append(
      dragList
    )
  );
  
  $.each(rows, function(i, row){
    var tr = $('<tr />'),
        header = $('<td />').html(row),
        droppable = $('<td class="droppable" data-value="'+(i+1)+'" style="position:relative"/>');
    tr.append(header).append(droppable);
    bucketList.append(tr);
  });
  
  $(container).append(bucketList);
  
  $(selector).each(function(drg, i){
    var title = titleSelector.call(this),
    draggable = $('<div class="draggable">').html(title);
    draggable[0].dataField = this;
    draggable[0].draggableID = i;
    
    var curVal = $(this).val();
    if(Number(curVal)){
      $('.droppable[data-value="'+curVal+'"]').append(draggable);
    }else{
      dragList.append(draggable);
    }
    
  });
  
  $('.draggable').draggable({
    revert: 'invalid',
    start: function(){
      $(this).css('z-index', 100);
    }
  });
  
  $('.droppable').droppable({
    drop: function(e,ui){
      $(ui.draggable).after(
        $(ui.draggable)
         .clone()
         .addClass('draggable-placeholder')
         .attr('data-draggable-id', ui.draggable[0].draggableID)
         .css('visibility', 'hidden')
       );
      
      var placeholder = $(this).find('.draggable-placeholder[data-draggable-id="'+ui.draggable[0].draggableID+'"]');
      if( placeholder.length ){
        $(placeholder).replaceWith(ui.draggable)
      }else{
        $(this).append(ui.draggable);
      }
      $(ui.draggable).css({top:0,left:0,'z-index':0});      
      $($(ui.draggable)[0].dataField).val( $(this).attr('data-value') );
    }
  });
}

/** /BUCKET LIST **/