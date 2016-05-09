# Input-collector
Collects values from form inputs
## How it works
1. Require jquery.js
2. Below require input-collector.js
3. Initialize
```
  // On leaving the website
window.onbeforeunload = function() {

    var form = $('#form'),
        path = form.data('form-url');

    var response = form.inputCollector({
     // inputs: true,
     // textareas: true,
     // selects: true,
     // by_class : 'about-user',
     // only_required : false
        allow_empty: false,
        only_visible: true,
        also_take_by_name: ['page_language','came_from'], //is hidden
        ajax : {
         // dataType: 'json',
         // method: 'post'
            url : path,
            data : {
                bitrix : true
            }
        }
    });
    
    return response; // array of all_values
};
```
