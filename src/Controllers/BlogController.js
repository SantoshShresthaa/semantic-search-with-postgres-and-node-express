import { now } from "sequelize/lib/utils";
import Blog from "../models/blogs.js";
import getVectorEmbeddings from "../helpers/vectorEmbeddings.js";
import { sequelize } from "../config/database.js";
import fs from "fs";
import { exit } from "process";
export const index = async (req, res) => {
    var blogs = await Blog.findAll();
    return res.json({
        status : true,
        message: "Success",
        data: blogs,
    });
}

export const store = async (req, res) => {
    try {
        let data = {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            status: req.body.status,
            publishedAt: now(),
        };


        const vector = await getVectorEmbeddings(data.content);

        data = {...data, embedding : JSON.stringify(vector.data)};


        const newBlog = await Blog.create(data)
    
        return res.json({
            status : true,
            message: "Success",
            data    : newBlog

        });
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Something went wrong!!!"
        });
    }

}

export const search = async (req, res) => {
    const searchRequest = req.query.query;

    const getVector =  await getVectorEmbeddings(searchRequest);
    console.log(getVector);
    const getResult = await sequelize.query(
        `SELECT id,title,content,author,status, 
         (embedding <=> $1) as similarity 
         FROM blogs 
         WHERE (embedding <=> $1) < 1
         ORDER BY similarity ASC 
         LIMIT 10`,
    {
        bind: [JSON.stringify(getVector.data)],
        type: sequelize.QueryTypes.SELECT
    }
    );


        
    return res.json({
        data: getResult.filter( (data,index)=> {
            return data.similarity <= 0.5
        })
    });
}

export const importFromFile = async (req, res) => {
   try {
    const readData = fs.readFileSync('./sample-data.json', 'utf8');

    const blogs = JSON.parse(readData);

    const mapBlog = blogs.map(async (blog) => {

        console.log(blog.content);
        // const getEmbedding = await getVectorEmbeddings(blog.content);

        return {
            title: blog.title,
            content: blog.content,
            author: blog.author,
            status: blog.status === "published" ? true : false,
            // embedding: JSON.stringify(getEmbedding.data), // Store only the vector data
            publishedAt: now(),
            createdAt: now(),
            updatedAt: now()
        }
    });

    const getBlogs = await Promise.all(mapBlog);


    return res.json({
        data: getBlogs
    });
   }catch(error) {
    return res.status(500).json({
        status : false,
        message : "Something went wrong",
        error : error
    })
   }

}