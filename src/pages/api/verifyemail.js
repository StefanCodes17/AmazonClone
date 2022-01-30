import { UpdateUser } from "../../util/User"

export default async(req, res)=>{
    console.log(req)
    if(req.method === "POST"){
        if(UpdateUser(req.body.email)) return res.status(200).redirect(process.env.NEXTAUTH_URL)
        return res.status(401).send("Unathorized access")

    }
    if (req.method !== "POST") {
        res.status(405).set('Allow', 'POST').send("");
        return;
      }
}