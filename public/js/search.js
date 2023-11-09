const findTagRecipes = async (search) => {
  console.log(search);
  if (search) {
    const response = await fetch(`/api/tags/search/${search}`);

    const data = await response.json();

    UpdateDropdown(data, 10);
  } else {
    UpdateDropdown(null, 0);
  }
};

$('#search-input').on('input', UpdateSearch);

let search = '';
function UpdateSearch(e) {
  var thisSearch = $(this).val();
  search = thisSearch;

  //Delay the search action by 50 milliseconds to allow user input to stabalize.
  setTimeout(function () {
    if (search == thisSearch) {
      //Update the search results.
      findTagRecipes(search);
    }
  }, 200);
}

function UpdateDropdown(Results, ResultsToDisplay) {
  // Clear all existing dropdown items.
  $('#Drop-Down').empty();

  for (let i = 0; i < ResultsToDisplay; i++) {
    // console.log(Results[i]);
    if (i >= Results.length) {
      return; // Return if Results exceed out Results to Display
    }

    // Create a dropdown item with movie information.
    let dropdownItem = $('<a></a>', {
      class: 'dropdown',
      href: `/recipes/${Results[i].id}`,
    }).append(
      $('<p>', {
        html: Results[i].name,
      })
    );

    // Append the dropdown item to the dropdown list
    $('#Drop-Down').append(dropdownItem);
  }
}
