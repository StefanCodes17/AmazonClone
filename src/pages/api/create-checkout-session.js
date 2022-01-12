const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res)=>{
    if(req.method === "POST"){
        console.log("Attempting stuff")
        /*
        const {items, email} = req.body
        const transformedItems = items.map(it => ({
            description: it.description,
            quantity: 1,
            price_data: {
                currency: "usd",
                unit_amount: it.price * 100,
                product_data:{
                    name: it.title,
                    images: [it.image]
                }

            }
        }));

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ["card"],
            shipping_rates:["shr_1KDx9ND9B9wj5Sa3LoHPdLbI"],
            shipping_address_collection:{
                allowed_countries: ['US', 'CA']
            },  
            line_items: transformedItems,
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
            metadata: {
                email,
                images: JSON.stringify(items.map(it => it.image))
            }
        })

        res.status(200).json({id: session.id})4
        */
    }
}