<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col">
        <h3>
          <a @click="prev" class="btn btn-danger"><i class="fa-solid fa-arrow-left"></i></a>
          Add Contact
        </h3>
        <div class="row align-items-start">
          <div class="col-4">
            <form @submit.prevent="createContact">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="contact.name" id="name" placeholder="name">
                <label for="name">Enter Name</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="contact.photo" id="photo" placeholder="photo">
                <label for="photo">Photo URL</label>
              </div>
              <div class="form-floating mb-3">
                <input type="email" class="form-control" v-model="contact.email" id="email" placeholder="email">
                <label for="email">Email</label>
              </div>
              <div class="form-floating mb-3">
                <input type="tel" class="form-control" v-model="contact.mobile" id="phone" placeholder="phone">
                <label for="phone">Phone Number</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="contact.company" id="company" placeholder="company">
                <label for="company">Enter Company</label>
              </div>
              <div class="form-floating mb-3">
                <select v-if="groups.length > 0" name="" class="form-control" id="" v-model="contact.groupId">
                  <option value="" selected disabled>Select Group</option>
                  <option v-for="group in groups" :key="group.id" :value="group.id">{{ group.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <button class="btn btn-danger"><i class="fa-solid fa-save"></i> Save</button>
              </div>
            </form>
          </div>
          <div class="col-4 mt-4">
            <img v-if="contact.photo" :src="contact.photo" class="contact-img-big" alt="">
            <img v-else src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yTxBxqX7UPLILheEuZbgOuYver2PQLQxuQ&usqp=CAU" class="contact-img-big" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";

export default {
  name: "AddContact",
  data() {
    return {
      contact: {
        name : '',
        photo: '',
        email: '',
        mobile: '',
        company: '',
        groupId: ''
      },
      groups: [],
      errorMessage: ''
    }
  },
  created: async function(){
    try {
      let response = await ContactService.getAllGroups();
      this.groups = response.data
    }catch (error){
      this.errorMessage = error.message
    }
  },
  methods: {
    prev() {
      this.$router.go(-1)
    },
    createContact: async  function(){
      try {
        let response = await ContactService.createContact(this.contact)
        if(response){
          return this.$router.push('/')
        }
        else {
          return this.$router.push('/contacts/add')
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