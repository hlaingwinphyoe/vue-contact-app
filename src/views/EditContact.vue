<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>
          <a @click="prev" class="btn btn-danger"><i class="fa-solid fa-arrow-left"></i></a>
          Edit Contact
        </h3>
        <div class="row">
          <div class="col-4">
            <form @submit.prevent="updateContact">
              <div class="form-floating mb-3">
                <input type="text" v-model="contact.name" class="form-control" id="name" placeholder="name">
                <label for="name">Enter Name</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" v-model="contact.photo" class="form-control" id="photo" placeholder="photo">
                <label for="photo">Photo URL</label>
              </div>
              <div class="form-floating mb-3">
                <input type="email" v-model="contact.email" class="form-control" id="email" placeholder="email">
                <label for="email">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input type="tel" v-model="contact.mobile" class="form-control" id="phone" placeholder="phone">
                <label for="phone">Phone Number</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" v-model="contact.company" class="form-control" id="company" placeholder="company">
                <label for="company">Enter Company</label>
              </div>
              <div class="form-floating mb-3">
                <select v-model="contact.groupId" class="form-control" id="">
                  <option value="" selected disabled>Select Group</option>
                  <option :value="group.id" v-for="group in groups" :key="group.id">{{ group.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <button class="btn btn-danger"><i class="fa-solid fa-save"></i> Save</button>
              </div>
            </form>
          </div>
          <div class="col-4 mt-4">
            <img v-if="contact.photo" :src="contact.photo" class="contact-img-big" alt="">
            <img v-else :src="`https://ui-avatars.com/api/?name=${contact.name}&background=random&rounded=true`" class="contact-img-big" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";

export default {
  name: "EditContact",
  data() {
    return {
      contactId: this.$route.params.contactId,
      contact: {
        name : '',
        photo: '',
        email: '',
        mobile: '',
        company: '',
        groupId: ''
      },
      groups: [],
      loading : false,
      errorMessage : ''
    }
  },
  created: async function() {
    try {
      this.loading = true;
      let response = await ContactService.getContact(this.contactId);
      let groupContact = await ContactService.getAllGroups()
      this.contact = response.data
      this.groups = groupContact.data
      this.loading = false
    }catch (error){
      this.errorMessage = error.message;
      this.loading = false
    }

  },
  methods: {
    prev() {
      this.$router.go(-1)
    },
    updateContact: async  function(){
      try {
        let response = await ContactService.updateContact(this.contact,this.contactId)
        if(response){
          return this.$router.push('/')
        }
        else {
          return this.$router.push(`/contacts/edit/${this.contactId}`)
        }
      }catch(error){
        console.log(error.message)
      }
    }
  },
}
</script>

<style scoped>

</style>