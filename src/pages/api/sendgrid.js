import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SEND_GRID);


export default async(req, res)=> {
    if(req.method === "POST"){
      try {
        await sendgrid.send({
          to: req.body.email, // Your email where you'll receive emails
          from: process.env.FROMEMAIL, // your website email address here
          subject: `${req.body.subject}`,
          html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html lang="en">
                    <head>
                      <meta charset="utf-8">
                      <title>Amazon Clone</title>
                      <meta name="description" content="Amazon Clone">
                      <meta name="author" content="SitePoint">
                    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,200;1,400&family=Space+Mono&family=Work+Sans&display=swap" rel="stylesheet">  
                    </head>
                    
                    <body>
 <div class="container" style="margin-left: 20px;margin-right: 20px; margin-top:10px; font-family: 'Montserrat', sans-serif;">
   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="amazon_logo" width="120px">
   <div>
      <h2>Confirm Your Email!</h2>
  <div style="font-size: 16px;">
   <p style="color: rgba(91, 91, 91, 0.9); max-width:650px">${req.body.message}</p>
    <br>
  </div>
     ${req.body.verify ? 
      `
      <form action="${process.env.NEXTAUTH_URL}/api/verifyemail" method="POST">
    <input type="hidden" name="email" value=${req.body.email}></input>
        <button type="submit" style="background:#232F3E; border:none; padding:12px 15px; color:white; font-size:1.1rem;cursor:pointer; ">
          Verify Your Email
        </button>
      </form>
    `
     : ""}
    </div>
   </div>
 </div>
</body>
                    </html>
          `,
        })
      } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
      }
    
      return res.status(200).json({ error: "" });
    }
}
