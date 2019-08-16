import {development} from '../data/db';
import mongoose from 'mongoose';

const {database,host,dialect,port} = development;
const connectURL = `${dialect}://${host}:${port}/${database}`;

export default mongoose.connect(connectURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})