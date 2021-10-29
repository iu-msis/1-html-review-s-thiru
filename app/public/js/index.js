const Person = {
  data() {
    return {
      "person": {},
      "books": [],
      "bookForm": {}
      } 

  },

  computed: {
    prettyBirthday() {
        return dayjs(this.person.dob.date)
        .format('D MMM YYYY')
    }
  },

  methods:{
    prettyDollar(n) {
      const d = new Intl.NumberFormat("en-US").format(n);
      return "$ " + d;
  },
    fetchUserData() {
      fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then((parsedJson) => {
          console.log(parsedJson);
          this.person = parsedJson.results[0]
          console.log("C");
      })
      .catch( err => {
          console.error(err)
      })

      console.log("B");
  },
    fetchBooks() {
      fetch('/api/books/')
      .then(response => response.json())
      .then((parsedJson) => {
          console.log(parsedJson);
          this.books = parsedJson
          console.log("C");
      })
      .catch( err => {
          console.error(err)
      })

      console.log("B");
},
    selectBookToEdit(o) {
      this.selectedBook = o;
      this.bookForm = Object.assign({}, this.selectedBook);
    },
    postDeleteBook(o) {
      if (!confirm("Confirm delete of this entry? This action cannot be undone.")) {
        return;
      }
      console.log("Delete!", o);

      fetch('api/books/delete.php', {
          method:'POST',
          body: JSON.stringify(o),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

          // reset the form
          this.resetBookForm();
        });
    },
    resetBookForm() {
      this.selectedBook = null;
      this.bookForm = {};
    },
    postBook(evt) {
      if (this.selectedBook === null) {
          this.postNewBook(evt);
      } else {
          this.postEditBook(evt);
      }
    },
    postEditBook(evt) {

      console.log("Updating!", this.bookForm);

      fetch('api/books/update.php', {
          method:'POST',
          body: JSON.stringify(this.bookForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

          // reset the form
          this.resetBookForm();

        });
    },
postNewBook(evt) {

  fetch('api/books/create.php', {
      method:'POST',
      body: JSON.stringify(this.bookForm),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
  })
  .then( response => response.json() )
  .then( json => {
      console.log("Returned from post", json);
      this.books = json;
      this.bookForm={};
  });
}
  },
  created() {
    this.fetchUserData();
    this.fetchBooks();  
  }
}

Vue.createApp(Person).mount('#random');