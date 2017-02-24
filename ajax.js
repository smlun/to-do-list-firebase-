$(document).ready
( function()
  {
    $.ajax
    ({
      url:"https://todo-list-8abb3.firebaseio.com/dogs.json",
      success: function(firebasedata)
               {
                 $.each(firebasedata,
                        function(index, value)
                        {
                          $('#dogs').append("<option>" + value.name + "</option>");
                        }
                       )
               }
    });
  }
)

$("#dogs").change(function(){
  console.log($(this).val());
  $('#tasks tr').remove(); //removing the rows everytime user input change
  $('#dogdetails').empty();
  var dog = $(this).val();
  $.ajax
  ({
    url:"https://todo-list-8abb3.firebaseio.com/tasks/"+dog+".json",
    success: function(firebasedata)
             {
               console.log(firebasedata);
               $.each(firebasedata,
                      function(index, value)
                      {
                        console.log(value);
                        $('#tasks').append("<tr><td>" + value + "</td></tr>");
                      }
                     )
             }
  });

  $.ajax
  ({
    url:"https://todo-list-8abb3.firebaseio.com/dogs.json",
    success: function(firebasedata)
             {
               $.each(firebasedata,
                      function(index, value)
                      {
                        console.log(dog);
                        if (dog == value.name)
                        {
                          $('#dogdetails').append("<h1>" + value.name + "</h1>");
                          $('#dogdetails').append("<h3>" + value.gender + "</h3>");
                          $('#dogdetails').append("<h3>" + value.age + "</h3>");
                        }
                      }
                     )
             }
  });
})

$("#addTask").click(function()
{
  console.log('success');
  var selectedDog = $('#dogs :selected').val();
  $.post("https://todo-list-8abb3.firebaseio.com/tasks/" + selectedDog + ".json", JSON.stringify($('#task').val()));
})
