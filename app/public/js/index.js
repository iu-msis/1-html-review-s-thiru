const Person = {
  data() {
    return {
      "person": {},
      }
  },

  computed: {
    prettyBirthday() {
        return dayjs(this.person.dob.date)
        .format('D MMM YYYY')
    }
  },
  created() {
      console.log("A");

      fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then((json) => {
          console.log(json);
          this.person = json.results[0];
          console.log("C");
      })
      .catch( err => {
          console.error(err);
      });

      console.log("B");
  }
}

Vue.createApp(Person).mount('#random');