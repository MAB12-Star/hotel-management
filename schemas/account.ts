import { defineField } from "sanity";

const account = {
    name:"account",
    title:"Account",
    type:"document",
    fields:[
        defineField({
            name:"providerType",
            type:"string",
        }),
        defineField({
            name:"providerID",
            type:"string",
        }),
        defineField({
            name:"providerAccountID",
            type:"string",
        }),
        defineField({
            name:"refreshToken",
            type:"string",
        }),
        defineField({
            name:"accessToken",
            type:"string",
        }),
        defineField({
            name:"accessTokenExpires",
            type:"number",
        }),
        defineField({
            name: "user",
            title:"user",
            type:"reference",
            to:{type:"user"},
        })
    ]
}

export default account;