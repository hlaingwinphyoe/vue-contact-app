import axios from "axios";

export class ContactService {
    static serverUrl = 'http://localhost:9000';

    static getAllContacts(){
        let dataUrl = `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    static getContact(id){
        let dataUrl = `${this.serverUrl}/contacts/${id}`;
        return axios.get(dataUrl)
    }

    static createContact(contact){
        let dataUrl = `${this.serverUrl}/contacts`;
        return axios.post(dataUrl,contact)
    }

    static updateContact(contact,id){
        let dataUrl = `${this.serverUrl}/contacts/${id}`;
        return axios.put(dataUrl,contact)
    }

    static deleteContact(id){
        let dataUrl = `${this.serverUrl}/contacts/${id}`;
        return axios.delete(dataUrl)
    }

    static getAllGroups(){
        let dataUrl = `${this.serverUrl}/groups`;
        return axios.get(dataUrl);
    }

    static getGroup(contact){
        let groupId = contact.groupId;
        let dataUrl = `${this.serverUrl}/groups/${groupId}`;
        return axios.get(dataUrl);
    }

}