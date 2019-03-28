$(document).ready(function() {
  $('.cat-sect:not(:first-child)').hide();
  $('.cat-button:first-child').addClass('active');
	$('.cat-button').click(function(){
    $('.cat-button').removeClass('active');
    var button_id = $(this).attr('id').split('--');
    $('.cat-sect').hide();
    $('#cat-sect--' + button_id[1]).show();
    $(this).addClass('active');
    var href = $('#submit-a-ticket-button').attr('href');
    $('#submit-a-ticket-button').attr('href', href.replace('general', button_id[1]));
  });

  
function addLinksToTOC() {
  var content = document.querySelectorAll(".single-article")[0];
  console.log(content);
  var toc = document.getElementById("table-of-contents");
  var headings = content.querySelectorAll("h2");
  var tocItems;
  var prevLevel = false;
  var parentEl = toc;
  var prevEl = parentEl;
  for (var i = 0, l = headings.length; i < l; i++) {
    var heading = headings[i];
    var text = heading.childNodes[0].nodeValue;
    var slug = slugify(text);
    heading.id = slug;
    tocItems = toc.getElementsByTagName("li");

    var level = parseInt(heading.tagName.replace(/\D/g, ''));
    if (prevLevel) {
      if (level > prevLevel) {
        var ul = document.createElement("ul");
        tocItems[tocItems.length - 1].appendChild(ul);
        parentEl = ul;
        prevEl = tocItems[tocItems.length - 1].parentElement;
      } else if (level < prevLevel) {
        parentEl = prevEl;
      }
    }
    prevLevel = level;

    var li = document.createElement("li");
    var a = document.createElement("a");
    var aText = document.createTextNode(text);
    a.href = "#" + heading.id;
    a.appendChild(aText);
    li.appendChild(a);
    parentEl.appendChild(li);
  }
  
  $('.after-toc').css('margin-top', $("#table-of-contents").height() + 'px');
}

function initTableOfContents() {

  if ($("#table-of-contents").length > 0) {

    addLinksToTOC();

  }

}


function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}


initTableOfContents();
  $('#table-of-contents li:first-child a').addClass('active');
	$('#table-of-contents a').click(function(){
    $('#table-of-contents a').removeClass('active');
    $(this).addClass('active');
  });
});
