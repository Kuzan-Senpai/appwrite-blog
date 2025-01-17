import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client = new Client()
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                await this.clearUser()
                return await this.setUser(email, password)
            }
            return userAccount;
        } catch (error) {
            console.error("Error creating account:", error)
            throw error
        }
    }

    async setUser(email, password) {
        try {
            if (!email || !password) {
                throw new Error("Email and Password are required.")
            }
            return await this.account.createEmailPasswordSession(email, password); // Create a session
        } catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        }
    }
    
    async clearUser(){
        try {
            await this.account.deleteSessions('')
            return true;
        } catch (error) {
            
            if (error.code === 401) {
                return true;
            }
            console.error("Error logging out", error)
            return false;
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get()
            if (!user) {
                throw new Error('Not Authenticated')
            }
            return user
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser() :: ", error)
            return null
        }
    }

    // async getCurrentUser() {
    //     try {
    //         const user = await this.account.get(); // Fetch the current user's details
    //         return user; // Return the user object if authenticated
    //     } catch (error) {
    //         if (error.code === 401) {
    //             // Handle unauthenticated user specifically
    //             console.warn("Appwrite service :: getCurrentUser() :: User is not logged in.");
    //         } else {
    //             // Log any other errors
    //             console.error("Appwrite service :: getCurrentUser() :: ", error);
    //         }
    //         return null; // Return null for unauthenticated or error cases
    //     }
    // }
}

const authService = new AuthService()

export default authService