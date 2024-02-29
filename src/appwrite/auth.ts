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

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.account = new Account(this.client);
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

  async getCurrentUser():Promise<any>  {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
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

export default authservice; //exporting object
