"use server";

import { createUser, findUserByEmail, validatePassword } from "../models/User";
import { createToken, setAuthCookie, removeAuthCookie } from "../lib/auth";
import { redirect } from "next/navigation"; // ✅ Correct import for redirect

export async function signUp(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const username = formData.get("username");

    if (!email || !password || !name || !username) {
      return { error: "All fields are required" };
    }

    const user = await createUser({ email, password, name, username });

    const token = createToken({ id: user._id, email: user.email, name: user.name });

    await setAuthCookie(token);

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function signIn(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isValid = await validatePassword(user, password);
    if (!isValid) {
      return { error: "Invalid email or password" };
    }

    const token = createToken({ id: user._id, email: user.email, name: user.name });
    console.log("SignIn: Token Created for User:", user.email);

    await setAuthCookie(token);
    console.log("SignIn: Cookie Set, Returning Success");

    return { success: true };
  } catch (error) {
    console.error("SignIn Error:", error.message);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function signOut() {
  try {
    await removeAuthCookie(); // Remove the auth cookie
    redirect("/sign-in"); // Redirect to sign-in page
  } catch (error) {
    console.error("SignOut Error:", error.message);
    return { error: error.message || "Failed to sign out" };
  }
}