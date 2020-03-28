$(document).ready(function() {
    // Getting jQuery references to the contact form 
    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var email = $("#email");
    var contactNumber = $("#contactNumber");
    var contactForm = $("#contactForm");
    
  
    $(contactForm).on("submit", handleFormSubmit);
    var url = window.location.search;
      var contactId;
      // Sets a flag for whether or not we're updating a contact to be false initially
      var updating = false;
    
      // If we have this section in our url, we pull out the contact id from the url
      // In '?contact_id=1', contactId is 1
      if (url.indexOf("?contact_id=") !== -1) {
        contactId = url.split("=")[1];
        getContactList(contactId, "contact");
      }
    
    
    // A function for handling what happens when the form to create a new contact is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
      // Wont submit the contact if we are missing any input field
      if (!firstName.val().trim()
           ||!lastName.val().trim()
           ||!email.val().trim()
           ||!contactNumber.val().trim()) {
        return;
    }
      // Constructing a newContact object to hand to the database
      var newContact = {
        firstName: firstName.val().trim(),
        lastName: lastName.val().trim(),
        email: email.val().trim(),
        contactNumber: contactNumber.val().trim()
        
     
      };
      if (updating) {
        newContact.id = contactId;
        updateContact(newContact);
      }
      else {
        submitContact(newContact);
      }
    }
  
    // Submits a new Contact and brings user to add new contact number
    function submitContact(newContact) {
      $.post("/api/contacts", newContact, function() {
        window.location.href = "/contacts";
      });
    };
  
    function getContactList(contactId) {
       
      $.get('/api/contacts', function(result) {
        if (result) {
          var i = contactId ;
          --i;
          console.log(i);
          // If this contact exists, prefill our contact list with its result
          firstName.val(result[i].firstName);
          lastName.val(result[i].lastName);
          email.val(result[i].email);
          contactNumber.val(result[i].contactNumber);
          updating = true;
        }
      
      });
    }
  
    function updateContact(contact) {
      $.ajax({
        method: "PUT",
        url: "/api/contacts",
        data: contact
      })
        .then(function() {
          window.location.href = "/contacts";
        });
    }
  
  });