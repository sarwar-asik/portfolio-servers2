import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const ProjectSchema:Schema<IProject>= new Schema<IProject>({
    name: {
        type: String,
        required: true,
        unique:true
      },
      live: {
        type: String,
        required: true
      },
      source: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      img: {
        type: String,
        required: true
      },
      tech: {
        type: [String],
      },
      photo:{
        type:[String]
      }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
})



export const Project = model<IProject>("Project",ProjectSchema)