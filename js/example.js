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
    update_all_total();
  });
  update_all_total();
  total = total.toFixed(2);

  $('#subtotal').html(total);
  $('#total-3').html(total);
  
  update_balance();
  // numberToWords($('#total-3').text());
}

function update_balance() {
  var due = $("#total-3").text() - $("#paid").val();
  if(isNaN(due)){ due = 0;}
  due = due.toFixed(2);
  $('.due').html(due);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var price = (row.find('.length').val() * row.find('.pieces').val() * row.find('.hieght').val())/1728;
  price = price.toFixed(2);
  isNaN(price) ? row.find('.cft').html("N/A") : row.find('.cft').html(price);
  
  update_total();
  update_all_total();
}
function numberToWords(amount) {
  var words = new Array();
  words[0] = '';
  words[1] = 'One';
  words[2] = 'Two';
  words[3] = 'Three';
  words[4] = 'Four';
  words[5] = 'Five';
  words[6] = 'Six';
  words[7] = 'Seven';
  words[8] = 'Eight';
  words[9] = 'Nine';
  words[10] = 'Ten';
  words[11] = 'Eleven';
  words[12] = 'Twelve';
  words[13] = 'Thirteen';
  words[14] = 'Fourteen';
  words[15] = 'Fifteen';
  words[16] = 'Sixteen';
  words[17] = 'Seventeen';
  words[18] = 'Eighteen';
  words[19] = 'Nineteen';
  words[20] = 'Twenty';
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = amount.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var words_string = "";
  if (n_length <= 9) {
      var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var received_n_array = new Array();
      for (var i = 0; i < n_length; i++) {
          received_n_array[i] = number.substr(i, 1);
      }
      for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
          n_array[i] = received_n_array[j];
      }
      for (var i = 0, j = 1; i < 9; i++, j++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
              if (n_array[i] == 1) {
                  n_array[j] = 10 + parseInt(n_array[j]);
                  n_array[i] = 0;
              }
          }
      }
      value = "";
      for (var i = 0; i < 9; i++) {
          if (i == 0 || i == 2 || i == 4 || i == 7) {
              value = n_array[i] * 10;
          } else {
              value = n_array[i];
          }
          if (value != 0) {
              words_string += words[value] + " ";
          }
          if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Crores ";
          }
          if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Lakhs ";
          }
          if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
              words_string += "Thousand ";
          }
          if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
              words_string += "Hundred and ";
          } else if (i == 6 && value != 0) {
              words_string += "Hundred ";
          }
      }
      words_string = words_string.split("  ").join(" ");
  }
  $('#words').html(words_string);
}

function update_amount() {
  var row = $(this).parents('.item-row');
  var cft = row.find('.cft').text() ;
  var sqft = row.find('.sqft').val();
  var rate = row.find('.rate').val();
  var total_amount;
  if(sqft){
    total_amount = parseInt(sqft * rate);
  }
  else{
    total_amount = parseInt(cft * rate);
    console.log(total_amount);

  }
  // console.log(total_amount.toFixed(2));
  // total_amount = total_amount.toFixed(2);
  // total_amount = parseInt(total_amount);
  isNaN(total_amount) ? row.find('.amount').html("N/A") : row.find('.amount').html(total_amount);
  update_total();
  update_all_total();
}
function update_all_total() {
  var total = $('.total').text();
  var subtotal = $('#subtotal').text();
  // console.log(subtotal === "");
  if(isNaN(total)){ total = 0 ;}
  if(isNaN(subtotal) || subtotal === ""){ subtotal = 0;}
  // con/sole.log(subtotal);
  var final = parseInt(total)+ parseInt(subtotal);
  final = final.toFixed(2);
  $('#total-3').html(final);
  // console.log(total,subtotal);
  numberToWords(final);
}

function update_other() {
  // console.log('ghjk');
  var other = parseInt($('.other').val());
  var insurance = parseInt($('.insurance').val());
  var gst = parseInt($('.gst').val());
  var loading = parseInt($('.loading').val())
  if (isNaN(other)){ other = 0 ;}
  if (isNaN(insurance)){ insurance = 0}
  if (isNaN(gst)){gst = 0}
  if (isNaN(loading)){ loading = 0}
  total = (other+insurance+gst+loading).toFixed(2)
  $('.total').html(total);
  // console.log(other+gst+loading+insurance);
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
  // console.lo/g('did it');
  // 

}
bind();

function deleteRow(){
  var a = $('#rowID').val();
  // console.log("#"+a);
  $("#"+a).remove();
  update_total();

};


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
    var id = parseInt($('.item-row:last')[0].id) + 1;
    $(".item-row:last").after('<tr class="item-row" id='+id+'><td id="serial">'+id+'</td><td><input type="text"></td><td><input type="text" class="length"></td><td><input type="text" class="pieces"></td><td><input type="text" class="hieght"></td><td><span class="cft"></span></td><td><input type="text" class="sqft"></td><td><input type="text" class="rate"></td><td><span class="amount"></span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  // bind();
  

  
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