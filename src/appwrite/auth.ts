import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// defining types

interface createAccountParams {
  email: string;
  password: string;
  name: string;
}


interface loginParams
{
  email: string;
  password: string;
  
}

export class Authservice {
  client = new Client();   
  account;
  /**
   we can initialize client outside or inside constructor. Both approaches  are valid, and the choice between them depends on your specific needs and preferences. Initializing client outside the constructor ensures that it is available as soon as the instance is created, which can be useful if you need to use client in the constructor or if you want to ensure that client is initialized before any other code runs.

On the other hand, initializing client inside the constructor can make the code more organized and clear, especially if the initialization logic is closely tied to the constructor's responsibilities. However, it also means that client is not available until after the constructor has been called, which could be a consideration depending on how your class is used.
   */

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId); //configure instance of Client with url and project id
    
    this.account = new Account(this.client);  //passing client instance to Account 
   
  }

  async createAccount({ email, password, name }:createAccountParams):Promise<any> {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // login
        return this.login({email, password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }:loginParams):Promise<any> {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }


  //this method is used to check if user is logged in or not.also can be used to get details about curent loggedin user
  async getCurrentUser():Promise<any>  {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;     //null is written explictily so that if user is not logged in then it should return null
  }

  async logout():Promise<void> {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authservice = new Authservice(); //object

export default authservice; //exporting object    this will contains all methods defined under Authservice class
