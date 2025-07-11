// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
     console.log("Validation script loaded");
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        console.log("form is invalid");
        }
          else {
            console.log("Form is valid");
          }
        form.classList.add('was-validated')
      }, false)
    })
  })()
