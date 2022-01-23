interface IFooterLinksContainer{
    title:string
    links: IFooterLink[]
}

interface IFooterLink{
    title:string,
    href:string
}

const FooterLinks: IFooterLinksContainer[] = [
    {
        title:"ABOUT",
        links: [
            {
                title:"Contact",
                href:""
            },
            {
                title:"Brand",
                href:""
            },
            {
                title:"Blog",
                href:""
            },
            {
                title:"Community",
                href:""
            }
        ]
    },
    {
        title:"TONCOIN",
        links: [
            {
                title:"About Toncoin",
                href:""
            },
        ]
    },
    {
        title:"HELP",
        links: [
            {
                title:"Custommer Support",
                href:""
            },
            {
                title:"Troubleshooting",
                href:""
            },
            {
                title:"Guides",
                href:""
            }
        ]
    },
    {
        title:"DEVELOPERS",
        links: [
            {
                title:"Github",
                href:""
            },
            {
                title:"Docs",
                href:""
            },
            {
                title:"Testnet Foucet",
                href:""
            },
            {
                title:"Testnet Explorer",
                href:""
            },
            {
                title:"Testnet Bridge",
                href:""
            }
        ]
    }
]

export default FooterLinks;