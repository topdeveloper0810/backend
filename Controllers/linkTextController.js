import LinkText from "../models/LinkText.js";

export const addLinkText=async(req,res)=>{
    const {url,comments}=JSON.parse(req.body.data)
    console.log(url,comments)
    const {file} = req
    console.log(file.path)
    try{
        const newLinkText=new LinkText({
        url:url,
        comments,comments,
        image:file.path
        })
        await newLinkText.save()
        res.status(200).json({message:"Link text added successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong, please try again"})
    }
}

export const getLinkTexts=async(req,res)=>{
    try{
        const linktexts=await LinkText.find().sort({_id:-1}).limit(5)
        res.status(200).json({linktexts:linktexts})
    }catch(err){
        res.send(err)
    }
}

export const downloadImages=async(req,res)=>{
    const {id}=req.query
    try{
        const linktext=await LinkText.findOne({_id:id})
        const path=linktext.image
        if(!path){
            res.status(500).json({success:false})
        }
        else{
            const absolutePath=process.cwd()+"\\"+path
            res.status(200).sendFile(absolutePath)
        }
    }catch(err){
        console.log(err)
    }
}