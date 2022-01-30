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
                      <link rel="stylesheet" href="css/styles.css?v=1.0">
                    </head>
                    
                    <body>
                      <div class="container" style="margin-left: 20px;margin-right: 20px;">
                        <h2>Welcome to Amazon!</h2>
                          <div style="font-size: 16px;">
                            <p>${req.body.message}</p>
                            <br>
                          </div>
                          <form action="${process.env.NEXTAUTH_URL}/api/verifyemail" method="POST">
                            <button type="submit">
                            Verify Your Email
                            </button>
                          </form>
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
