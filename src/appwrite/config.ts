import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// defining types


interface createPostParams {
  title: string;
  content: string;
  slug:string,
  featuredimage: string;
  status: boolean;
  userId: string;
}
interface updatePostParams {
  title: string;
  content: string;
  
  featuredimage: string;
  status: boolean;
  
}

export class Service {
  client = new Client();
  databases;
  bucket;


  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);

    this.databases = new Databases(this.client);
 
    this.bucket = new Storage(this.client);
   
  }
// a "slug" typically refers to a part of a URL that identifies a particular resource in a human-readable way.
  async createPost({ title, content, slug, featuredimage, status, userId }:createPostParams):Promise<any> {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        { title, content, featuredimage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug:string) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }



  // to use queries we must create indexes in database collection,in this scenario i have defined status as of the indexes so using it for query
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.collectionId,
        queries     //also can pass array directly here  eg: [Query.equal("status", "active")] we can have multiple query items inside this array
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug:string, { title, content, featuredimage, status }:updatePostParams):Promise<any> {
    try {
      return await this.databases.updateDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        { title, content, featuredimage, status }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug:string) {
    try {
      await this.databases.deleteDocument(
        conf.databaseId,
        conf.collectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  //  file upload

  async uploadFile(file:File):Promise<any> {
    try {
      return await this.bucket.createFile(conf.bucketId, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }

  //   delete file
  async deleteFile(fileId:string):Promise<any> {
    try {
      await this.bucket.deleteFile(conf.bucketId, fileId);
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId:string) {
    return this.bucket.getFilePreview(conf.bucketId, fileId);
  }
}

const service = new Service();

export default service;
