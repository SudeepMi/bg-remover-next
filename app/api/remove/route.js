import axios from "axios";
import fs from "fs";
import { NextResponse } from "next/server";
export async function POST(Request, Response){
    try {
        const data = await Request.formData();
        const response = await axios({
                method: 'post',
                url: 'https://api.remove.bg/v1.0/removebg',
                data: data,
                responseType: 'arraybuffer',
                headers: {
                    "Content-Encoding": "multipart/formdata",
                    'X-Api-Key': process.env.API_KEY,
                },
                encoding: null
            });
      
        if (response.status != 200) {
            console.log("DFDDFDDDDDDDDDDDDDDDDDDD")
            return NextResponse.json({response})
        }
        const response_ = new NextResponse(Buffer.from(response.data))
        response_.headers.set('Content-Type', 'image/png');
        response_.headers.set('Content-Disposition', 'attachment; filename:"cws-bg-remove.png"');

        return response_;
    } catch (error) {
       
        return NextResponse.json(JSON.parse(String.fromCharCode.apply(null, new Uint16Array(error.response.data))),{
            status:400
          });
    }

}