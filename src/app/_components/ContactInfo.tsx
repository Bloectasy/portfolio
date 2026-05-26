'use client';
import { useState } from 'react';

const ContactInfo = () => {
  const [result, setResult] = useState(false);

  const onSumbit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append(
      'access_key',
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''
    );

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(data.success ? true : false);
  };

  return (
    <div className="flex h-screen items-center justify-center md:h-[80vh]">
      <form
        onSubmit={onSumbit}
        className="grid w-full max-w-6xl gap-10 md:grid-cols-2"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-primary text-base font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="shadow-center text-text focus:ring-primary placeholder-primary focus:border-primary w-full rounded-2xl px-6 py-4 text-base transition-all duration-300 focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-primary text-base font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="shadow-center text-text focus:ring-primary placeholder-primary focus:border-primary w-full rounded-2xl px-6 py-4 text-base transition-all duration-300 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-primary text-base font-semibold"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="shadow-center text-text focus:ring-primary placeholder-primary focus:border-primary w-full rounded-2xl px-6 py-4 text-base transition-all duration-300 focus:outline-none"
              placeholder="Let’s work together"
            />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label
              className="text-primary text-base font-semibold"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={10}
              className="shadow-center text-text focus:ring-primary placeholder-primary focus:border-primary w-full rounded-2xl px-6 py-4 text-base transition-all duration-300 focus:outline-none resize-none"
              placeholder="Write your message..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-background shadow-center cursor-pointer rounded-2xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:opacity-90"
          >
            Send Message
          </button>
          {result && (
            <p className="text-primary text-sm font-semibold">
              Message sent successfully!
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactInfo;
