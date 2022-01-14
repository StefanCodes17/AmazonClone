import { useCallback } from "react"
const links = [
    { 
        section: "Get to Know Us",
        subLinks: [
            {text: "Careers", link: "/"},
            {text: "Blog", link: "/"},
            {text: "About Amazon", link: "/"},
            {text: "Sustainability", link: "/"},
            {text: "Press center", link: "/"},
            {text: "Investor Relations", link: "/"},
            {text: "Amazon Devices", link: "/"},
        ]
    },
    { 
        section: "Make Money with Us",
        subLinks: [
            {text: "Sell products on Amazon", link: "/"},
            {text: "Sell apps on Amazon", link: "/"},
            {text: "Become an Affiliate", link: "/"},
            {text: "Become a Deilvery Driver", link: "/"},
            {text: "Start a package delivery business", link: "/"},
            {text: "Advertise Your Products", link: "/"},
            {text: "Self-Publish with Us", link: "/"},
            {text: "Host an Amazon hub", link: "/"},
        ]
    },
    { 
        section: "Amazon Payment Products",
        subLinks: [
            {text: "Amazon Rewards Visa Signature Cards", link: "/"},
            {text: "Amazon.com Store Card", link: "/"},
            {text: "Amazon Secured Card", link: "/"},
            {text: "Amazon Business Card", link: "/"},
            {text: "Amazon Business Line of Credit", link: "/"},
            {text: "Shop with Points", link: "/"},
            {text: "Credit Card Marketplace", link: "/"},
            {text: "Reload Your Balance", link: "/"},
            {text: "Amazon Currency Converter", link: "/"},
            {text: "Promotional Financing", link: "/"},
        ]
    }
]

const Footer = () => {

    const scroll = useCallback(() => {document.body.scrollTop = document.documentElement.scrollTop = 0})

    return (
        <>
        <div 
        className="text-center p-3 text-white bg-amazon_blue  hover:text-black hover:bg-gray-100 cursor-pointer"
        onClick={scroll}
        >Back to the Top</div>
        <div className="bg-amazon_blue-light px-4 py-8 text-white">
            <div className="text-center sm:flex justify-evenly max-w-5xl m-auto">
            {links.slice(0,1).map(col =>(
                    <div key={col.section}>
                        <h2 className="font-bold">{col.section}</h2>
                        <div className="flex flex-col space-y-2 mt-2">
                            {col.subLinks.map(l =>(
                                <a 
                                className="text-sm hover:underline whitespace-nowrap"
                                href={l.link}
                                key={l.text}
                                >{l.text}</a>
                            ))}
                        </div>
                    </div>
                ))}
                {links.slice(1).map(col =>(
                    <div className="hidden sm:block" key={col.section}>
                        <h2 className="font-bold">{col.section}</h2>
                        <div className="flex flex-col space-y-2 mt-2">
                            {col.subLinks.map(l =>(
                                <a 
                                className="text-sm hover:underline whitespace-nowrap"
                                href={l.link}
                                key={l.text}
                                >{l.text}</a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-amazon_blue text-white py-3"/>
        </>
    )
}

export default Footer
