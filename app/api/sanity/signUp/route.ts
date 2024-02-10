import { signUpHandler } from "next-auth-sanity";
import sanityClient from "@/libs/sanity";

const POST = signUpHandler(sanityClient);
