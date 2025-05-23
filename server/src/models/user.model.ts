import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Mode } from "fs";
import dotenv from 'dotenv'
dotenv.config();
import Jwt from 'jsonwebtoken'

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Explanation:
// ^ — Start of string
// [^\s@]+ — One or more characters that are not whitespace or @ (for the email local part)
// @ — The @ symbol
// [^\s@]+ — One or more characters that are not whitespace or @ (for the domain)
// \. — A literal dot .
// [^\s@]+ — One or more characters that are not whitespace or @ (for the domain suffix)
// $ — End of string

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string; //for cloudnary
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  //courses which by by the user
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken:()=>string;
  SignRefreshToken:()=>string;
}
const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
      validator: function (value: string) {
        return emailRegexPattern.test(value);
      },
      message: "Please enter a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    // required: [true, "Please enter your password"],
   //because in social logins we can't enter password
    minlength:[6,"Password must be at least 6 characters"],
    select:false,
  },
  avatar:{
    public_id:String,
    url:String
  },
  role:{
    type:String,
    default:"user"
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  courses:[
    {
        courseId:String,
    }
  ],

},{timestamps:true});
// create two fields createdAt and updatedAt

//Hash paaword before saving so we write mongoose middleware

userSchema.pre<IUser>('save',async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
})

//sign access token
//when user will login we will create a accesstoken 
//when user give reload we compare it 

userSchema.methods.SignAccessToken = function(){
  return Jwt.sign({id:this._id},process.env.ACCESS_TOKEN || '',{
    expiresIn:"5m"
  });
};

//sign  refresh token

userSchema.methods.SignRefreshToken = function(){
  return Jwt.sign({id:this._id},process.env.REFRESH_TOKEN || '',{
    expiresIn:"7d"
  });
}

//access token is sort live and refresh token is long live 
//is access token expire than through refresh token me generate new
//access token
//through the access token we will reach protected route



//compare password

userSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);
} 

const userModel:Model<IUser> = mongoose.model("User",userSchema);
export default userModel;