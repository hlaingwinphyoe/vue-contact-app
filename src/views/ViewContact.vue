<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 col-md-4">
        <h3>
          <a @click="prev" class="btn btn-danger"><i class="fa-solid fa-arrow-left"></i></a>
          View Contact
        </h3>

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

        <div class="card border-0 mt-4 bg-custom" v-if="!loading && isDone">
          <div class="card-body">
            <div class="row">
              <div class="col-12 my-4 text-center">
                <img v-if="contact.photo" :src="contact.photo" class="contact-img-big" alt="">
                <img v-else :src="`https://ui-avatars.com/api/?name=${contact.name}&background=random&rounded=true`" class="contact-img-big" alt="">
              </div>
              <div class="col-12">
                <table class="w-100">
                  <tr>
                    <td class="text-black-50 py-3">Name:</td>
                    <td>{{ contact.name }}</td>
                  </tr>
                  <tr class="mb-4">
                    <td class="text-black-50 py-3">Email:</td>
                    <td>{{ contact.email }}</td>
                  </tr>
                  <tr class="mb-4">
                    <td class="text-black-50 py-3">Mobile:</td>
                    <td>{{ contact.mobile }}</td>
                  </tr>
                  <tr class="mb-4">
                    <td class="text-black-50 py-3">Company:</td>
                    <td>{{ contact.company }}</td></tr>
                  <tr class="mb-4">
                    <td class="text-black-50 py-3">Group:</td>
                    <td>{{ group.name }}</td>
                  </tr>
                </table>
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

export default {
  name: "ViewContact",
  data() {
    return {
      contactId: this.$route.params.contactId,
      contact: {},
      group: {},
      loading : false,
      errorMessage : ''
    }
  },
  created: async function() {
    try {
      this.loading = true;
      let response = await ContactService.getContact(this.contactId);
      let groupContact = await ContactService.getGroup(response.data)
      this.contact = response.data
      this.group = groupContact.data
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
    isDone(){
      return Object.keys(this.contact).length >0 && Object.keys(this.group).length > 0
    }
  },
}
</script>

<style scoped>

</style>