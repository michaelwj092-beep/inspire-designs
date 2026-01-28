const CONFIG = {
    brandName: "Inspire Designs",
    logo: "assets/images/Inspire Logo Web.svg",
    navigation: [
        { text: "Home", href: "index.html" },
        { text: "Services", href: "services.html" },
        { text: "Portfolio", href: "portfolio.html" },
        { text: "Contact", href: "contact.html" }
    ],
    hero: {
        title: "Your Ministry’s Creative Partner.",
        subtitle: "",
        ctaText: "Start a Conversation",
        ctaLink: "contact.html",
        showLogo: true // New flag to show logo in hero
    },
    services: {
        title: "Build Your Ministry Plan",
        subheadline: "Flexible Monthly Plans. No Annual Commitments.",
        subtitle: "Select the components that fit your church's needs. Simple, transparent monthly pricing.",
        disclaimer: "Cancellation Policy: We believe in smooth transitions. While there are no long-term contracts, we require a 60-day written notice to cancel services. This allows us to properly hand off all your design files and assets.",
        currencySymbol: "$",
        period: "/mo",
        items: [
            {
                id: "series-graphics",
                title: "Sermon Series Graphics",
                price: 200,
                description: "Visual identity for sermon series (Title graphic + screen backgrounds).",
                icon: "🎨"
            },
            {
                id: "screen-notes",
                title: "Weekly Screen Notes",
                price: 150,
                description: "We craft clear, engaging sermon notes for your screens each week, helping your message resonate visually with your congregation.",
                icon: "📺"
            },
            {
                id: "promotional-media",
                title: "The Promotional Media Add-On",
                price: 400,
                dependency: "series-graphics",
                description: "This is an add-on service covering up to 15-17 items per month, including social media graphics, flyers, and banners—which we've found covers the needs of most churches beautifully. Please note, this excludes series graphics/notes. If your ministry consistently requires more, we'd love to chat about a custom solution that fits your unique rhythm.",
                note: "*Requires Sermon Series Graphics subscription.",
                icon: "🚀"
            },
            {
                id: "website-management",
                title: "Website Management",
                price: 250,
                description: "<strong>Content Updates & Routine Maintenance:</strong> This service covers basic, ongoing management and updates to your existing website. Please note, it does not include a full website rebuild or major overhauls. Custom website rebuilds are available upon request for a separate quote.",
                icon: "🌐"
            },
            {
                id: "marketing-consultant",
                title: "Church Marketing & Outreach",
                price: 200,
                description: "Our Church Marketing & Outreach service is designed to help your ministry shine, especially during key events like Christmas and Easter. We provide strategic planning, clear timelines, and coordinate all your promotional materials, including invitation cards, handouts, mailers, social media graphics, and billboards, ensuring your message reaches your community with impact and ease.",
                icon: "💡"
            }
        ],
        totalLabel: "Estimated Monthly Investment"
    },
    portfolio: {
        title: "Our Work",
        subtitle: "A showcase of our recent projects",
        categories: {
            series: {
                label: "Sermon Series",
                images: [
                    "images-portfolio/series-graphics/Portfolio 2 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 3 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 4 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 5 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 6 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 7 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 8 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 9 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 10 - Thumbail.jpg",
                    "images-portfolio/series-graphics/Portfolio 11 - thumbnail.jpg"
                ]
            },
            media: {
                label: "Church Media",
                images: [
                    "images-portfolio/church-media/Annoucement-2-Thambnail.jpg",
                    "images-portfolio/church-media/Annoucement-1-Thambnail.jpg",
                    "images-portfolio/church-media/Announcement-3-Thambnail.jpg"
                ]
            }
        }
    },
    contact: {
        title: "Ready to Start?",
        subtitle: "Let's build something amazing together.",
        email: "michael@inspiredesigns.biz",
        phone: "(678) 725-6153",
        ctaText: "Email Us Now"
    },
    mission: {
        title: "Partner With Us",
        text_p1: "For 10 years, our artists have been partnering with churches to bring their messages to life visually. We have worked with congregations of all sizes, and we understand that your time is best spent on ministry, not on managing files or formatting slides.",
        text_p2: "We exist to remove that stress from your week. You provide the vision or the sermon title, and we handle the execution. Let us take care of the visual details so you can get back to shepherding your congregation.",
        tagline: "We handle the pixels so you can focus on the people."
    },
    about: {
        title: "Your Ministry's Creative Partner.",
        subtitle: "",
        text: "For 10 years, our artists have been partnering with churches to bring their messages to life visually. We have worked with congregations of all sizes, and we understand that your time is best spent on ministry, not on managing files or formatting slides. We exist to remove that stress from your week. You provide the vision or the sermon title, and we handle the execution. Let us take care of the visual details so you can get back to shepherding your congregation.",
        tagline: "We handle the pixels so you can focus on the people."
    },
    highlights: {
        title: "What We Do",
        items: [
            {
                title: "Sunday Essentials",
                description: "Custom sermon series graphics and professionally formatted screen notes to keep your congregation engaged.",
                icon: "✨"
            },
            {
                title: "Ministry Marketing",
                description: "Strategic promotional materials, event flyers, and social media content to reach your community.",
                icon: "📣"
            },
            {
                title: "Digital & Strategy",
                description: "Website management and 'Inside Consultant' support to help you plan your biggest events of the year.",
                icon: "📈"
            }
        ]
    },
    closingCta: {
        text: "Ready to upgrade your church's media? Let’s simplify your workflow.",
        btnText: "Contact Us",
        btnLink: "contact.html"
    },
    footer: {
        text: "© 2026 Inspire Designs. All rights reserved."
    }
};
