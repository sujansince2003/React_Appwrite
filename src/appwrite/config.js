import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, slug, featuredimage, status, userId }) {
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

  async getPost(slug) {
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
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseId,
        conf.collectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
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
  async deletePost(slug) {
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

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucketId, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }

  //   delete file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.bucketI, fileId);
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.bucketId, fileId);
  }
}

const service = new Service();

export default service;
