import mongoose from 'mongoose'
import {mongo_uri} from '../envs'

mongoose.connect(mongo_uri as string)

export default mongoose.connection