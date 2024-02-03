import FaqsContainer from '@/components/faqs/FaqsContainer';
import axios from 'axios';
import React from 'react'

export default function Faqs(props) {
    const { faqs } = props;

    return (
        <div>
            <p className='text-center p-8 mt-12 text-5xl'>Frequently Asked Questions</p>
            <FaqsContainer faqs = {faqs} />

        </div>
    )
}

export async function getStaticProps(context) {
    try {
        const response = await axios.get(`http://localhost:5059/api/faqs`);

        console.log(response.data)

        const faqs = response.data.data;

        //console.log(faqs)

        const categories = [...new Set(faqs.map(faq => faq.category))];

        // Kategorilere göre ayrıştırma işlemi
        const faqsByCategory = {};

        categories.forEach(category => {
            faqsByCategory[category] = faqs.filter(faq => faq.category === category);
        });

        console.log(faqsByCategory)

        return {
            props: {
                faqs: faqsByCategory
            },
            //revalidate: 1 * 60 * 60  // In seconds this is 1 hour
        }
    }
    catch (err) {
        console.log("error")
        console.log(err)//HATALARIMI NASIL LOGLARIM
        return {
            notFound: true
        }
    }
}
