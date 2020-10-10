function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  console.log(today);
  return today;
}

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  var total = 0;
  $('.amount').each(function(i){
    price = $(this).html();
    if (!isNaN(price)) total += Number(price);
  });

  total = total.toFixed(2);

  $('#subtotal').html(total);
  $('#total').html(total);
  
  update_balance();
  numberToWords(total);
}

function update_balance() {
  var due = $("#total-3").html() - $("#paid").val();
  due = due.toFixed(2);
  $('.due').html(due);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = (row.find('.length').val() * row.find('.pieces').val() * row.find('.hieght').val())/1728;
  price = price.toFixed(2);
  isNaN(price) ? row.find('.cft').html("N/A") : row.find('.cft').html(price);
  
  update_total();
}
function numberToWords(number) {  
  var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];  
  var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];  
  var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];  
  var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];  

  number = number.toString(); 
  number = number.replace(/[\, ]/g, '');
   if (number != parseFloat(number)) return 'not a number';
    var x = number.indexOf('.');
     if (x == -1) x = number.length;
      if (x > 15) return 'too big';
       var n = number.split('');
        var str = ''; var sk = 0;
         for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
               if (n[i] == '1') { 
                 str += elevenSeries[Number(n[i + 1])] + ' '; i++; sk = 1; }
                  else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ' '; sk = 1; } }
                   else if (n[i] != 0) { str += digit[n[i]] + ' '; 
                   if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; }
                    if ((x - i) % 3 == 1) { if (sk) str += shortScale[(x - i - 1) / 3] + ' '; sk = 0; } }
          if (x != number.length) {
             var y = number.length; str += 'point '; 
             for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' '; } 
             str = str.replace(/\number+/g, ' ');
              $('#words').html(str.trim());
}

function update_amount() {
  var row = $(this).parents('.item-row');
  var cft = row.find('.cft').text() ;
  var sqft = row.find('.sqft').val();
  var rate = row.find('.rate').val();
  var total_amount;
  if(sqft){
    total_amount = sqft * rate;
  }
  else{
    total_amount = cft * rate;
  }
  console.log(total_amount.toFixed(2));
  total_amount.toFixed(2);
  console.log(total_amount);
  isNaN(total_amount) ? row.find('.amount').html("N/A") : row.find('.amount').html(total_amount);
  update_total();
}
function update_all_total() {
  var total = $('.total').html();
  var subtotal = $('#subtotal').html();
  console.log(total,subtotal);
  var final = parseFloat(total)+ parseFloat(subtotal);
  final = final.toFixed(2);
  $('#total-3').html(final);
  console.log(parseFloat(total),parseFloat(subtotal));
  numberToWords(final);
}

function update_other() {
  console.log('ghjk');
  var other = parseFloat($('.other').val());
  var insurance = parseFloat($('.insurance').val());
  var gst = parseFloat($('.gst').val());
  var loading = parseFloat($('.loading').val())
  if (isNaN(other)){ other = 0 ;}
  if (isNaN(insurance)){ insurance = 0}
  if (isNaN(gst)){gst = 0}
  if (isNaN(loading)){ loading = 0}
  total = (other+insurance+gst+loading).toFixed(2)
  $('.total').html(total);
  console.log(other+gst+loading+insurance);
  update_all_total();
}

function bind() {
  $(".length").blur(update_price);
  $(".pieces").blur(update_price);
  $(".hieght").blur(update_price);
  $('.rate').blur(update_amount);
  $('.sqft').blur(update_amount);
  $('loading').change(update_other);
  $('insurance').change(update_other);
  $('gst').change(update_other);
  $('other').change(update_other);
  console.log('did it');
  

}
bind();

$(document).ready(function() {
 
  $('input').click(function(){
    $(this).select();
  });
  
  $("#date").val(print_today());
  $('loading').blur(update_other);
  $('insurance').blur(update_other);
  $('gst').blur(update_other);
  $('other').blur(update_other);

  $("#paid").blur(update_balance);
   
  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Item Name</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td><textarea class="length">0</textarea></td><td><textarea class="pieces">0</textarea></td><td><textarea class="hieght">0</textarea></td><td><span class="cft">0</span></td><td><textarea class="sqft"></textarea></td><td><textarea class="rate"></textarea></td><td><span class="amount"></span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  // bind();
  
  $(".delete").live('click',function(){
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  $("#cancel-logo").click(function(){
    $("#logo").removeClass('edit');
  });
  $("#delete-logo").click(function(){
    $("#logo").remove();
  });
  $("#change-logo").click(function(){
    $("#logo").addClass('edit');
    $("#imageloc").val($("#image").attr('src'));
    $("#image").select();
  });
  $("#save-logo").click(function(){
    $("#image").attr('src',$("#imageloc").val());
    $("#logo").removeClass('edit');
  });
  

  $('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
  });
  
});