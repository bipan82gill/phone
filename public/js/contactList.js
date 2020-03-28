$(document).ready(function() {
    /* global moment */
    //contactList Container holds all of our contacts
    var contactContainer = $("#contacts-container");
    $(document).on("click", "button.delete", handleContactDelete);
    $(document).on("click", "button.edit", handleContactEdit);
    
    var contacts;
    var contactList = $("#btn-contacts");
    $(contactList).on("click", getContacts);
    var url = window.location.search;
    var contactId;
    if (url.indexOf("?contact_id=") !== -1) {
      contactId = url.split("=")[1];
      getContacts(contactId);
    }
    // If there's no contactId we just get all contacts as usual
    else {
      getContacts();
    }
    // This function grabs contacts from the database and updates the view
    function getContacts(contact) {
    
      contactId = contact || "";
      if (contactId) {
        contactId = "/?contact_id=" + contactId;
      }
      $.get("/api/contacts" + contactId).then(function(data) {
        console.log("contacts", data);
        contacts = data;
        if (!contacts || !contacts.length) {
          displayEmpty(contact);
        } else {
          initializeRows();
        }
      });
    }
    //This function does an API call to delete contact
    function deleteContact(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/contacts/" + id
      }).then(function() {
        getContacts();
      });
    }
    // InitializeRows handles appending all of our constructed contac HTML inside contactContainer
    function initializeRows() {
      contactContainer.empty();
      var contactsToAdd = [];
      for (var i = 0; i < contacts.length; i++) {
        contactsToAdd.push(createNewRow(contacts[i]));
      }
      contactContainer.append(contactsToAdd);
    }
    
    // This function constructs a contact's HTML
    function createNewRow(contact) {
    
      
      var div= $("<div>");
      div.addClass("card");
      var deleteBtn = $("<button style=float:right>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button style=float:right>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var list =$("<li>");
      list.addClass("list");
      var heading=$("<h2>");
      heading.addClass("title");
      heading.text(contact.firstName+" "+contact.lastName);
      var subheading =$("<h3>");
      subheading.addClass("subTitle");
      subheading.text(contact.contactNumber);
      subheading.append(deleteBtn);
      subheading.append(editBtn);
      list.append(heading);
      list.append(subheading);
      div.append(list);
      list.data("contact", contact)
      div.data("contact", contact);
      return div;  
 }
    //This function figures out which contact we want to delete and then calls deleteContact
    function handleContactDelete() {
      var currentContact = $(this)
        .parent()
        .parent()
        .data("contact");
      deleteContact(currentContact.id);
    }
    // This function figures out which contact we want to edit and takes it to the appropriate url
    function handleContactEdit() {
      var currentContact = $(this)
        .parent()
        .parent()
        .data("contact");
      window.location.href = "/add?contact_id=" + currentContact.id;
    }
    // This function displays a message when there are no contacts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Contact #" + id;
      }
      contactContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html(
        "No contacts yet" +
          partial +
          ", navigate <a href='/add" +
          query +
          "'>here</a> in order to get started."
      );
      contactContainer.append(messageH2);
    }
  });