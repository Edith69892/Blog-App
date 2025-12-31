import { Client, ID, Databases, bucket, Query } from "appwrite";
import config from "../config/config";

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite sersvice creat post error : ", error)
            throw error
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite sersvice update post error : ", error)
            throw error
        }
    }


    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite sersvice delete post error : ", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("Appwrite sersvice get post error : ", error)
            return false
        }

    }


    /// in this method have a index of key to used in query : ex => status 
    async getActivePosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite sersvice get Active post error : ", error)
            return false
        }
    }

    //upload file

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite sersvice upload file error : ", error)
            return false
        }
    }

    async deleteFile(fielId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fielId
            )

            return true
        } catch (error) {
            console.log("Appwrite sersvice delete file error : ", error)
            return false
        }
    }

    async getFIlePreview(fileId){
        try {
            return  await  this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            
        } catch (error) {
             console.log("Appwrite sersvice preview file error : ", error)
            return false
        }
    }

}

const service = new Service()

export default service;