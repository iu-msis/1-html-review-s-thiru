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