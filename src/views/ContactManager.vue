<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>
          Contact Manager
          <router-link to="/contacts/add" class="btn btn-danger"><i class="fa-solid fa-plus"></i> New</router-link>
        </h3>
        <p class="fst-italic">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi molestiae necessitatibus numquam officiis recusandae? Adipisci architecto asperiores cupiditate et impedit inventore libero maxime natus odio porro ratione, repudiandae saepe tempora!
        </p>
      </div>
    </div>
    <form action="">
      <div class="row">
        <div class="col-md-6">
          <div class="row justify-content-center align-items-center">
            <div class="col">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="search" placeholder="search">
                <label for="search">Search...</label>
              </div>
            </div>
            <div class="col">
              <button class="btn btn-outline-danger"><i class="fa-solid fa-search"></i> Search</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>

  <!-- loading -->
  <div v-if="loading">
    <SpinnerView />
  </div>

  <!-- error message -->
  <div v-if="!loading && errorMessage">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="alert alert-warning d-flex align-items-center" role="alert">
            <i class="fa-solid fa-exclamation-triangle me-2"></i>
            <div>
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container" v-if="contacts.length > 0">
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="contact in contacts" :key="contact.id">
        <div class="card my-2 border-0 bg-custom">
          <div class="card-body">
            <div class="d-flex justify-content-around align-items-center">
              <div>
                <img v-if="contact.photo" :src="contact.photo" class="contact-img" alt="">
                <img v-else :src="`https://ui-avatars.com/api/?name=${contact.name}&background=random&rounded=true`" class="contact-img" alt="">
              </div>
              <div>
                <ul class="list-unstyled mb-0">
                  <li class="">{{ contact.name }}</li>
                  <li class="">Mobile: <span class="fw-semibold">{{ contact.mobile }}</span></li>
                </ul>
              </div>
              <div class="dropdown">
                  <a class="menu-btn" style="cursor:pointer" data-bs-toggle="dropdown" aria-expanded="false" >
                    <i class="fa-solid fa-ellipsis-v" style="font-size: 21px"></i>
                  </a>
                <ul class="dropdown-menu">
                  <router-link :to="`/contacts/view/${contact.id}`" class="dropdown-item mb-2">
                    <i class="fa-regular fa-eye text-success"></i> View
                  </router-link>
                  <router-link :to="`/contacts/edit/${contact.id}`" class="dropdown-item mb-2">
                    <i class="fa-solid fa-pen text-warning"></i> Edit
                  </router-link>
                  <a @click="deleteContact(contact.id)" class="dropdown-item mb-2">
                    <i class="fa-regular fa-trash-alt text-danger"></i> Delete
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";
import SpinnerView from "@/components/SpinnerView.vue";
import {useToast} from "vue-toastification";

export default {
  name: "ContactManager",
  components: {SpinnerView},
  data() {
    return {
      loading: false,
      contacts: [],
      errorMessage: ''
    }
  },
  created: async function() {
    try {
      this.loading = true;
      let response = await ContactService.getAllContacts()
      this.contacts = response.data;
      this.loading = false;

    }catch (error){
      this.errorMessage = error.message
      this.loading = false
    }
  },
  methods: {
    showToast(){
      let toast = useToast();
      toast.success("Hello",{
        timeout: 10000
      })
    },
    deleteContact : async function(contactId){
      try {
        this.loading = true;
        let res = await ContactService.deleteContact(contactId);
        if (res){
          let response = await ContactService.getAllContacts()
          this.contacts = response.data;
          this.loading = false;
        }

      }catch (error){
        this.errorMessage = error.message
        this.loading = false
      }
    }
  },
}
</script>

<style scoped>

</style>