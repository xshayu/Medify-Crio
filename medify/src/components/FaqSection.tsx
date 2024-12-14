export default function FaqSection() {
    const QUESTIONS = [
        'Why choose medical for your family?',
        'Why we are different from others?',
        'Trusted & experience senior care & love',
        'How to get appointment for emergency cases?'
    ];

    const imgUrl = 'https://s3-alpha-sig.figma.com/img/e227/fb42/a6ada2ba341019c7efd2dc283f78b62d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YhcnvIQcqiePJPrTUJokBT3ZqinHBpaHG6kGjIxFl050n0Pk4VpEuHlv9FUZtBY62VjkDWxIXNgykfux9HQZadhosL2rnKlzohC~XncBdFX3ZuyTXkylpk8K06GCPVws5XMYAregh76ELcH30NlMNG-MvI1GZXD-jYqHyVnTfo5LnB6RStoXi0wZuZoDxEdOEz8ZmJ6fP3hFMmFirEFrE7UcXORF~osk~DWD-pjNJXfQ9AyJ1KypK1kSIIpie8W4iWv7LLtWajfkT~LSC1xuqu1fboslmt1zBEz0FoN9i-LRHrGKhgmAWJrvT~JcW3fkHFnTfRfbLYP4GOljcJaiHw__';

    return (
        <section id="faqSection" className="section-x-padding py-6">
            <p className="section-subtitle text-center">
                Get your answer
            </p>
            <h1 className="section-heading text-center">
                Frequently Asked Questions
            </h1>
            <div className="p-4 md:p-9 flex flex-col md:flex-row justify-between">

                <div id="imageFrame" className="relative basis-[48%]">
                    <img src={imgUrl} className="w-full h-full border-[10px] border-white object-cover" />
                    <div id="totalCount" className="absolute py-5 px-7 flex items-center gap-4 bg-white rounded-lg">
                        <img src="/ominousSmiley.svg" alt="Smile" />
                        <p className="text-[17px] leading-7 text-[#77829D]">
                            <span className="font-semibold text-2xl text-secondary">84k+</span><br/>Happy Patients
                        </p>
                    </div>
                    <div id="grateful" className="absolute h-[80px] w-[80px] rounded-full flex items-center justify-center bg-white">
                        <img src="/grateful.svg" alt="Grateful" />
                    </div>
                </div>

                <div className="flex flex-col gap-6 py-6 px-2.5 basis-[48%]">
                    {QUESTIONS.map((question, key) =>
                        <div key={key} className="flex items-center justify-between py-5 px-4">
                            <span className="text-secondary text-lg font-semibold">{question}</span>
                            <button><img src="/plus.svg" alt="More Details" /></button>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}